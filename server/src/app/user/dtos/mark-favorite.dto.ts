import { createZodDto } from 'nestjs-zod';
import { z } from 'zod'

const MarkFavoriteBody = z.object({
    id: z.string(),
    type: z.enum(['song', 'playlist'])
})

export class MarkFavoriteBodyDto extends createZodDto(MarkFavoriteBody) {}