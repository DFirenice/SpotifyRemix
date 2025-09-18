import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SongsQueryDto } from './dtos/query.dto';
import { SongDto } from '../auth/dtos/songs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { SongsPropDto } from './dtos/parse-specific.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SongsService {
    private supabase: SupabaseClient
    
    constructor (
        private SupabaseService: SupabaseService,
        @InjectModel(User.name) private UserModel: Model<User>
    ) {
        this.supabase = this.SupabaseService.getClient()
    }

    // Utility method
    /** Populates artist using its id */
    async resolveAuthors (data: any) {
        return await Promise.all(
            data.map(async (song: SongDto)=> {
                let user = await this.UserModel.findById(song.artist).lean()
                if (!user) throw new HttpException("Artist not found", 404)

                return {
                    ...song,
                    artist: {
                        _id: user._id,
                        username: user.username,
                        avatarUrl: user.avatarUrl
                    }
                }
            })
        )
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
        const deconstructedSongs = await this.resolveAuthors(data)
        return deconstructedSongs
    }

    async getSpecific(requestedSongs: SongsPropDto) {
        const { data, error } = await this.supabase.from('songs_metadata')
            .select('*')
            .in('id', requestedSongs)
        
        if (error) throw new HttpException(error.message, 404) // Not 500 cuz I want so - its always user's fault, not server's, lmao *
        if (!data || data.length === 0) throw new HttpException('No songs found', 404)
        
        const deconstructedSongs = await this.resolveAuthors(data)
        return deconstructedSongs
    }
}
