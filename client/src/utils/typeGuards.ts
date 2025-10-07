import { SongSchema, FolderSchema, PlaylistSchema, PlaylistsWithResolvedSongs } from '@/schemas/mediaEntities'

export type TMediaEntityType = 'song' | 'folder' | 'playlist' | 'unknown'

export function detectMediaEntityType(data: unknown): TMediaEntityType {
    if (SongSchema.safeParse(data).success) return 'song'
    if (PlaylistSchema.safeParse(data).success || PlaylistsWithResolvedSongs.safeParse(data).success) return 'playlist'
    if (FolderSchema.safeParse(data).success) return 'folder'
    return 'unknown'
}