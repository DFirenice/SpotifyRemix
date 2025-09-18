import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const SongsIdsArray = z.array( z.string() )

const ParseSpecific = z.object({
    songs: SongsIdsArray
})

export class ParseSpecificDto extends createZodDto(ParseSpecific) {}
export class SongsPropDto extends createZodDto(SongsIdsArray) {}