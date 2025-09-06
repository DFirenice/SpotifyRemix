import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import bcrypt from 'bcrypt'
import { LoginPayloadDto, SignUpPayloadDto } from './dtos/auth.dto';
import { UserDto } from 'src/dtos/user.dto';
import { JwtUtils } from 'src/utils/jwt.utils';

@Injectable()
export class AuthService {
    constructor(
        @Inject() private JwtUtils: JwtUtils,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    
    async login(payload: LoginPayloadDto): Promise<{ access_token: string } | null> {
        const foundUser = await this.userModel.findOne({ email: payload.email }).lean() as UserDto | null
        // Comparing passwords
        if (foundUser && await bcrypt.compare(payload.password, foundUser._private.password)) {
            const { _id, email } = foundUser
            return this.JwtUtils.signJwt(_id as string, email)
        }

        return null
    }


    async signUp(payload: SignUpPayloadDto): Promise<{ access_token: string } | null> {
        if (await this.userModel.findOne({ email: payload.email }))
            throw new HttpException('Account has been already registered', 409)
        
        // Private and public fields separation
        const { password, ..._public } = payload
        const newUser = new this.userModel({
            ..._public,
            _private: { password }
        })
        const savedUser = await newUser.save()
        
        const { _id, email } = savedUser.toObject()
        return this.JwtUtils.signJwt(_id.toString(), email)
    }
}
