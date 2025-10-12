'use client'

import EntityHeader from "@/components/EntityHeader"
import List from "@/components/viewMode/List"
import SearchOpenable from "@/components/ui/SearchOpenable"
import ReturnLink from "@app-ui/ReturnLink"

import Image from "next/image"
import Tag from "@/components/ui/Tag"
import Link from "next/link"
import useCachedSongsStore, { TPlaylistWithCache } from "@/stores/CachedSongs"
import Icon from "@/components/ui/Icon"
import { accumulateAuthors } from "@/utils/entityFormatter"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { use, useEffect, useState } from "react"
import { TSong } from "@/types/mediaEntities.types.ts"
import { useProtectedApi } from "@/lib/axios"
import { useLikedSongsStore } from "@/stores/LikedSongsStore"
import { limitBrightness } from "@/utils/brightness-adapter"
import ColorThief from 'colorthief'

const Playlist = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params) // Playlist id

    const getCachedPlaylist = useCachedSongsStore(state => state.getCachedPlaylist)
    const fetchAndCacheSongs = useCachedSongsStore(state => state.fetchAndCacheSongs)
    const getFromCache = useCachedSongsStore(state => state.getFromCache)
    const likedSongs = useLikedSongsStore(state => state.songs)

    const [ songsFromCache, setSongs ] = useState<TSong[]>([])
    const [ playlist, setPlaylist ] = useState<TPlaylistWithCache | undefined>(undefined)
    const [ bgGradient, setBgGradient ] = useState<string>('#232323')

    useEffect(() => {
        const updatePlaylistState = async (updPlaylist: any) => {
            setPlaylist(updPlaylist)
            // Invoking method that additionally parses and caches yet unchached songs
            const songIds = updPlaylist.songs.map((s: TSong) => s.id)
            const cachedSongs = await fetchAndCacheSongs(songIds)
            if (cachedSongs) setSongs(cachedSongs as TSong[])
        }
        
        ;(async () => {
            const updPlaylist = await getCachedPlaylist(slug)
            if (!updPlaylist) {
                const { data: pData } = await useProtectedApi.get(`/playlists/${slug}`)
                if (pData?.id) await updatePlaylistState(pData)
            }
            updPlaylist && await updatePlaylistState(updPlaylist)
        })()
    }, [slug])
    
    useEffect(() => {
        const loadSongs = async () => {
            if (playlist) {
                const songs = await Promise.all(
                    // TSong type*
                    playlist.songs.map(async (s: any) => await getFromCache(s.id))
                )
                setSongs(songs as TSong[])
            }
        }

        if (playlist?.songs?.length || playlist?.songs?.length === 0) loadSongs()
    }, [playlist, getFromCache, likedSongs])

    useEffect(() => {
        if (!playlist?.cached_cover) return

        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.src = playlist.cached_cover

        img.onload = () => {
            try {
                const cf = new ColorThief()
                const dominantRGB = limitBrightness(cf.getColor(img))
                setBgGradient(`rgb(${dominantRGB.join(',')})`)
                console.log('Dominant RGB:', dominantRGB)
            } catch (err) { setBgGradient('#232323') }
        }

        return () => {
            img.onload = null
        }
    }, [playlist?.cached_cover])
    
    if (playlist) {
        return (
            // Ｎｏｔｅ： Change gradient color to a color of the playlist
            <div
                className="bordered rounded-lg pt-12 px-12 h-full flex flex-row gap-12 transition-all duration-300"
                style={{ background: `linear-gradient(to bottom, ${bgGradient}, transparent)` }}
            >
                <div className="*:space-y-4 w-full">
                    <div className="flex flex-row items-end justify-between w-full">
                        <div>
                            <ReturnLink to="/playlists" />
                            <EntityHeader entity={playlist} excludeTags />
                        </div>
                        <SearchOpenable />
                    </div>
                    <List data={songsFromCache} />
                </div>

                <div className="inline-flex flex-col gap-8">
                    {/* Cover Preview */}
                    <div className="relative h-[32dvh] aspect-square">
                        {
                            playlist.cover_path ?
                                (<Image
                                    className="rounded-2xl"
                                    src={playlist.cached_cover ?? '/'}
                                    alt={playlist.name}
                                    objectFit="cover"
                                    fill
                                />)
                            : (
                                <div className="w-full h-full overflow-hidden flex flex-col">
                                    <div className="tile-folder-effect h-[0.6rem]">
                                        <div className="bg-dp-1" /><div className="bg-dp-2" />
                                    </div>
                                    <div className="bg-dp-1 rounded-xl flex-1 grid place-items-center">
                                        <Icon id="note_head" size="fill" className="w-1/3 **:bg-dp-1" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* Tags */}
                    <div className="flex flex-row flex-wrap gap-2.5">
                        { playlist?.tags && playlist.tags.map((tag, _) => <Tag key={`${tag}_${_}`} text={tag} secondary /> ) }
                    </div>
                    {/* Authors */}
                    <div className="flex flex-col gap-4 h-full overflow-y-auto">
                        {/* Ｎｏｔｅ： Fix to have authors' avatars and working profile links */}
                        { songsFromCache.length !== 0 && accumulateAuthors(songsFromCache).map(author => (
                            <Link href="" className="flex flex-row items-center gap-4" key={author._id}>
                                <Avatar className="rounded-full overflow-hidden size-14">
                                    <AvatarImage src={author.avatarUrl} alt={author.username} />
                                    <AvatarFallback><Skeleton className="rounded-full overflow-hidden size-8" /></AvatarFallback>
                                </Avatar>
                                <div className="**:block">
                                    <span className="text-fg-secondary font-bold hover:text-accent-default transition-all">{ author.username }</span>
                                    {/* Account type (verified / common), about */}
                                    <span className="text-fg-secondary">Artist</span>
                                </div>
                            </Link>
                        )) }
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default Playlist