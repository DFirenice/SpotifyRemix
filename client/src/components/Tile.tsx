import Image from "next/image"
import Link from "next/link"
import Icon from "@/components/ui/Icon"

import { detectMediaEntityType } from "@/utils/typeGuards"
import type { TPlaylist, TSong, TFolder } from "@/types/mediaEntities.types.ts"

// Types of tiles:
//  Liked songs (a collection of liked songs)
//  Playlist (a collection of added songs OR generated based on use preferences)
//  Folder (a collection of playlists)

const Tile = ({ tile }: { tile: unknown }) => {
    // Song tile
    if (detectMediaEntityType(tile) === "song") {
        const song = tile as TSong
        return (
            <Link href={''} className="w-56 h-72">
                <div className=" rounded-lg w-full h-56 relative">
                    <Image src={song.previewURL} fill objectFit="cover" className="rounded-full" alt="Track cover" />
                </div>
                <div className="text-center mt-1">
                    <span className="w-full truncate text-accent-default">{ song.name || 'Song is unavailable...' }</span>
                    <p className="text-sm text-fg-secondary my-1">{ song.author.username }</p>
                </div>
            </Link>
        )
    }
    // Playlist tile
    else if (detectMediaEntityType(tile) === "playlist") {
        const playlist = tile as TPlaylist
        return (
            <Link href={''} className="w-56 h-72">
                <div className=" bg-dp-1 rounded-lg w-full h-56 relative overflow-hidden">
                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="z-10 w-full h-1/4 absolute top-[-1px]">
                        <path className="fill-secondary" fill-opacity="1" d="M0,96L80,133.3C160,171,320,245,480,240C640,235,800,149,960,149.3C1120,149,1280,235,1360,277.3L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                    <Image src={playlist.previewURL} fill objectFit="cover" alt={playlist.previewURL} />
                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="z-10 w-full h-1/4 absolute bottom-[-1px]">
                        <path className="fill-secondary" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,240C384,203,480,117,576,74.7C672,32,768,32,864,80C960,128,1056,224,1152,224C1248,224,1344,128,1392,80L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="w-full truncate text-accent-default">{ playlist.name || 'Playlist is unavailable...' }</span>
                    <span className="font-mono text-fg-secondary font-light">50</span> {/* Playlist size */}
                </div>
                { true ? ( // playlist?.authors: if more than three, and 'and more'
                    <p className="text-sm text-fg-secondary my-1">{ ["Author 1", "Random Author 2", "Someone 3"].join(", ") }, and more</p>
                ) : null }
            </Link>
        )
    }
    // Folder tile
    else if (detectMediaEntityType(tile) === "folder") {
        const folder = tile as TFolder
        return (
            <Link href={''} className="w-56 h-72">
                <div className=" bg-dp-1 rounded-lg w-full h-56 relative overflow-hidden grid place-items-center">
                    <Icon id="folder" size="large" className="icon-active-outline"/>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="w-full truncate text-accent-default">{ folder.name || 'Folder is unavailable...' }</span>
                    <span className="font-mono text-fg-secondary font-light">11</span> {/* # of Playlists */}
                </div>
                { true ? ( // playlist?.authors: if more than three, and 'and more'
                    <p className="text-sm text-fg-secondary my-1">Playlists: { ["Playlist 1", "II Random pl", "Another playlist"].join(", ") }, and more</p>
                ) : null }
            </Link>
        )
    }

    return 'Unable to load the tile...'
}

export default Tile