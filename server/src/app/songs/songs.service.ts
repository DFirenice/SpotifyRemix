import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SongsQueryDto } from './dtos/query.dto';
import { SongsPropDto } from './dtos/parse-specific.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { Resolvers } from 'src/utils/resolvers';

@Injectable()
export class SongsService {
    private supabase: SupabaseClient
    
    constructor (
        private SupabaseService: SupabaseService,
        private Resolvers: Resolvers
    ) {
        this.supabase = this.SupabaseService.getClient()
    }

    async getSongs(query: SongsQueryDto) {
        const pageSize = query?.pageSize || 10,
            pageFrom = (query?.page || 0) * pageSize,
            pageTo = pageFrom + pageSize - 1
        
        const { data, error } = (
            await this.supabase.from('songs_metadata')
                .select('*')
                .range(pageFrom, pageTo)
        )
        
        if (error) throw error

        // Resolving Author Names
        const deconstructedSongs = await this.Resolvers.resolveAuthors(data)
        return deconstructedSongs
    }

    async getSpecific(requestedSongs: SongsPropDto) {
        const { data, error } = await this.supabase.from('songs_metadata')
            .select('*')
            .in('id', requestedSongs)
        
        if (error) throw new HttpException(error.message, 404) // Not 500 cuz I want so - its always user's fault, not server's, lmao *
        if (!data || data.length === 0) throw new HttpException('No songs found', 404)
        
        const deconstructedSongs = await this.Resolvers.resolveAuthors(data)
        return deconstructedSongs
    }
}
