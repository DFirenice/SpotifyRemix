import { Ticons } from "@/types/icons"
import FriendsMenu from "@app-comps/AsideMenus/Friends"

export type TStreamItems = {
    icon: Ticons
    droppingComponent?: React.ReactNode
    role: 'button' | [string]
}[]

export const streamItems: TStreamItems = [
    {
        icon: 'news',
        droppingComponent: <div>News Component</div>,
        role: 'button'
    },
    {
        icon: 'private_icon',
        droppingComponent: <div>Private Component</div>,
        role: 'button'
    },
    {
        icon: 'friends',
        droppingComponent: <FriendsMenu />,
        role: 'button'
    },
    {
        icon: 'settings',
        role: ["/settings"]
    }
]