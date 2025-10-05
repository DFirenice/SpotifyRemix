import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Resolvers } from 'src/utils/resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { SongsService } from '../songs/songs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, SupabaseService, Resolvers, SongsService]
})
export class PlaylistsModule {}
