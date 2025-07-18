import mockPlaylists from "@/data/temp/playlists" // DEVELOPMENT ONLY, TEMP. SOLUTION
import type { TPlaylist } from "@/types/mediaEntities.types.ts"

import EntityHeader from "@/components/EntityHeader"
import List from "@/components/viewMode/List"
import SearchOpenable from "@/components/ui/SearchOpenable"

import Image from "next/image"
import Tag from "@/components/ui/Tag"
import { accumulateAuthors } from "@/utils/entityFormatter"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

const Playlist = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    // Obtaining playlist from the backend
    const playlist: TPlaylist | undefined = mockPlaylists.find(pl => pl.id === slug)
    
    if (playlist) {
        return (
            // Ｎｏｔｅ： Change gradient color to a color of the playlist
            <div className="
                bordered rounded-lg pt-12 px-12 h-full flex flex-row gap-8
                bg-gradient bg-gradient-to-b from-blue-950 to-transparent
            ">
                <div className="*:space-y-4 w-full">
                    <div className="flex flex-row items-end justify-between w-full">
                        <div>
                            <i>Playlist</i>
                            <EntityHeader entity={playlist} excludeTags />
                        </div>
                        <SearchOpenable />
                    </div>
                    <List data={playlist.songs} />
                </div>

                <div className="inline-flex flex-col gap-8">
                    {/* Cover Preview */}
                    <div className="relative h-[32dvh] aspect-square">
                        <Image
                            className="rounded-2xl"
                            src={playlist.previewURL}
                            alt={playlist.name}
                            objectFit="cover"
                            fill
                        />
                    </div>
                    {/* Tags */}
                    <div className="flex flex-row justify-between flex-wrap gap-2">
                        { playlist.tags.map((tag, _) => <Tag key={`${tag}_${_}`} text={tag} secondary /> )}
                    </div>
                    {/* Authors */}
                    <div className="flex flex-col gap-4 h-full overflow-y-auto">
                        {/* Ｎｏｔｅ： Fix to have authors' avatars and working profile links */}
                        { accumulateAuthors(playlist.songs).map(author => (
                            <Link href="" className="flex flex-row items-center gap-4">
                                <Avatar className="rounded-full overflow-hidden size-14">
                                    <AvatarImage src="" alt={author.username} />
                                    <AvatarFallback><Skeleton className="rounded-full overflow-hidden size-8" /></AvatarFallback>
                                </Avatar>
                                <div className="**:block">
                                    <span className="text-fg-secondary hover:text-accent-default transition-all">{ author.username }</span>
                                    {/* Account type (verified / common), about */}
                                    <span className="text-fg-secondary">Artist, Track Maker</span>
                                </div>
                            </Link>
                        )) }
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default Playlist