import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class GetMediaService {
    private supabase: SupabaseClient;
    constructor (private SupabaseService: SupabaseService) {
        this.supabase = this.SupabaseService.getClient()
    }

    async getSignedCover(coverPath: string) {
        const { data, error } = await this.supabase.storage
            .from('covers').createSignedUrl(coverPath, 60)
        
        if (error) throw new HttpException(error, 404)
        return { signedUrl: data.signedUrl }
    }
    
    async getSignedSong(filePath: string) {
        const { data, error } = await this.supabase.storage
            .from('songs').createSignedUrl(filePath, 60)

        if (error) throw new HttpException(error, 404)
        return { signedUrl: data.signedUrl }
    }
}
