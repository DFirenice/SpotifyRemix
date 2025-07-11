import Tiles from "@/components/viewMode/Tiles"
import List from "@/components/viewMode/List"
import type { TViewMode } from "@/stores/createViewModeStore"

const ViewContainer = ({ viewMode, data, includeFavorite = false }: { viewMode: TViewMode, data: unknown[], includeFavorite?: boolean } ) => {   
    // Add indentified what data type is passed
    // Potential types of data: TSong[] / Playlist
    return viewMode === "tiles"
        ? <Tiles data={data} includeFavorite={includeFavorite} />
        : <List data={data} />
}

export default ViewContainer