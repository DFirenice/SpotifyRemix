import Heading from "@app-ui/Heading"
import { Button } from "@app-ui/button"
import Icon from "@app-ui/Icon"

import { useAsideStore } from "@/stores/useAside"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

const FriendsMenu = () => {
    const closeMenu = useAsideStore((state) => (state.close))

    return (
        <div className="flex flex-col gap-4 min-w-[15dvw]">
            <div className="flex flex-row items-center justify-between gap-1">
                <Heading>Friends activity</Heading>
                <div className="flex">
                    <Button variant="ghost" size="icon"><Icon id="add_friend"/></Button>
                    <Button variant="ghost" size="icon" onClick={closeMenu}><Icon id="close"/></Button>
                </div>
            </div>
            {/* Users */}
            <div className="flex flex-col">
                <div className="flex flex-row gap-3">
                    <Avatar className="rounded-full overflow-hidden size-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="You." />
                        <AvatarFallback>{[...'Friend 1'][0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Heading>FriendlyMusicListener</Heading>
                        <div className="flex flex-row">
                            <Icon id="playing" size="small" /><span>Goosebumps</span>
                            <a href="" className="text-accent-gray">&nbsp;&#9679; Author</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsMenu