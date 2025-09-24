import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Resolvers } from 'src/utils/resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }])
  ],
  controllers: [SongsController],
  providers: [SongsService, SupabaseService, Resolvers]
})
export class SongsModule {}
