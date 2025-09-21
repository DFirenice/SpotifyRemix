'use client'

import { useRef, useEffect } from "react"
import { useProtectedApi } from "@/lib/axios"
import { createViewModeStore } from "@/stores/createViewModeStore"
import useCachedSongsStore, { TSongWithCache } from "@/stores/CachedSongs"

import ViewControlPanel from "@/components/sorting/ViewControlPanel"
import ViewContainer from "@/components/sorting/ViewContainer"
import { TSong } from "@/types/mediaEntities.types.ts"
import { useLikedSongsStore } from "@/stores/LikedSongsStore"

const LikedSongsPage = () => {
    const storeRef = useRef<ReturnType<typeof createViewModeStore>>(null)    
    if (!storeRef.current) storeRef.current = createViewModeStore("liked") // pageKey

    const { getFromCache, addToCache } = useCachedSongsStore()

    const useStore = storeRef.current,
            viewMode = useStore((s) => s.viewMode),
            setViewMode = useStore((s) => s.setViewMode)

    // With destructuring React won't see changes cuz of the object reference
    const songs = useLikedSongsStore(state => state.songs)
    const setSongs = useLikedSongsStore(state => state.setSongs)

    useEffect(() => {
        const parseLikedSongs = async () => {
            const { data } = await useProtectedApi.get('/user/liked/songs')

            if (data.songs && data.songs[0] !== null) {
                const likedIds = data.songs as string[]
                
                const uncachedIds = []
                for (const songId of likedIds) {
                    const cached = await getFromCache(songId) // song / undefined
                    if (!cached) uncachedIds.push(songId)
                }

                if (uncachedIds.length === 0) {
                    const finalSongsList: (TSongWithCache | undefined )[]= await Promise.all(likedIds.map((id: string) => getFromCache(id)))
                    setSongs(finalSongsList.filter(Boolean) as TSong[])
                    return
                }
                
                // Ｎｏｔｅ： Fetches everything, even one that are cached (unoptimized)
                const { data: fetchedData } = await useProtectedApi.post('/songs', { songs: likedIds })
                const finalSongsList = await Promise.all(fetchedData.songs.map((s: TSong) => addToCache(s)))

                setSongs(finalSongsList.filter(Boolean))
            }
        }
        
        parseLikedSongs()
    }, [])

    return (
        <div className="page-container">
            <ViewControlPanel viewMode={viewMode} setViewMode={setViewMode} />
            <ViewContainer viewMode={viewMode} data={songs} />
        </div>
    )
}

export default LikedSongsPage