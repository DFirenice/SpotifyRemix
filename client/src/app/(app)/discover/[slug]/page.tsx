'use client'

import Heading from "@/components/ui/Heading"
import Image from "next/image"

const DiscoveryThemePage = () => {
    // Temporarly hardcoded constant
    const imgUrl = "https://i.pinimg.com/736x/3c/2f/7c/3c2f7c684930ed9d420e09413fc2b904.jpg"

    return (
        <section
            className="relative h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imgUrl})` }}
        >
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
                    <div>
                        <Heading level={2} size="large">Linkin Park Mix</Heading>
                        <div className="
                            flex items-center text-sm text-muted-foreground
                            [&>*:not(:first-child)]:before:content-['•'] [&>*:not(:first-child)]:before:mx-2
                        ">
                            <span>By <a className="text-accent-default underline">Spotify</a></span>
                            <span>Playlist year</span>
                            <span>22 songs</span>
                            <span>Total duration</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DiscoveryThemePage