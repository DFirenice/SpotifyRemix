import { Injectable } from '@nestjs/common';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Resolvers } from 'src/utils/resolvers';
import { PlaylistDto, UnrefinedPlaylistDto } from '../auth/dtos/playlists.dto';

@Injectable()
export class PlaylistsService {
    private supabase: SupabaseClient;
    constructor (
        private SupabaseService: SupabaseService,
        private Resolvers: Resolvers
    ) {
        this.supabase = this.SupabaseService.getClient()
    }
    
    async getPlaylists () {
        // Ｎｏｔｅ： Add query and range
        const { data, error } = await this.supabase.from('playlists_metadata')
            .select('*')
        
        if (error) throw error

        const clientSyncedData = data.map((song: UnrefinedPlaylistDto) => ({
            ...song,
            size: song.songs.length,
        }))

        const deconstructedPlaylists = await this.Resolvers.resolveAuthors(clientSyncedData)
        return deconstructedPlaylists
    }
}
