import { TSong } from '@/types/mediaEntities.types.ts'
import { create } from 'zustand'

import mockSongs from '@/data/temp/songs'

interface IUser {
    favoriteSongs: TSong[]
    pinned: Set<string>
}

export const useUserStore = create<IUser>((set, get) => ({
    favoriteSongs: mockSongs.toSpliced(2, 3),
    pinned: new Set(['fav', 'playlist-001', 'playlist-002']),
    togglePin: (id: string) => set((state) => {
        const newPinned = new Set(state.pinned)
        if (newPinned.has(id)) newPinned.delete(id)
        else newPinned.add(id)
        return { pinned: newPinned }
    })
}))