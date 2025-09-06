import type { TSong } from '@/types/mediaEntities.types.ts'
import type { TUser } from '@/types/userTypes'
import { create } from 'zustand'

import mockSongs from '@/data/temp/songs'

interface IUser {
    user: TUser | null
    favoriteSongs: TSong[]
    pinned: Set<string>
    initialized: boolean
    init: () => void
}

export const useUserStore = create<IUser>((set, get) => ({
    user: null,
    favoriteSongs: mockSongs.toSpliced(2, 3),
    pinned: new Set(['fav', 'playlist-001', 'playlist-002']), // Playlists id
    togglePin: (id: string) => set((state) => {
        const newPinned = new Set(state.pinned)
        if (newPinned.has(id)) newPinned.delete(id)
        else newPinned.add(id)
        return { pinned: newPinned }
    }),
    // User (App) initialization
    initialized: false,
    init: async () => {
        // if (useUserStore.getState().initialized) return

        // try {
        //     const res = await axios.get('/profile')
        //     if (res.status !== 200) throw new Error('Invalid or expired authentication token')
        //     set({ user: res.data, initialized: true })
        //     console.log(res)
        // } catch (err) {
        //     set({ user: null, initialized: true })
        // }
    }
}))