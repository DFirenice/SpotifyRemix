import { Body, Controller, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from 'src/decorators/user/user.decorator';
import { MarkFavoriteBodyDto } from './dtos/mark-favorite.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor (private service: UserService) {}
    
    @Get('liked/songs')
    async getLikedSongs(@User('userId') userId) {
        const songs = await this.service.getLikedSongs(userId)
        return { songs }
    }

    @Get('liked/full-songs')
    async getResolvedLikedSongs(@User('userId') userId) {
        const songs = await this.service.getLikedSongs(userId, { complete: true })
        return { songs }
    }
    
    @Post('mark-favorite')
    async markFavorite(@User('userId') userId, @Body() body: MarkFavoriteBodyDto) {
        const res = await this.service.markFavorite({ ...body, userId })
        return res
    }
}
