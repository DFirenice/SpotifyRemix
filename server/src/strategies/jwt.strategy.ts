import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { RequestUserPayloadDto } from "src/dtos/payload-user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => req.cookies?.access_token?.access_token,
            secretOrKey: process.env.JWT_SECRET!,
            ignoreExpiration: false,
        })
    }

    // Decoded JWT
    async validate(payload: any) {
        if (!payload?.user) throw new UnauthorizedException()
        return {
            userId: payload.user._id,
            email: payload.user.email
        } as RequestUserPayloadDto
    }
}