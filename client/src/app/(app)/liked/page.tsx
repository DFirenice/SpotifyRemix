'use client'

import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import ViewSorter from "@/components/ViewSorter"
import { Separator } from "@/components/ui/separator"
import { formatTime } from "@/utils/timeFortmatter"

import mockSongs from "@/data/temp/songs"

const LikedSongsPage = () => {
    return (
        <div className="h-full rounded-md border-2 border-dp-1 py-3 px-2.5 space-y-6">
            {/* Sort&Filter Panel */}
            <div className="w-full flex items-center justify-between gap-1">
                <IconButton icon="add_simple" />
                <div className="space-x-1">
                    <ViewSorter />
                    <IconButton className="pl-1 gap-0.5" icon="sort" text="Sorted by" />
                    <IconButton className="pl-1 gap-0.5" icon="filter" text="Filter: All" />
                    <IconButton icon="search" />
                </div>
            </div>
            <div className="w-full px-4">
                {/* Sort bar */}
                {/* # | Title | Album | Duration */}
                <div className="container">
                    <div className="text-fg-secondary flex gap-4">
                        <span className="shrink-0 py-2">#</span>
                        <a className="flex-1 min-w-0 truncate cursor-pointer py-2">Title</a>
                        <a className="flex-1 min-w-0 truncate cursor-pointer py-2">Album</a>
                        <a className="flex-1 min-w-0 truncate cursor-pointer py-2">Duration</a>
                    </div>
                </div>
                <Separator />
                <div className="container mt-4">
                    {/* For each song-block: flex-1 min-w-0 truncate cursor-pointer */}
                    {/* # | SongImg & Title | Album | Duration */}

                    {/* TODO: Align text, fix fixed size, rewrite this sh*t */}
                    
                    { mockSongs.map((song, i) => {
                        return (
                            <div key={song.id} className="flex space-x-4 text-fg-secondary">
                                <span className="shrink-0 py-2 font-bold">{i + 1}</span>
                                <div className="inline-flex flex-1 items-center gap-4 min-w-0 truncate py-2">
                                    <Image
                                        className="object-cover rounded-md max-w-[10dvh] aspect-square"
                                        src={song.previewURL}
                                        width={50}
                                        height={50}
                                        alt="Track Cover"
                                    />
                                    {song.name} {/* i.e. title */}
                                </div>
                                <div className="flex-1 min-w-0 truncate py-2">{song.belongsRef}</div>
                                <div className="flex-1 min-w-0 truncate py-2">{formatTime(song.duration)}</div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}

export default LikedSongsPage