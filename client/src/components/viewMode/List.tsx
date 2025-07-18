'use client'

import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/Icon"
import Link from "next/link"

import { useState, useRef } from "react"

import { formatTime } from "@/utils/timeFortmatter"
import { accumulateAndFormatAuthors } from "@/utils/entityFormatter"
import { sortBy } from "@/utils/songsSorter"
import { cn } from "@/lib/utils"

import type { TPlaylist, TSong } from "@/types/mediaEntities.types.ts"
import { detectMediaEntityType } from "@/utils/typeGuards"
import { accumulateAndFormatTime } from "@/utils/entityFormatter"

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

    const renderList = (data: unknown[]) => {
        return sortedSongs.map((obj: unknown, i) => {
            if (detectMediaEntityType(obj) === 'song') {
                const song = obj as TSong
                return (
                    <div key={song.id} className="
                        flex space-x-4 text-fg-secondary min-h-[7.5dvh]
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
                            <span>{ formatTime(song.duration) }</span>
                            <IconButton icon="like" className="**:fill-secondary **:stroke-secondary" />
                        </div>
                    </div>
                )
            } else if (detectMediaEntityType(obj) === 'playlist') {
                const playlist = obj as TPlaylist
                return (
                    <Link href={`playlists/${playlist.id}`} key={playlist.id} className="
                        flex space-x-4 text-fg-secondary min-h-[7.5dvh]
                        *:inline-flex *:not-[span]:flex-1 *:items-center
                    ">
                        <span className="shrink-0 py-2 font-bold">{i + 1}</span>
                        <div className="gap-4 min-w-0 truncate py-2">
                            <div className="relative h-[85%] aspect-square grid place-items-center">
                                <Icon id="playlist" size="large" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-accent-default font-bold tracking-wider">{playlist.name}</span>
                                <span className="truncate w-[30ch]">Playlist: {playlist.name || 'Name uknown'}</span>
                            </div>
                        </div>
                        <div className="min-w-0 truncate py-2">{ accumulateAndFormatAuthors(playlist.songs, 2) }</div>
                        <div className="min-w-0 truncate py-2 gap-x-2">
                            <span>{ accumulateAndFormatTime(playlist.songs, false) }</span>
                        </div>
                    </Link>
                )
            }

            return <div>Unable to load a track...</div>
        })
    }
    
    return (
        <div className="w-full px-4">
            {/* Sort bar */}
            {/* # | Title | Album | Duration */}
            <div className="container">
                <div className="text-fg-secondary flex gap-4">
                    <span className="shrink-0 py-2">#</span>
                    {/* Sort-by controls */}
                    {  [['name', 'name'], ['author(s)', 'author.username'], ['duration', 'duration']].map((sortingCriteria) => (
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
                {/* # | SongImg & Title | Album (Playlist) | Duration */}
                { renderList(sortedSongs) }
            </div>
        </div>
    )
}

export default List