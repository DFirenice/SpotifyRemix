import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SongsService {
    constructor (private SupabaseService: SupabaseService) {}
    async getSongs() {
        const supabase = this.SupabaseService.getClient()
        const { data, error } = await supabase.from('metadata').select('*')

        if (error) throw error
        return data
    }
}
