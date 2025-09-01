import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document

export class PrivateProperties {
    @Prop({ required: true })
    password: string
}

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    _private: PrivateProperties
    
    @Prop({ required: false })
    avatarUrl: string
}

export const UserSchema = SchemaFactory.createForClass(User)

// Pre-save password hashing
UserSchema.pre<UserDocument>('save', async function(next) {
    if (this.isModified('_private.password')) {
        const salt = await bcrypt.genSalt(10)
        this._private.password = await bcrypt.hash(this._private.password, salt)
    }
    next()
})