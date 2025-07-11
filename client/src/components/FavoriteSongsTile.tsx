import Link from "next/link"
import Icon from "@app-ui/Icon"
import { accumulateAndFormatAuthors } from "@/utils/entityFormatter"

import { useUserStore } from "@/stores/useUserStore"

const FavoriteSongsTile = () => {
    const collection = useUserStore(state => state.favoriteSongs)
    return (
        <Link href={''} className="w-56 h-72">
            <div className=" bg-green-950 rounded-xl w-full h-56 relative overflow-hidden grid place-items-center">
                <Icon id="like" size="fill" className="w-1/2 **:stroke-secondary" />
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