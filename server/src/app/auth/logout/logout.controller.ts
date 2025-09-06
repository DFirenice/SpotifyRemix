import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth/logout')
export class LogoutController {
    @Get()
    logout (@Res() res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: true,
            secure: process.env.BUILD === 'production'
        })
        return res.json({ sucess: true, message: "Logged out" })
    }
}
