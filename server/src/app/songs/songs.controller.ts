import { Body, Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SongsService } from './songs.service';
import { SongsQueryDto } from './dtos/query.dto';
import { ParseSpecificDto } from './dtos/parse-specific.dto';

@Controller('songs')
@UseGuards(JwtAuthGuard)
export class SongsController {
    constructor(private SongsService: SongsService) {}
    
    // Returns recommended to user songs
    @Get()
    async getPersonalizedSongs (@Query() query: SongsQueryDto) {
        const songs = await this.SongsService.getSongs(query)
        if (!songs) throw new NotFoundException()
        return { songs }
    }

    // Returns exact set of requested songs
    @Post()
    async parseSpecific (@Body() { songs: reqestedSongs }: ParseSpecificDto) {
        const songs = await this.SongsService.getSpecific(reqestedSongs)
        if (!songs) throw new NotFoundException()
        return { songs }
    }
}
