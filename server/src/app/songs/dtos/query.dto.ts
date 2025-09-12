import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SongsQuery = z.object({
    page: z.number().positive().optional(),
    pageSize: z.number().positive().optional()
})

export class SongsQueryDto extends createZodDto(SongsQuery) {}