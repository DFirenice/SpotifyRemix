import { type Ticons } from "@/types/icons"

type TMenuList = {
     text: string
     iconId: Ticons
     link: string
}[]

export const menuList: TMenuList = [
    {
      text: 'Pins',
      iconId: 'pin',
      link: '/pins'
    },
    {
      text: 'Playlists',
      iconId: 'playlist',
      link: '/playlists'
    },
    {
      text: 'Liked songs',
      iconId: 'like',
      link: '/liked'
    },
    {
      text: 'Saves',
      iconId: 'save',
      link: '/saves'
    },
    {
      text: 'Albums',
      iconId: 'album',
      link: '/albums'
    },
    {
      text: 'Folders',
      iconId: 'folder',
      link: '/folders'
    },
    {
      text: 'Podcasts',
      iconId: 'podcast',
      link: '/podcasts'
    },
    {
      text: 'Audiobooks',
      iconId: 'audiobook',
      link: '/audiobooks'
    },
    {
      text: 'Artists',
      iconId: 'artist',
      link: '/artists'
    }
]