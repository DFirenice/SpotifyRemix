import { z } from 'zod'
import { createZodDto } from 'nestjs-zod'

const UserSchema = z.object({
  _id: z.string().optional(),
  username: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
})

const ArtistSchema = UserSchema.pick({
  _id: true,
  username: true,
  avatarUrl: true
})

export const Playlist = z.object({
    id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    cover_path: z.string().or(z.null()),
    songs: z.array(z.string()),
    tags: z.array(z.string()).or(z.null()),
    name: z.string().or(z.null()),
    size: z.number().positive(),
    author: ArtistSchema
})

export class PlaylistDto extends createZodDto(Playlist) {}
export class UnrefinedPlaylistDto extends createZodDto(Playlist.omit({ size: true, author: true })) {}