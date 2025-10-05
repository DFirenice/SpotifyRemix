'use client'

import { Button } from "@app-ui/button"
import PlayBtn from "@app-ui/PlayBtn"
import Icon from "@app-ui/Icon"
import Tag from "@app-ui/Tag"
import Heading from "@/components/ui/Heading"
import Link from "next/link"

import type { TFolder, TPlaylist, TSong } from "@/types/mediaEntities.types.ts"
import { getYear } from "@/utils/dateFormatter"
import { detectMediaEntityType } from "@/utils/typeGuards"
import { accumulateAndFormatTime } from "@/utils/entityFormatter"
import { formatTime } from "@/utils/timeFortmatter"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuContent
} from "@app-ui/dropdown-menu"

const PlaylistInfo = ({ playlist }: { playlist: TPlaylist } ) => {
    return (
        <>
            <span>By <Link href="" className="text-accent-default underline">{ playlist.author.username }</Link></span>
            <span>{ getYear(playlist.created_at) }</span>
            <span>{ playlist.size} songs</span>
            <span>{ accumulateAndFormatTime(playlist.songs, false) }</span>
        </>
    )
}

const SongInfo = ({ song }: { song: TSong }) => {
    return (
        <>
            <span>By <a className="text-accent-default underline">{ song.artist.username }</a></span>
            <span>{ getYear(song.created_at) }</span>
            <span>{ formatTime(song.duration, false) }</span>
        </>
    )
}

const EntityHeader = ({ entity, excludeTags = false }: { entity: TSong | TPlaylist, excludeTags?: boolean } ) => {
    const type = detectMediaEntityType(entity)

    const entityInfoMap = {
        "song": (e: TSong) => <SongInfo song={e} />,
        "playlist": (e: TPlaylist) => <PlaylistInfo playlist={e} />,
        "folder": (e: TFolder) => null
    }

    // Experimenting with mapping instead else-if, else-if...
    const renderEntityInfo = entityInfoMap[type as keyof typeof entityInfoMap]?.(entity as any) ?? null

    return (
        <div className="space-y-4">
            <Heading level={2} size="large">{ (entity as TPlaylist | TFolder)?.name || (entity as TSong)?.title }</Heading>
            {/* Playlist data */}
            <div className="
                flex items-center text-sm text-muted-foreground
                [&>*:not(:first-child)]:before:content-['•'] [&>*:not(:first-child)]:before:mx-2
            ">
                { renderEntityInfo }
            </div>
            {/* Controls */}
            <div className="inline-flex items-center gap-x-2">
                <PlayBtn />
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
                        <DropdownMenuLabel className="font-bold px-1.75 capitalize">{type}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className="**:hover:outline-none **:px-1.5 **:py-0.5 **:hover:bg-dp-1">
                            <DropdownMenuItem>
                                <DropdownMenuLabel>Add to queue</DropdownMenuLabel>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DropdownMenuLabel>Mark as favorite</DropdownMenuLabel>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DropdownMenuLabel>Open</DropdownMenuLabel>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Tags */}
            { !excludeTags && entity?.tags && (
                <div className="space-x-2">
                    { [...entity.tags.map(tag => <Tag text={tag} secondary />)].slice(0, 3) }
                </div>
            ) }
        </div>
    )
}

export default EntityHeader