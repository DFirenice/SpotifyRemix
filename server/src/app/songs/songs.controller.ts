import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SongsService } from './songs.service';
import { SongsQueryDto } from './dtos/query.dto';

@Controller('songs')
export class SongsController {
    constructor(private SongsService: SongsService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async parseSongs (@Query() query: SongsQueryDto) {
        const songs = await this.SongsService.getSongs(query)
        if (!songs) throw new NotFoundException()
        return { songs }
    }
}
