import { createZodDto } from "nestjs-zod"
import { z } from "zod"

export const UserObject = z.object({
    _id: z.string().optional(),

    email: z.email({ error: "Invalid email format" }),

    username: z.string()
        .min(3, { error: 'Username must be at least 3 characters long' })
        .max(20, { error: 'Username must not exceed 20 characters' }),

    _private: z.object({
        password: z.string()
            .min(6, { error: 'Password must be at least 6 characters long' })
            .max(50, { error: 'Password must not exceed 50 characters' }),
    }),

    avatarUrl: z.url({ error: 'Invalid image url' }).optional()
})

export class UserDto extends createZodDto(UserObject) {}