import Tile from "@/components/viewMode/Tile"
import FavoriteSongsTile from "../FavoriteSongsTile"
import { TMediaEntity } from "@/types/mediaEntities.types.ts"

// Tiles for content view modes
const Tiles = ({ data, includeFavorite = false }: { data: TMediaEntity[], includeFavorite: boolean }) => {
    return (
        <div className="gap-x-2 gap-y-4 overflow-y-auto flex flex-wrap h-full">
            { includeFavorite ? <FavoriteSongsTile /> : null }
            { data.map((item, idx) => ( <Tile tile={item} key={`tile_${idx}`} /> )) }
        </div>
    )
}

export default Tiles