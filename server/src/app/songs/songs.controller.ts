import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private SongsService: SongsService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async parseSongs () {
        const songs = await this.SongsService.getSongs()
        if (!songs) throw new NotFoundException()
        return { songs }
    }
}
