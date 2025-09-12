import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SongsQueryDto } from './dtos/query.dto';
import { SongDto } from '../auth/dtos/songs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Document, Model } from 'mongoose';

@Injectable()
export class SongsService {
    constructor (
        private SupabaseService: SupabaseService,
        @InjectModel(User.name) private UserModel: Model<User>
    ) {}

    async getSongs(query: SongsQueryDto) {
        const supabase = this.SupabaseService.getClient()

        const pageSize = query?.pageSize || 10,
            pageFrom = (query?.page || 0) * pageSize,
            pageTo = pageFrom + pageSize - 1
        
        const { data, error } = (
            await supabase.from('metadata')
                .select('*')
                .range(pageFrom, pageTo)
        )
        
        if (error) throw error

        // Resolving Author Names
        const deconstructedSongs = await Promise.all(
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
        
        return deconstructedSongs
    }
}
