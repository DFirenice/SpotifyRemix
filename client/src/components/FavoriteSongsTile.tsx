import Link from "next/link"
import Icon from "@app-ui/Icon"
import { accumulateAndFormatAuthors } from "@/utils/entityFormatter"
import Thumbtack from "@app-ui/Thumbtack"

import { useUserStore } from "@/stores/useUserStore"

const FavoriteSongsTile = () => {
    const collection = useUserStore(state => state.favoriteSongs)
    const isPinned = useUserStore(state => state.pinned.has('fav'))
    
    return (
        <Link href="/liked" className="w-56 h-72 relative">
            { isPinned && <Thumbtack /> }
            <div className="w-full h-56 overflow-hidden flex flex-col">
                <div className="tile-folder-effect h-[0.6rem]">
                    <div className="bg-green-900" /><div className="bg-green-700" />
                </div>
                <div className="bg-green-950 rounded-xl flex-1 grid place-items-center">
                    <Icon id="like" size="fill" className="w-1/2 **:stroke-secondary" />
                </div>
            </div>
            <div className="flex justify-between mt-1">
                <span className="w-full truncate text-accent-default">Liked Songs</span>
                <span className="font-mono text-secondary font-light">{ collection.length }</span> {/* Playlist size */}
            </div>
            <p className="text-sm text-fg-secondary my-1">Authors: { accumulateAndFormatAuthors(collection, 2) }</p>
        </Link>
    )
}

export default FavoriteSongsTile