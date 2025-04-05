import NavItem from "@/components/ui/NavItem"
import Search from '@/components/ui/Search'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import Icon from "@/components/ui/Icon"
import { Ticons } from "@/types/icons"

const Navigation = ({ ...props }) => {
    // Temporary data: until functionality
    const streamItems: Ticons[] = [
        "news", "private_icon", "friends",
        "settings"
    ]
    return (
        <header { ...props }>
            <div className="grid grid-cols-[minmax(250px,auto)_auto_auto_auto_1fr] gap-1.5">
                {/* Navigation */}
                <NavItem link="/library" text="My Library" icon="library" root />
                <NavItem link="/" text="Home" icon="home" root />
                <NavItem link="/discover" text="Discover" icon="discover" root />
                <Search />
                {/* User panel */}
                <div className="flex justify-end flex-1 items-center gap-1.5">
                    { streamItems.map((item, idx) => (
                        <Button
                            key={`${item}_${idx}`}
                            className="h-full w-auto"
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <a><Icon size="large" id={item} /></a>
                        </Button>
                    )) }
                    <Avatar className="rounded-full overflow-hidden size-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="You." />
                        <AvatarFallback>{'Username'.split('')[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

export default Navigation