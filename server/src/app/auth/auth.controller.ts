import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayloadDto, SignUpPayloadDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    
    @Post('login')
    async login(@Body() loginPayload: LoginPayloadDto) {
        const token = await this.AuthService.login(loginPayload)
        if (!token) throw new BadRequestException()
        return token
    }

    @Post('signup')
    async signUp(@Body() singUpPayload: SignUpPayloadDto) {
        if (!singUpPayload) throw new BadRequestException()
        return this.AuthService.signUp(singUpPayload)
    }
}