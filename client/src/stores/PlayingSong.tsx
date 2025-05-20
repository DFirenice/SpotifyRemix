import { create } from "zustand"

// Redeclare as global type, in @app-types
export type TPlaylist = string

// Redeclare as global type, in @app-types
type TUser = string // Should be SpotRem's user object

// Redeclare as global type, in @app-types
type TSong = {
    name: string
    author: TUser
    belongsRef: TPlaylist
}

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