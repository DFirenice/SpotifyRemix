import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dtos/user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async getProfile(id: string) {
        const user = await this.UserModel.findById(id).lean() as UserDto | null
        if (!user) throw new ForbiddenException()
        
        // Returning the client-side safe object
        const { _private, ...doc } = user
        return doc
    }
}
