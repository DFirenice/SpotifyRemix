import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestUserPayloadDto } from 'src/dtos/payload-user.dto';

@Controller('profile')
export class ProfileController {
    constructor(private ProfileService: ProfileService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: Request & { user: RequestUserPayloadDto }) {
        return this.ProfileService.getProfile(req.user.userId)
    }
}
