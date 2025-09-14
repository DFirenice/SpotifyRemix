import { create } from "zustand"
import type { TSong } from "@/types/mediaEntities.types.ts"

interface IPlayingSongState {
    song: TSong | null
    isPlaying: boolean
    setIsPlaying: (newState: boolean) => void
    queueSong: (song: TSong) => void
    getPlaylist: () => string | undefined
}

const usePlayingSongStore = create<IPlayingSongState>(( set, get ) => ({
    song: null,
    isPlaying: false,
    setIsPlaying: (newState: boolean) => set({ isPlaying: newState }),
    queueSong: (song: TSong) => set({ song }),
    getPlaylist: () => get().song?.belongsRef // Ｎｏｔｅ： Yet unavailable
}))

export default usePlayingSongStore