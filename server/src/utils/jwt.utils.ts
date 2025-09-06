import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import mongoose from "mongoose";

/** Returns signed JWT with user's email & _id params encoded in it */
@Injectable()
export class JwtUtils {
    constructor(@Inject() private jwtService: JwtService) {}

    signJwt (_id: string, email: string) {
        const access_token = this.jwtService.sign({ user: { _id, email } }, { expiresIn: '1d' })
        return { access_token }
    }
}