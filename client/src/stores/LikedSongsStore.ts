import { create } from "zustand";
import { TSong } from "@/types/mediaEntities.types.ts";
import { useProtectedApi } from "@/lib/axios";
import useCachedSongsStore from "./CachedSongs";

export type TFavoriteEntityType = 'song' | 'playlist'

export interface ILikedSongsStore {
    songs: TSong[]
    setSongs: (updSongs: TSong[]) => void
    removeSong: (songId: string) => void
    /** Likes or unlikes the media entity. Type: playlist or song */
    toggleFavorite: (sondId: string, type?: TFavoriteEntityType) => Promise<void>
    isLiked: (songId: string) => boolean
}

export const useLikedSongsStore = create<ILikedSongsStore>((set, get) => ({
    songs: [],
    setSongs: (updSongs: TSong[]) => set({ songs: updSongs }),
    removeSong: (songId) => set(state => ({ songs: state.songs.filter(s => s.id !== songId) })),

    toggleFavorite: async (songId: string, type: TFavoriteEntityType = 'song') => {
        const { getFromCache } = useCachedSongsStore.getState()
        let markedSong: TSong | undefined
        
        try {
            const { data } = await useProtectedApi.post('/user/mark-favorite', { id: songId, type })

            if (data.message === "Song marked as liked") {
                markedSong = await getFromCache(songId)
                markedSong && set(state => ({ songs: [ ...state.songs, markedSong! ] }))
            }

            else get().removeSong(songId)
        }
        catch (err) { console.log("An error occured liking a song: ", err) }
    },

    isLiked: (songId: string) => !!get().songs.find(s => s.id === songId)
}))