import { SongSchema, FolderSchema, PlaylistSchema } from '@/schemas/mediaEntities'

export type TMediaEntityType = 'song' | 'folder' | 'playlist' | 'unknown'

export function detectMediaEntityType(data: unknown): TMediaEntityType {
    if (SongSchema.safeParse(data).success) return 'song'
    if (FolderSchema.safeParse(data).success) return 'folder'
    if (PlaylistSchema.safeParse(data).success) return 'playlist'
    return 'unknown'
}