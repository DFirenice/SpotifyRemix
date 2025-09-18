'use client'

import { useRef, useEffect, useState } from "react"
import { useProtectedApi } from "@/lib/axios"
import { createViewModeStore } from "@/stores/createViewModeStore"
import useCachedSongsStore from "@/stores/CachedSongs"

import ViewControlPanel from "@/components/sorting/ViewControlPanel"
import ViewContainer from "@/components/sorting/ViewContainer"
import { TSong } from "@/types/mediaEntities.types.ts"

const LikedSongsPage = () => {
    const storeRef = useRef<ReturnType<typeof createViewModeStore>>(null)    
    if (!storeRef.current) storeRef.current = createViewModeStore("liked") // pageKey

    const { getFromCache, addToCache } = useCachedSongsStore()

    const useStore = storeRef.current,
            viewMode = useStore((s) => s.viewMode),
            setViewMode = useStore((s) => s.setViewMode)

    const [ songs, setSongs ] = useState<TSong[]>([])

    // Ｎｏｔｅ： Won't know if the new song has been added to favourites
    useEffect(() => {
        const parseLikedSongs = async () => {
            const { data } = await useProtectedApi.get('/user/liked/songs')

            if (data.songs && data.songs[0] !== null) {
                const likedIds = data.songs
                const uncachedIds = likedIds.filter(async (songId: string) => !(await getFromCache(songId)))

                if (uncachedIds.length === 0) {
                    setSongs(await Promise.all(likedIds.map((s: TSong) => getFromCache(s.id)!)))
                    return
                }
                
                const { data: fetchedData } = await useProtectedApi.post('/songs', { songs: likedIds })
                await Promise.all(fetchedData.songs.map((s: TSong) => addToCache(s)))

                const likedSongs = await Promise.all(
                    likedIds.map(async (id: string) => await getFromCache(id))
                )
                setSongs(likedSongs)
            }
        }
        
        parseLikedSongs()
    }, [])

    return (
        <div className="page-container">
            <ViewControlPanel viewMode={viewMode} setViewMode={setViewMode} />
            { songs.length > 0 && <ViewContainer viewMode={viewMode} data={songs} /> }
        </div>
    )
}

export default LikedSongsPage