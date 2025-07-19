import { z } from 'zod'
import { SongSchema, PlaylistSchema, FolderSchema } from '@/schemas/mediaEntities'

export type TSong = z.infer<typeof SongSchema>

export type TPlaylist = z.infer<typeof PlaylistSchema>

export type TFolder = z.infer<typeof FolderSchema>

// Media union
export type TMediaEntity = TSong | TPlaylist | TFolder