import Heading from "@app-ui/Heading"
import { Button } from "@app-ui/button"
import Icon from "@app-ui/Icon"

import { useAsideStore } from "@/stores/useAside"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

const FriendsMenu = () => {
    const closeMenu = useAsideStore((state) => (state.close))

    return (
        <div className="flex flex-col gap-4 min-w-[15dvw]">
            {/* Panel */}
            <div className="flex flex-row items-center justify-between gap-1">
                <Heading>Friends activity</Heading>
                <div className="flex">
                    <Button variant="ghost" size="icon"><Icon id="add_friend"/></Button>
                    <Button variant="ghost" size="icon" onClick={closeMenu}><Icon id="close"/></Button>
                </div>
            </div>
            {/* Friends list */}
            <div className="grid gap-2.5">
                <div className="flex flex-row gap-3 items-center justify-start">
                    <Avatar className="rounded-full overflow-hidden size-8">
                        <AvatarImage src="https://github.com/Fialex1212.png" alt="You." />
                        <AvatarFallback>{[...'Friend 1'][0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <small>FriendlyMusicListener</small>
                        <div className="flex flex-row gap-1.5 **:text-ellipsis">
                            <div className="flex">
                                <Icon className="text-secondary" id="playing" size="small" />
                                <a className="px-1">Goosebumps</a>
                            </div>
                            <a className="text-fg-secondary">
                                <small>&#9679;</small> Travis Scott
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <Avatar className="rounded-full overflow-hidden size-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="You." />
                        <AvatarFallback>{[...'Friend 1'][0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <small>AverageMusicEnjoyer</small>
                        <div className="flex flex-row gap-2.5 **:text-ellipsis">
                            <div className="flex">
                                <span className="text-icon-default w-[24px]">1h</span>
                                <a className="px-1">would he</a>
                            </div>
                            <a className="text-fg-secondary">
                                <small>&#9679;</small> joji
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsMenu