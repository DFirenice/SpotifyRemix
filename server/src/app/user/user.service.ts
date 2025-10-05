import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';
import { MarkFavoriteBodyDto } from './dtos/mark-favorite.dto';
import { Resolvers } from 'src/utils/resolvers';

@Injectable()
export class UserService {
    private supabase: SupabaseClient

    constructor(
        private SupabaseService: SupabaseService,
        private Resolvers: Resolvers
    ) {
        this.supabase = this.SupabaseService.getClient()
    }

    async getLikedSongs(id: string, options?: { complete?: boolean }) {
        if (!id) throw new UnauthorizedException()
        const { data } = await this.supabase.from('liked_songs')
            .select('*')
            .eq('user_id', id)

        if (!data) throw new HttpException("No liked songs found", 204)
        const ids = data[0].liked

        if (!options?.complete) return ids

        // Else giving full songs
        const { data: sData, error } = await this.supabase.from('songs_metadata')
            .select('*')
            .in('id', ids)
        
        if (error) throw new HttpException(error.message, 404) // Not 500 cuz I want so - its always user's fault, not server's, lmao *
        if (!sData || sData.length === 0) throw new HttpException('No songs found', 404)
        
        const deconstructedSongs = await this.Resolvers.resolveAuthors(sData)
        return deconstructedSongs
    }

    async markFavorite({ id, type, userId }: MarkFavoriteBodyDto & { userId: string }) {
        if (type !== 'song' && type !== 'playlist') {
            throw new HttpException("Unknown media type", 400)
        }

        const table = type === 'song' ? 'liked_songs' : 'liked_playlists'

        // Obtaining the current liked array
        const { data, error: fetchError } = await this.supabase
            .from(table)
            .select('liked')
            .eq('user_id', userId)
            .single() // getting only one row

        if (fetchError) throw new HttpException(fetchError.message, 404)

        let likedArray: string[] = data?.liked || []

        if (likedArray.includes(id)) {
            // Removing the item if already liked
            likedArray = likedArray.filter(item => item !== id)
            const { error } = await this.supabase
                .from(table)
                .update({ liked: likedArray })
                .eq('user_id', userId)

            if (error) throw new HttpException(error.message, 404)
            return {
                message: `${type.charAt(0).toUpperCase() + type.slice(1)} removed from liked`,
                success: true
            }
        } else {
            // Adding the item if not liked yet
            likedArray.push(id)
            const { error } = await this.supabase
                .from(table)
                .update({ liked: likedArray })
                .eq('user_id', userId)

            if (error) throw new HttpException(error.message, 404)
            return {
                message: `${type.charAt(0).toUpperCase() + type.slice(1)} marked as liked`,
                success: true
            }
        }
    }
}