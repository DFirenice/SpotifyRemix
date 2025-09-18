import Tiles from "@/components/viewMode/Tiles"
import List from "@/components/viewMode/List"
import type { TViewMode } from "@/stores/createViewModeStore"
import { TMediaEntity } from "@/types/mediaEntities.types.ts"

const ViewContainer = ({ viewMode, data, includeFavorite = false }: { viewMode: TViewMode, data: TMediaEntity[], includeFavorite?: boolean } ) => {
    // Potential data types: TSong[] / Playlist
    return viewMode === "tiles"
        ? <Tiles data={data} includeFavorite={includeFavorite} />
        : <List data={data} />
}

export default ViewContainer