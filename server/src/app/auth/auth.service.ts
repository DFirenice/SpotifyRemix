import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import bcrypt from 'bcrypt'
import { LoginPayloadDto, SignUpPayloadDto } from './dtos/auth.dto';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private JwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    
    async login(payload: LoginPayloadDto): Promise<string | null> {
        const foundUser = await this.userModel.findOne({ email: payload.email }).lean() as UserDto | null
        // Comparing passwords
        if (foundUser && await bcrypt.compare(payload.password, foundUser._private.password)) {
            return this.JwtService.sign({ user: foundUser }, { expiresIn: '2d' })
        }

        return null
    }


    async signUp(payload: SignUpPayloadDto) {
        if (await this.userModel.findOne({ email: payload.email }))
            throw new HttpException('Account has been already registered', 409)
        
        // Private and public fields separation
        const { password, ..._public } = payload
        const newUser = new this.userModel({
            ..._public,
            _private: { password }
        })
        const savedUser = await newUser.save()
        
        console.log(savedUser.toObject())
        return this.JwtService.sign({ user: savedUser.toObject() }, { expiresIn: '2d' })
    }
}
