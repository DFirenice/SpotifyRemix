import NavItem from "@/components/ui/NavItem"
import Search from '@/components/ui/Search'
import Icon from "@/components/ui/Icon"

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import { discoverThemes } from "@/data/DiscoverPage"
import { homeThemes } from "@/data/HomePage"
import { streamItems } from '@/data/Navigation'

import { genSlug } from "@/utils/genSlug"
import { useAsideStore } from "@/stores/useAside"
import { useShallow } from 'zustand/shallow'
import ContextMenu from "./ui/ContextMenu"
import { useUserStore } from "@/stores/useUserStore"

// Dev
import type { Ticons } from "@/types/icons"
import { logout } from "@/lib/auth"

const Navigation = ({ ...props }) => {
    const { user } = useUserStore()
    const { toggleAsideMenu, currentAside } = useAsideStore(
        useShallow(
            (state) => ({
                toggleAsideMenu: state.toggle,
                currentAside: state.openAside
            })
        )
    )

    const openMenu = (component: React.ReactNode) => { toggleAsideMenu(component) }

    const HomeInitialTheme = genSlug(homeThemes[0])
    const DiscoverInitialTheme = genSlug(discoverThemes[0])
    
    // Dropping down context menu on Avatar clicking
    const UserAvatarComponent = (
        <Avatar className="rounded-full overflow-hidden size-8">
            <AvatarImage src={user?.avatarUrl} alt="You." />
            <AvatarFallback>{[...String(String(user?.username))][0].toUpperCase()}</AvatarFallback>
        </Avatar>
    )

    const avatarContextMenu = {
        menuLabel: "Your Profile",
        items: [
            {
                label: "Profile",
                action: () => { console.log(user?.username) },
                icon: "private_icon" as Ticons
            },
            {
                label: "Logout",
                action: () => { logout() },
                icon: "off" as Ticons
            }
        ]
    }
    
    return (
        <header { ...props }>
            <div className="grid grid-cols-[auto_auto_auto_1fr] gap-1.5">

                {/* Navigation */}
                <NavItem link={['/home', HomeInitialTheme]} text="Home" icon="home" root />
                <NavItem link={['/discover', DiscoverInitialTheme]} text="Discover" icon="discover" root />

                <Search />

                {/* User panel: settings, friends, feed */}
                <div className="flex justify-end flex-1 items-center gap-1.5">
                    { streamItems.map(({ icon, role, droppingComponent }, idx) => (
                        <Button
                            { ...(role === 'button' && { onClick: () => openMenu(droppingComponent) }) }
                            key={`${icon}_${idx}`}
                            className="h-full w-auto"
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <a { ...(Array.isArray(role) && { href: role[0] }) }>
                                <Icon size="large" id={icon} active={currentAside === droppingComponent} />
                            </a>
                        </Button>
                    )) }

                    <ContextMenu content={avatarContextMenu} triggerElement={UserAvatarComponent} />
                </div>
                
            </div>
        </header>
    )
}

export default Navigation