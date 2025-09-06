import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RequestUserPayloadDto } from "src/dtos/payload-user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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