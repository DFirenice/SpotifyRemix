import { HttpException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { PlaylistDto, UnrefinedPlaylistDto } from "src/app/auth/dtos/playlists.dto"
import { SongDto } from "src/app/auth/dtos/songs.dto"
import { User } from "src/schemas/user.schema"

/** Populates artist using user id */
@Injectable()
export class Resolvers {
    constructor (@InjectModel(User.name) private UserModel: Model<User>) {}
    
    async resolveAuthors (data: SongDto[] | UnrefinedPlaylistDto[]) {
        return await Promise.all(
            data.map(async (mediaEntity: SongDto | UnrefinedPlaylistDto)=> {
                const user = await this.UserModel.findById(
                    (mediaEntity as SongDto)?.artist || (mediaEntity as PlaylistDto)?.user_id
                ).lean()
                if (!user) throw new HttpException("Artist not found", 404)

                // Whether it is a song or a playlist, will override or add deconstructed 'artist' property
                return {
                    ...mediaEntity,
                    artist: {
                        _id: user._id,
                        username: user.username,
                        avatarUrl: user.avatarUrl
                    }
                }
            })
        )
    }
}