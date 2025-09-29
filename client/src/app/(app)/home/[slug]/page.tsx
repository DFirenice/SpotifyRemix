"use client"

import { homeThemes } from "@/data/HomePage"
import ThemesPanel from "@/components/ThemesPanel"
import { useProtectedApi } from "@/lib/axios"
import useCachedSongsStore from "@/stores/CachedSongs"
import { useEffect, useState } from "react"
import Tiles from "@/components/viewMode/Tiles"
import { TPlaylist, TSong } from "@/types/mediaEntities.types.ts"
import { use } from "react"
import Heading from "@/components/ui/Heading"

const App = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { addToCache, cachePlaylist } = useCachedSongsStore()

    const [ songs, setSongs ] = useState<TSong[]>([])
    const [ playlists, setPlaylists ] = useState<TPlaylist[]>([])
    
    const { slug } = use(params)

    useEffect(() => {
        const fetchSongs = async () => {
            const { data: sData, status: sStatus } = await useProtectedApi.get('/songs')
            if (sStatus === 200) {
                setSongs(sData.songs)
                await Promise.all(sData.songs.map((song: TSong) => addToCache(song)))
            }
        
            const { data: pData, status: pStatus } = await useProtectedApi.get('/playlists')
            if (pStatus === 200) {
                setPlaylists(pData.playlists)
                console.log(pData.playlists)
                await Promise.all(pData.playlists.map((playlist: TPlaylist) => cachePlaylist(playlist)))
            }
        }
        fetchSongs()
    }, [])

    return <div className="h-full bordered">
        <ThemesPanel themes={homeThemes} />
        <div className="page-gaps">
            {/* Songs */}
            <div className="mb-4">
                <span className="text-fg-secondary leading-none">Tracks</span>
                <Heading size="medium" className="leading-tight">Made for you</Heading>
            </div>
            <section>
                { (slug === 'all' || slug === 'music') && songs.length > 0 && (
                    <Tiles data={songs} includeFavorite={false} />
                ) }
            </section>

            {/* Playlists */}
            <div className="mb-4">
                <span className="text-fg-secondary leading-none">Your Mixes</span>
            </div>
            <section>
                { (slug === 'all' || slug === 'music') && playlists.length > 0 && (
                    <Tiles data={playlists} includeFavorite={false} />
                ) }
            </section>
        </div>
    </div>
}

export default App