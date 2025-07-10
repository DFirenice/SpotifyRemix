import { SongSchema, FolderSchema, PlaylistSchema } from '@/schemas/mediaEntities'

export function detectMediaEntityType(data: unknown): 'song' | 'folder' | 'playlist' | 'unknown' {
    if (SongSchema.safeParse(data).success) return 'song'
    if (FolderSchema.safeParse(data).success) return 'folder'
    if (PlaylistSchema.safeParse(data).success) return 'playlist'
    return 'unknown'
}