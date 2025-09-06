import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RequestUserPayloadDto } from 'src/dtos/payload-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('validate-token')
export class ValidateTokenController {
    @Get()
    @UseGuards(JwtAuthGuard)
    validateToken(@Req() req: Request & { user: RequestUserPayloadDto }) {
        if (req?.user) { return { success: true, isValid: true } }
        return { success: false }
    }
}
