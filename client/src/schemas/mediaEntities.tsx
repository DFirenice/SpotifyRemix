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
  id: z.string(),
  name: z.string(),
  author: UserSchema.pick({
    _id: true,
    username: true
  }),
  belongsRef: z.string().nullable(),
  duration: z.number(),
  previewURL: z.string(),
  sourceURL: z.string(),
  uploadedAt: z.string(),
  updatedAt: z.string(),
  tags: z.string().array()
})

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

export const FolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  playlists: z.array(PlaylistSchema),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})