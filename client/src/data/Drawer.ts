import { type Ticons } from "@/types/icons"

type TMenuList = {
     text: string
     iconId: Ticons
}[]

export const menuList: TMenuList = [
    {
        text: 'Pins',
        iconId: 'pin'
    },
    {
        text: 'Playlists',
        iconId: 'playlist'
    },
    {
        text: 'Liked songs',
        iconId: 'like'
    },
    {
        text: 'Saves',
        iconId: 'save'
    },
    {
        text: 'Albums',
        iconId: 'album'
    },
    {
        text: 'Folders',
        iconId: 'folder'
    },
    {
        text: 'Podcasts',
        iconId: 'podcast'
    },
    {
        text: 'Audiobooks',
        iconId: 'audiobook'
    },
    {
        text: 'Artists',
        iconId: 'artist'
    },
]