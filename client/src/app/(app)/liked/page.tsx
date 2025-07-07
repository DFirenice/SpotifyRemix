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
                    {/* # | SongImg & Title | Album | Duration */}
                    { mockSongs.map((song, i) => {
                        return (
                            <div key={song.id} className="
                                flex space-x-4 text-fg-secondary h-[7.5dvh]
                                *:inline-flex *:not-[span]:flex-1 *:items-center
                            ">
                                <span className="shrink-0 py-2 font-bold">{i + 1}</span>
                                <div className="gap-4 min-w-0 truncate py-2">
                                    <div className="relative h-[85%] aspect-square">
                                        <Image
                                            className="object-cover rounded-lg"
                                            fill src={song.previewURL}
                                            alt="Track preview"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-accent-default font-bold tracking-wider">{song.name}</span>
                                        <span>Author: {song.author?.name || 'Uknown'}</span>
                                    </div>
                                </div>
                                <div className="min-w-0 truncate py-2">{song.belongsRef}</div>
                                {/* Rewrite how icon behaves */}
                                <div className="min-w-0 truncate py-2 gap-x-2">
                                    <span>{formatTime(song.duration)}</span>
                                    <IconButton icon="like" className="**:fill-secondary **:stroke-secondary" />
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}

export default LikedSongsPage