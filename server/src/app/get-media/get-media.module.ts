import { Module } from '@nestjs/common';
import { GetMediaController } from './get-media.controller';
import { GetMediaService } from './get-media.service';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [GetMediaController],
  providers: [GetMediaService, JwtService, SupabaseService]
})
export class GetMediaModule {}
