import Image from "next/image"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/Icon"
import Tag from "@/components/ui/Tag"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"
import PlayBtn from "./ui/PlayBtn"

// (!) PlaylistSection should accept props of type Playlist
const PlaylistSection = ({ imgUrl }: { imgUrl: string }) => {
    return (
        <section className="relative h-[77%] w-full snap-start overflow-hidden rounded-lg">
            <div className="
                absolute inset-0
                flex justify-center items-center gap-[3rem]
            ">
                <div className="relative w-[16dvw] aspect-[1/2]">
                    <Image src={imgUrl} fill className="object-cover rounded-2xl" alt="Discover" />
                </div>
                <div className="flex flex-row gap-4">
                    {/* Belonging album image */}
                    <div className="w-[10dvw] aspect-square bg-pink-200 rounded-xl"></div>

                    <div className="space-y-4">
                        <Heading level={2} size="large">Linkin Park Mix</Heading>

                        {/* Playlist data */}
                        <div className="
                            flex items-center text-sm text-muted-foreground
                            [&>*:not(:first-child)]:before:content-['•'] [&>*:not(:first-child)]:before:mx-2
                        ">
                            <span>By <a className="text-accent-default underline">Spotify</a></span>
                            <span>Playlist year</span>
                            <span>22 songs</span>
                            <span>Total duration</span>
                        </div>

                        {/* Controls */}
                        <div className="inline-flex items-center gap-x-2">
                            <PlayBtn reference />
                            <Button variant="ghost" className="p-0 gap-0">
                                <Icon id="save" />
                                <span className="pr-2 text-fg-secondary">622k</span>
                            </Button>

                            <Button variant="ghost" size="icon"> <Icon id="add_to_playlist" /> </Button>
                            <Button variant="ghost" size="icon"> <Icon id="add_to_queue" /> </Button>
                            <Button variant="ghost" size="icon"> <Icon id="share" /> </Button>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"> <Icon id="more" /> </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="
                                    w-56 bg-dp-0 rounded-md py-1.5 px-1.5
                                    border-1 border-fg-secondary/38 cursor-default
                                ">
                                    <DropdownMenuLabel className="font-bold px-1.75">Playlist</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup className="**:hover:outline-none **:px-1.5 **:py-0.5 **:hover:bg-dp-1">
                                        <DropdownMenuItem>
                                            <DropdownMenuLabel>Add to queue</DropdownMenuLabel>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <DropdownMenuLabel>Mark as favorite</DropdownMenuLabel>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <DropdownMenuLabel>Open the playlist</DropdownMenuLabel>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Tags */}
                        <div className="space-x-2">
                            <Tag text="Rock" secondary />
                            <Tag text="Alt Rock" secondary />
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlaylistSection