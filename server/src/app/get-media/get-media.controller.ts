import { Body, Controller, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetMediaService } from './get-media.service';

@Controller('get-media')
@UseGuards(JwtAuthGuard)
export class GetMediaController {
    constructor (private Service: GetMediaService) {}
    
    @Post('cover')
    getSignedCover(@Body() { path }: { path: string }) {
        const signedUrl = this.Service.getSignedCover(path)
        if (signedUrl) return signedUrl
        throw new NotFoundException()
    }

    @Post('song')
    getSignedSong(@Body() { path }: { path: string }) {
        const signedUrl = this.Service.getSignedSong(path)
        if (signedUrl) return signedUrl
        throw new NotFoundException()
    }
}
