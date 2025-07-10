import Tiles from "@/components/viewMode/Tiles"
import List from "@/components/viewMode/List"
import type { TViewMode } from "@/stores/createViewModeStore"

const ViewContainer = ({ viewMode, data }: { viewMode: TViewMode, data: unknown[] } ) => {   
    // Add indentified what data type is passed
    // Potential types of data: TSong[] / Playlist
    return viewMode === "tiles"
        ? <Tiles data={data}/>
        : <List data={data}/>
}

export default ViewContainer