import type { TUser } from '@/types/userTypes'
import { create } from 'zustand'

import { useProtectedApi } from '@/lib/axios'

interface IUser {
    user: TUser | null
    pinned: Set<string>
    initialized: boolean
    init: () => void
}

export const useUserStore = create<IUser>((set, get) => ({
    user: null,
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
        if (useUserStore.getState().initialized) return

        try {
            const res = await useProtectedApi.get('/profile')
            if (res.status !== 200) throw new Error('Invalid or expired authentication token')
            set({ user: res.data, initialized: true })
        } catch (err) {
            set({ user: null, initialized: true })
            throw new Error('Invalid or expired authentication token')
        }
    }
}))