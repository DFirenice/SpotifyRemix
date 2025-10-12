import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class GetMediaService {
    private supabase: SupabaseClient;
    private SIGNED_FILE_MAX_AGE = 60 // in seconds*

    constructor (private SupabaseService: SupabaseService) {
        this.supabase = this.SupabaseService.getClient()
    }
    
    async getSignedCover(coverPath: string) {
        const { data, error } = await this.supabase.storage
            .from('covers').createSignedUrl(coverPath, this.SIGNED_FILE_MAX_AGE)
        
        if (error) throw new HttpException(error, 404)
        return { signedUrl: data.signedUrl }
    }
    
    async getSignedSong(filePath: string) {
        const { data, error } = await this.supabase.storage
            .from('songs').createSignedUrl(filePath, this.SIGNED_FILE_MAX_AGE)

        if (error) throw new HttpException(error, 404)
        return { signedUrl: data.signedUrl }
    }
}
