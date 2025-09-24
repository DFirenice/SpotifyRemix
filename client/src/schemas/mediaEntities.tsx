import { z } from 'zod'

// Same as on the backend
export const UserSchema = z.object({
  _id: z.string().optional(),
  username: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
})

export const ArtistSchema = UserSchema.pick({
  _id: true,
  username: true,
  avatarUrl: true
})
export const TagsSchema = z.array(z.string()).or(z.null())

// Ref to: mediaEntities.types
export const SongSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string(),
  artist: ArtistSchema,
  album: z.string().or(z.null()),
  duration: z.number(),
  cover_path: z.string().or(z.null()),    // Reference
  file_path: z.string(),                  // Reference
  tags: TagsSchema,
  id: z.string()
})

export const PlaylistSchema = z.object({
  user_id: z.string(), // Used as reference to where song belongs
  artist: ArtistSchema,
  name: z.string(),
  size: z.number(),
  songs: z.array(SongSchema),
  cover_path: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: TagsSchema
})

// Ｎｏｔｅ： Unsynced
export const FolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  playlists: z.array(PlaylistSchema),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})