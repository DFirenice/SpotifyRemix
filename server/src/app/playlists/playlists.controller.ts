import { Body, Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PlaylistsService } from './playlists.service';
import { SongsService } from '../songs/songs.service';
import { PlaylistDto, UnrefinedPlaylistDto } from '../auth/dtos/playlists.dto';

@Controller('playlists')
@UseGuards(JwtAuthGuard)
export class PlaylistsController {
    constructor(
        private PlaylistsService: PlaylistsService,
        private SongsService: SongsService,
    ) {}
    
    // Gets personalized playlists for the user
    @Get()
    async getPersonalizedPlaylists() {
        const playlists = await this.PlaylistsService.getPlaylists()
        // Map each playlist to ensure it matches PlaylistDto
        const parsedPlaylists: PlaylistDto[] = (playlists ?? []).map((p: any) => ({
            id: p.id,
            name: p.name ?? null,
            author: p.author,
            created_at: p.created_at,
            updated_at: p.updated_at,
            cover_path: p.cover_path ?? null,
            songs: p.songs ?? [],
            tags: p.tags ?? null,
            size: p.size ?? (p.songs ? p.songs.length : 0), // Ensuring 'size' exists
        }))

        if (parsedPlaylists.length > 0) {
            // const clientReadyPlaylists = await Promise.all(
            //     parsedPlaylists.map(async p => {
            //         const resolvedSongs = await this.SongsService.getSpecific(p.songs)
            //         return { ...p, songs: resolvedSongs }
            //     })
            // )
            // clientReadyPlaylists
            return { playlists }
        }
        return { playlists: undefined }
    }

    @Get(':id')
    async getPlaylist(@Param('id') id: string) {
        const playlist = await this.PlaylistsService.getPlaylist(id)
        if (!playlist) throw new NotFoundException()
        
        const resolvedSongs = await this.SongsService.getSpecific((playlist as any).songs)
        return {
            ...playlist,
            songs: resolvedSongs,
            size: resolvedSongs.length
        }
    }
}
