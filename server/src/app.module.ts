import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './app/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './app/profile/profile.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { ValidateTokenModule } from './app/validate-token/validate-token.module';
import { SongsModule } from './app/songs/songs.module';
import { SupabaseModule } from './supabase/supabase.module';
import { GetMediaModule } from './app/get-media/get-media.module';
import { UserModule } from './app/user/user.module';
import { PlaylistsModule } from './app/playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI!),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true
    }),
    AuthModule,
    ProfileModule,
    ValidateTokenModule,
    SongsModule,
    SupabaseModule,
    GetMediaModule,
    UserModule,
    PlaylistsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    }
  ],
})

export class AppModule {}