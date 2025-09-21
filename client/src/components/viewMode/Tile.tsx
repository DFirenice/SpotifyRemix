'use client'

import Link from "next/link"
import Icon from "@/components/ui/Icon"
import Thumbtack from "@app-ui/Thumbtack"

import { detectMediaEntityType } from "@/utils/typeGuards"
import type { TPlaylist, TSong, TFolder, TMediaEntity } from "@/types/mediaEntities.types.ts"
import { accumulateAndFormatAuthors, accumulateAndFormatPlaylists } from "@/utils/entityFormatter"
import { useUserStore } from "@/stores/useUserStore"
import { useEffect, useState } from "react"
import usePlayingSongStore from "@/stores/PlayingSong"
import useCachedSongsStore from "@/stores/CachedSongs"
import { Skeleton } from "@app-ui/skeleton"
import Image from "next/image"

/**
*   Types of tiles:
*    @description Liked songs (a collection of liked songs)
*    @description Playlist (a collection of added songs OR generated based on use preferences)
*    @description Folder (a collection of playlists)
* */

const Tile = ({ tile }: { tile: TMediaEntity }) => {
    const isPinned = useUserStore(state => state.pinned.has(tile?.id))
    const { song: storeSong, queueSong, setIsPlaying, isPlaying } = usePlayingSongStore()

    const { getFromCache, addToCache } = useCachedSongsStore()

    // Play / pause on cover
    const handlePlaySong = () => {
        if ((tile as TSong).id === storeSong?.id) return setIsPlaying(!isPlaying)
        queueSong(tile as TSong)
    }
    
    // Hooks for tiles
    const [ coverSrc, setCoverSrc ] = useState<string>()
    useEffect(() => {
        if (detectMediaEntityType(tile) === "song") {
            const song = tile as TSong
            const getCover = async () => {
                const cachedSong = await getFromCache(song.id)
                if (cachedSong) setCoverSrc(cachedSong!.cache!.coverUrl)
                else setCoverSrc((await addToCache(song)).cache!.coverUrl)
            }
            getCover()
        }
    }, [ tile, getFromCache, addToCache ])
    
    // Song tile
    if (detectMediaEntityType(tile) === "song") {
        const song = tile as TSong
        return (
            <Link href={''} className="w-48 h-72 aspect-square">
                { isPinned && <Thumbtack /> }
                <div className="group rounded-lg w-full h-48 relative">
                    <div
                        className="
                            absolute rounded-xl group-hover:opacity-100 z-10
                            opacity-0 transition-all w-full h-full bg-dp-1/87
                            grid place-items-center duration-75
                        "
                        id="coverOverlay"
                        onClick={handlePlaySong}
                    >
                        <div className="w-16 h-16">
                            { song.id === storeSong?.id && isPlaying ?
                                <Icon id="pause_simple" className="text-accent-default" size="fill" />
                                : <Icon id="play_simple" className="text-accent-default" size="fill" />
                            }
                        </div>
                    </div>
                    <Image
                        className="object-cover rounded-xl bg-dp-1 z-0 pointer-events-none"
                        alt="Track cover"
                        src={coverSrc ?? '/images/placeholder.png'}
                        fill
                    />
                    { !coverSrc && <Skeleton className="w-full h-full rounded-xl" /> }
                </div>
                <div className="text-center mt-1">
                    <span className="w-full truncate text-accent-default">{ song.title || 'Song is unavailable...' }</span>
                    <p className="text-sm text-fg-secondary my-1">{ song.artist.username }</p>
                </div>
            </Link>
        )
    }
    // Playlist tile
    else if (detectMediaEntityType(tile) === "playlist") {
        const playlist = tile as TPlaylist
        return (
            <Link href={`/playlists/${playlist.id}`} className="w-48 h-72 relative">
                { isPinned && <Thumbtack /> }
                <div className="w-full h-48 overflow-hidden flex flex-col">
                    <div className="tile-folder-effect h-[0.6rem]">
                        <div className="bg-dp-1" /><div className="bg-dp-2" />
                    </div>
                    <div className="bg-dp-1 rounded-xl flex-1 grid place-items-center">
                        <Icon id="note_head" size="fill" className="w-1/3 **:bg-dp-1" />
                    </div>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="w-full truncate text-accent-default">{ playlist.name || 'Playlist is unavailable...' }</span>
                    <span className="font-mono text-fg-secondary font-light">{ playlist.size }</span> {/* Playlist size */}
                </div>
                <p className="text-sm text-fg-secondary my-1">Authors: { accumulateAndFormatAuthors(playlist.songs, 2) }</p>
            </Link>
        )
    }
    // Folder tile
    else if (detectMediaEntityType(tile) === "folder") {
        const folder = tile as TFolder
        return (
            <Link href={''} className="w-48 h-72 relative">
                { isPinned && <Thumbtack /> }
                <div className=" bg-dp-1 rounded-lg w-full h-48 relative overflow-hidden grid place-items-center">
                    <Icon id="folder" size="large" className="icon-active-outline"/>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="w-full truncate text-accent-default">{ folder.name || 'Folder is unavailable...' }</span>
                    <span className="font-mono text-fg-secondary font-light">{ folder.size }</span> {/* # of Playlists */}
                </div>
                <p className="text-sm text-fg-secondary my-1">Playlists: { accumulateAndFormatPlaylists(folder.playlists, 2) }</p>
            </Link>
        )
    }

    return null
}

export default Tile