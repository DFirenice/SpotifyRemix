import { create } from "zustand"
import type { TSong } from "@app-types/TracksAndPlaylists"

interface IPlayingSongState {
    song: TSong | null
    isPlaying: boolean
    setIsPlaying: (newState: boolean) => void
}

const usePlayingSongStore = create<IPlayingSongState>(( set, get ) => ({
    song: null,
    isPlaying: false,
    setIsPlaying: (newState: boolean) => set({ isPlaying: newState }),
    getPlaylist: () => get().song?.belongsRef
}))

export default usePlayingSongStore