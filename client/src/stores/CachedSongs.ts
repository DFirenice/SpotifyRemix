import { useProtectedApi } from "@/lib/axios";
import { TSong } from "@/types/mediaEntities.types.ts";
import { create } from "zustand";

type TCacheUrls = {
    cache: {
        coverUrl: string
        songUrl: string
    } | undefined
}

// type TSongId = Pick<TSong, "id">

type TSongWithCache = TSong & TCacheUrls

interface ICachedSongsStore {
    cache: TSongWithCache[]
    /** Caches and returns cached song
     * @param song */
    addToCache: (song: TSong) => Promise<TSongWithCache>
    /** Returns cached song or undefined
     * @param songId */
    getFromCache: (id: string) => Promise<TCacheUrls | undefined>
}

/** Utility that helps to generate blobs for caching */
const makeCache = async (
    { cover_path, file_path }:
    { cover_path: string, file_path: string }
) => {
    try {
        const { data } = await useProtectedApi.post('/get-media/full-song', { cover_path, file_path })

        const coverBlob = await fetch(data.coverUrl.signedUrl).then(res => res.blob())
        const coverUrl = URL.createObjectURL(coverBlob)

        const songBlob = await fetch(data.songUrl.signedUrl).then(res => res.blob())
        const songUrl = URL.createObjectURL(songBlob)

        if (data) return { coverUrl, songUrl }
    } catch(err) { console.error(err) }
}

const useCachedSongsStore = create<ICachedSongsStore>(( set, get ) => ({
    cache: [],
    
    addToCache: async (song: TSong) => {
        const cache = get().cache
        const hasCached = cache.find(s => s.id === song.id)
        if (hasCached) return hasCached // Song entity (object)

        // Adding to cache
        const cachedUrls = await makeCache({ cover_path: song.cover_path as string, file_path: song.file_path })
        const songWithCache: TSongWithCache = { ...song, cache: cachedUrls }
        set({ cache: [...cache, songWithCache] })
        return songWithCache
    },
    
    getFromCache: async(id: string) => {
        const song = get().cache.find(song => song.id === id) as TSongWithCache
        if (!song) return undefined
        let cachedUrls = song?.cache

        if (!cachedUrls) {
            cachedUrls = await makeCache({ cover_path: song.cover_path as string, file_path: song.file_path })
             // Updating the cache property for the song
            set(state => ({
                cache: state.cache.map(s =>
                    s.id === id ? { ...s, cache: cachedUrls } : s
                )
            }))
        }

        return { cache: cachedUrls } as TCacheUrls
    }
}))

export default useCachedSongsStore