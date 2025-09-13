import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SongsPath = z.object({
    cover_path: z.string(),
    file_path: z.string()
})

export class SongsPathDto extends createZodDto(SongsPath) {}