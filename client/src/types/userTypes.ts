import { z } from 'zod'
import { UserSchema } from '@/schemas/mediaEntities'

export type TUser = z.infer<typeof UserSchema>