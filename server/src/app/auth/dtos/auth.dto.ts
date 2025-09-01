import { z } from 'zod'
import { UserObject } from 'src/dtos/user.dto'
import { createZodDto } from 'nestjs-zod'

// Sing In
export const LoginPayload = z.object({
    email: UserObject.shape.email,
    password: UserObject.shape._private.shape.password
})

export class LoginPayloadDto extends createZodDto(LoginPayload) {}

// Sign Up
export const SignUpPayload = z.object({
    username: UserObject.shape.username,
    email: UserObject.shape.email,
    password: UserObject.shape._private.shape.password
})

export class SignUpPayloadDto extends createZodDto(SignUpPayload) {}