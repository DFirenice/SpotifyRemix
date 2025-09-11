'use client'

import Image from "next/image"
import { useUserStore } from "@/stores/useUserStore"
import Heading from "@/components/ui/Heading"

// temp
import mockSongs from "@/data/temp/songs"
import { TSong } from "@/types/mediaEntities.types.ts"
import Tiles from "@/components/viewMode/Tiles"
import List from "@/components/viewMode/List"

const ProfilePage = () => {
    const { user } = useUserStore()

    if (!user) {
        return (
            // Ｎｏｔｅ： Loading...
            <span>Loading User...</span>
        )
    }

    return (
        <section className="page-container overflow-y-scroll">
            {/* Header */}
            <div className="relative">
                {/* Banner */}
                <div className="relative h-72 flex">
                    <div className="absolute bg-gradient-to-br from-dp-2 to-dp-1 rounded-md w-full h-9/12" />
                    <div className="relative mt-auto flex flex-row items-end gap-4">
                        <div className="relative mx-4 w-48 h-48 rounded-2xl overflow-hidden">
                            <Image
                                className="object-cover"
                                src={user.avatarUrl}
                                alt={user.username}
                                fill
                            />
                        </div>
                        <div>
                            <Heading size="large" className="relative font-bold capitalize">{ user.username }</Heading>
                            {/* Ｎｏｔｅ： Incomplete */}
                            <span className="text-fg-secondary">User's Status or Bio</span> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 mx-4">
                <section>
                    <Heading className="my-6" size="large">Favourite songs</Heading>
                    <List data={mockSongs} />
                </section>
            </div>
        </section>
    )
}

export default ProfilePage