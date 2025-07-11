import { TSong } from '@/types/mediaEntities.types.ts'
import { create } from 'zustand'

import mockSongs from '@/data/temp/songs'

interface IUser {
    favoriteSongs: TSong[]
}

export const useUserStore = create<IUser>(() => ({
    favoriteSongs: mockSongs.toSpliced(2, 3),
}))