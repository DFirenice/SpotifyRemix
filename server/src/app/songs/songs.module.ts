import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [SongsController],
  providers: [SongsService, SupabaseService]
})
export class SongsModule {}
