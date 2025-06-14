import type { TUser } from "@app-types/userTypes"

export type TPlaylist = string

export type TSong = {
    id: string
    name: string
    author: TUser
    belongsRef: TPlaylist
    duration: number // seconds
    
    previewURL: string
    sourceURL: string

    createdAt: string
    updatedAt: string
}