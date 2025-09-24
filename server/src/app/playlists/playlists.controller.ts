import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
@UseGuards(JwtAuthGuard)
export class PlaylistsController {
    constructor (private PlaylistsService: PlaylistsService) {}
    
    // Gets personalized playlists for the user
    @Get()
    async getPersonalizedPlaylists () {
        const playlists = await this.PlaylistsService.getPlaylists()
        return { playlists }
    }
}
