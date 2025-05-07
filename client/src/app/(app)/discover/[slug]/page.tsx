'use client'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import Icon from "@/components/ui/Icon"
import Tag from "@/components/ui/Tag"
import Image from "next/image"

const DiscoveryThemePage = () => {
    // Temporarly hardcoded constant
    const imgUrl = "https://i.pinimg.com/736x/3c/2f/7c/3c2f7c684930ed9d420e09413fc2b904.jpg"

    return (
        <div
            className="
                overflow-y-scroll hide-scrollbar w-full snap-y snap-mandatory
                relative bg-cover bg-center
            "
            style={{ backgroundImage: `url(${imgUrl})` }}
        >
            <section className="relative h-min-[70dvh] h-full w-full snap-start">
                <div className="
                    absolute inset-0 backdrop-blur-lg bg-black/70
                    flex justify-center items-center gap-[3rem]
                ">
                    <div className="relative w-[22dvw] aspect-[1/1.5]">
                        <Image src={imgUrl} fill className="object-cover rounded-2xl" alt="Discover" />
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-[10dvw] aspect-square bg-pink-200 rounded-xl">
                            {/* Belonging album image */}
                        </div>
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
                            <div className="space-x-1.5">
                                <Button variant="none" size="icon">
                                    <Icon id="play" />
                                </Button>
                                <Button variant="ghost" className="p-0 gap-0">
                                    <Icon id="save" />
                                    <span className="pr-2 text-fg-secondary">622k</span>
                                </Button>
                                <Button variant="ghost" size="icon"> <Icon id="add_to_playlist" /> </Button>
                                <Button variant="ghost" size="icon"> <Icon id="add_to_queue" /> </Button>
                                <Button variant="ghost" size="icon"> <Icon id="share" /> </Button>
                                <Button variant="ghost" size="icon"> <Icon id="more" /> </Button>
                            </div>
                            {/* Tags */}
                            <div className="space-x-2">
                                <Tag text="Rock" secondary />
                                <Tag text="Rock Alt" secondary />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative h-min-[70dvh] h-full w-full snap-start">
                <div className="
                    absolute inset-0 backdrop-blur-lg bg-black/70
                    flex justify-center items-center gap-[3rem]
                ">
                    <div className="relative w-[22dvw] aspect-[1/1.5]">
                        <Image src={imgUrl} fill className="object-cover rounded-2xl" alt="Discover" />
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-[10dvw] aspect-square bg-pink-200 rounded-xl">
                            {/* Belonging album image */}
                        </div>
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
                            <div className="space-x-1.5">
                                <Button variant="none" size="icon">
                                    <Icon id="play" />
                                </Button>
                                <Button variant="ghost" className="p-0 gap-0">
                                    <Icon id="save" />
                                    <span className="pr-2 text-fg-secondary">622k</span>
                                </Button>
                                <Button variant="ghost" size="icon"> <Icon id="add_to_playlist" /> </Button>
                                <Button variant="ghost" size="icon"> <Icon id="add_to_queue" /> </Button>
                                <Button variant="ghost" size="icon"> <Icon id="share" /> </Button>
                                <Button variant="ghost" size="icon"> <Icon id="more" /> </Button>
                            </div>
                            {/* Tags */}
                            <div className="space-x-2">
                                <Tag text="Rock" secondary />
                                <Tag text="Rock Alt" secondary />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DiscoveryThemePage