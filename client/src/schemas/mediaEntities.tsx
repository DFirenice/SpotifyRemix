import { z } from 'zod'

// Same as on the backend
export const UserSchema = z.object({
  _id: z.string().optional(),
  username: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
})

// Ref to: mediaEntities.types
export const SongSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string(),
  artist: UserSchema.pick({
    _id: true,
    username: true,
    avatarUrl: true
  }),
  album: z.string().or(z.null()),
  duration: z.number(),
  cover_path: z.string().or(z.null()),    // Reference
  file_path: z.string(),                  // Reference
  tags: z.array(z.string()).or(z.null()), // string[]
  id: z.string()
})

// Ｎｏｔｅ： Unsynced
export const PlaylistSchema = z.object({
  id: z.string(), // Used as reference to where song belongs
  name: z.string(),
  previewURL: z.string(),
  size: z.number(),
  songs: SongSchema.array(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.string().array()
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