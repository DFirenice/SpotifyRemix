import { Body, Controller, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetMediaService } from './get-media.service';
import { SongsPathDto } from './dtos/songs-path.dto';

@Controller('get-media')
@UseGuards(JwtAuthGuard)
export class GetMediaController {
    constructor (private Service: GetMediaService) {}
    
    @Post('cover')
    async getSignedCover(@Body() { path }: { path: string }) {
        if (!path) throw new NotFoundException()
        const signedUrl = await this.Service.getSignedCover(path)
        if (signedUrl) return signedUrl
        throw new NotFoundException()
    }

    @Post('song')
    async getSignedSong(@Body() { path }: { path: string }) {
        if (!path) throw new NotFoundException()
        const signedUrl = await this.Service.getSignedSong(path)
        if (signedUrl) return signedUrl
        throw new NotFoundException()
    }

    @Post('full-song')
    async getFullSong(@Body() {
        cover_path,
        file_path
    }: SongsPathDto) {
        const cover = await this.Service.getSignedCover(cover_path),
            song = await this.Service.getSignedSong(file_path)

        if (!song || !cover) throw new NotFoundException()
        return { coverUrl: cover, songUrl: song }
    }
}
