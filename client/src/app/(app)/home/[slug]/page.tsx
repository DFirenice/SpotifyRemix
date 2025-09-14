"use client"

import { homeThemes } from "@/data/HomePage"
import ThemesPanel from "@/components/ThemesPanel"
import { useProtectedApi } from "@/lib/axios"
import useCachedSongsStore from "@/stores/CachedSongs"
import { useEffect, useState } from "react"
import Tiles from "@/components/viewMode/Tiles"
import { TSong } from "@/types/mediaEntities.types.ts"
import { use } from "react"

const App = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { addToCache, cache } = useCachedSongsStore()
    const [ songs, setSongs ] = useState<TSong[]>([])
    const { slug } = use(params)

    useEffect(() => {
        const fetchSongs = async () => {
            const { data, status } = await useProtectedApi.get('/songs')
            if (status === 200) setSongs(data.songs)
            await Promise.all(data.songs.map((song: TSong) => addToCache(song)))
        }
        fetchSongs()
    }, [])

    console.log("Upd Cache: ", cache)

    return <div className="h-full bordered">
        <ThemesPanel themes={homeThemes} />
        <div className="page-gaps">
            { (slug === 'all' || slug === 'music') && songs.length > 0 && (
                <Tiles data={songs} includeFavorite={false} />
            ) }
        </div>
    </div>
}

export default App