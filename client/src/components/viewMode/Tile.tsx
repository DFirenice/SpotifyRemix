import Image from "next/image"
import Link from "next/link"
import Icon from "@/components/ui/Icon"
import Thumbtack from "@app-ui/Thumbtack"

import { detectMediaEntityType } from "@/utils/typeGuards"
import type { TPlaylist, TSong, TFolder, TMediaEntity } from "@/types/mediaEntities.types.ts"
import { accumulateAndFormatAuthors, accumulateAndFormatPlaylists } from "@/utils/entityFormatter"
import { useUserStore } from "@/stores/useUserStore"

// Types of tiles:
//  Liked songs (a collection of liked songs)
//  Playlist (a collection of added songs OR generated based on use preferences)
//  Folder (a collection of playlists)

const Tile = ({ tile }: { tile: TMediaEntity }) => {
    const isPinned = useUserStore(state => state.pinned.has(tile.id))
    
    // Song tile
    if (detectMediaEntityType(tile) === "song") {
        const song = tile as TSong
        return (
            <Link href={''} className="w-56 h-72">
                { isPinned && <Thumbtack /> }
                <div className=" rounded-lg w-full h-56 relative">
                    <Image src={song.previewURL} fill objectFit="cover" className="rounded-full" alt="Track cover" />
                </div>
                <div className="text-center mt-1">
                    <span className="w-full truncate text-accent-default">{ song.name || 'Song is unavailable...' }</span>
                    <p className="text-sm text-fg-secondary my-1">{ song.author.username }</p>
                </div>
            </Link>
        )
    }
    // Playlist tile
    else if (detectMediaEntityType(tile) === "playlist") {
        const playlist = tile as TPlaylist
        return (
            <Link href={`/playlists/${playlist.id}`} className="w-56 h-72 relative">
                { isPinned && <Thumbtack /> }
                <div className="w-full h-56 overflow-hidden flex flex-col">
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
            <Link href={''} className="w-56 h-72 relative">
                { isPinned && <Thumbtack /> }
                <div className=" bg-dp-1 rounded-lg w-full h-56 relative overflow-hidden grid place-items-center">
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

    return 'Unable to load the tile...'
}

export default Tile