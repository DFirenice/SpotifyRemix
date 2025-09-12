import { createZodDto } from "nestjs-zod"
import { z } from "zod"

export const Song = z.object({
    created_at: z.string(),
    title: z.string(),
    artist: z.string(),
    album: z.string().or(z.null()),
    duration: z.number(),
    cover_path: z.string().or(z.null()),
    file_path: z.string(),
    tags: z.array(z.string()).or(z.null()),
    updated_at: z.string(),
    id: z.string()
})

export class SongDto extends createZodDto(Song) {}