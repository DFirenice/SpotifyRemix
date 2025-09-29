import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayloadDto, SignUpPayloadDto } from './dtos/auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    private cookieMaxAge = 86400000
    
    @Post('login')
    async login(@Body() loginPayload: LoginPayloadDto, @Res() res: Response) {
        const token = await this.AuthService.login(loginPayload)
        const expirationDate = new Date(Date.now() + this.cookieMaxAge) // Expires in 1 day
        
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: true,
            expires: expirationDate,
            maxAge: this.cookieMaxAge,
            secure: process.env.BUILD === 'production'
        })

        if (!token) throw new BadRequestException({ message: "Invalid email or password" })
        return res.status(200).send({ success: true })
    }

    @Post('signup')
    async signUp(@Body() singUpPayload: SignUpPayloadDto, @Res() res: Response) {
        if (!singUpPayload) throw new BadRequestException()
            
        const token = this.AuthService.signUp(singUpPayload)
       const expirationDate = new Date(Date.now() + 86400000) // Expires in 1 day
        
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: true,
            expires: expirationDate,
            maxAge: this.cookieMaxAge,
            secure: process.env.BUILD === 'production'
        })
        
        return res.status(200).send({ success: true })
    }
}