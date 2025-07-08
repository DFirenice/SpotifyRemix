import ViewControlPanel from "@/components/sorting/ViewControlPanel"

import mockSongs from "@/data/temp/songs" // Note: should be randomly generated playlists for the feed
import Image from "next/image"

const LibraryPage = () => {
    return (
        // page-container
        <section className="page-container flex flex-col overflow-hidden">
            <ViewControlPanel schema="view_filters" />
            {/* Main container */}
            <div className="gap-x-2 gap-y-4 overflow-y-scroll flex flex-wrap h-full">
                {/* Playlists or Authors */}
                {mockSongs.map(playlist => (
                    <div className="w-56 h-72">
                        <div className=" bg-amber-800 rounded-lg w-full h-56 relative overflow-hidden">
                            <Image src={playlist.previewURL} fill objectFit="cover" alt={playlist.previewURL} />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="w-full truncate text-accent-default">{ playlist.naming || 'Playlist is unavailable...' }</span>
                            <span className="font-mono text-fg-secondary font-light">50</span> {/* Playlist size */}
                        </div>
                        { true ?( // playlist?.authors: if more than three, and 'and more'
                            <p className="text-sm text-fg-secondary my-1">{ playlist.authors }, and more</p>
                        ) : null }
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LibraryPage