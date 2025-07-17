import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  username: z.string()
})

// Ref to: mediaEntities.types
export const SongSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: UserSchema,
  belongsRef: z.string().nullable(),
  duration: z.number(),
  previewURL: z.string(),
  sourceURL: z.string(),
  uploadedAt: z.string(),
  updatedAt: z.string()
})

export const PlaylistSchema = z.object({
  id: z.string(), // Used as reference to where song belongs
  name: z.string(),
  previewURL: z.string(),
  size: z.number(),
  songs: SongSchema.array(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const FolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  playlists: z.array(PlaylistSchema),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})