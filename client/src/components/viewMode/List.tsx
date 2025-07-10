'use client'

import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { Separator } from "@/components/ui/separator"

import { useState, useRef } from "react"

import { formatTime } from "@/utils/timeFortmatter"
import { sortBy } from "@/utils/songsSorter"
import { cn } from "@/lib/utils"

import type { TSong } from "@/types/mediaEntities.types.ts"

const List = ({ data }: { data: unknown[] }) => {
    // Add: Sort initally by remembered value
    const [ sortedSongs, setSortedSongs ] = useState(sortBy(data, 'name', false))
    const [ lastSort, setLastSort ] = useState<string | undefined>('name')
    const isReverseRef = useRef(false)
    
    // Sorts songs array by comparing property
    const handleSort = (prop: keyof TSong | string) => {
        if (lastSort == prop) {
            isReverseRef.current = !isReverseRef.current
            setSortedSongs(sortBy(sortedSongs, prop, isReverseRef.current))
        } else {
            isReverseRef.current = false
            setSortedSongs(sortBy(sortedSongs, prop, false))
        }
        setLastSort(prop)
    }
    
    return (
        <div className="w-full px-4">
            {/* Sort bar */}
            {/* # | Title | Album | Duration */}
            <div className="container">
                <div className="text-fg-secondary flex gap-4">
                    <span className="shrink-0 py-2">#</span>
                    {/* Sort-by controls */}
                    {  [['name', 'name'], ['author', 'author.username'], ['duration', 'duration']].map((sortingCriteria) => (
                        <a key={`list_sorting_criteria_${sortingCriteria[0]}`} className={
                            cn(
                                "select-none capitalize flex-1 min-w-0 truncate cursor-pointer py-2",
                                { 'text-accent-default font-bold': sortingCriteria[1] == lastSort }
                            )}
                            onClick={() => handleSort(sortingCriteria[1] )}
                        >
                            { sortingCriteria[0] }
                        </a>
                    )) }
                </div>
            </div>
            <Separator />
            <div className="container mt-4">
                {/* # | SongImg & Title | Album | Duration */}
                { sortedSongs.map((song, i) => {
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
                                    <span className="truncate w-[30ch]">Author: {song.author.username || 'Uknown'}</span>
                                </div>
                            </div>
                            <div className="min-w-0 truncate py-2">{song.author.username}</div>
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
    )
}

export default List