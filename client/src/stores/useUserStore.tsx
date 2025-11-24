import type { TUser } from '@/types/userTypes'
import { create } from 'zustand'

import { useProtectedApi } from '@/lib/axios'

interface IUser {
    user: TUser | null
    pinned: Set<string>
    initialized: boolean
    initProfile: () => void
}

export const useUserStore = create<IUser>((set, get) => ({
    user: null,
    pinned: new Set(['fav']), // Playlist ids. Favorite is pinned by the default
    togglePin: (id: string) => set((state) => {
        const newPinned = new Set(state.pinned)
        if (newPinned.has(id)) newPinned.delete(id)
        else newPinned.add(id)
        return { pinned: newPinned }
    }),
    // User (App) initialization
    initialized: false,
    initProfile: async () => {
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