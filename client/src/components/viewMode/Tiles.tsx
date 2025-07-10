import Tile from "@/components/Tile"

// Tiles for content view modes
const Tiles = ({ data }: { data: unknown[] }) => {
    return (
        <div className="gap-x-2 gap-y-4 overflow-y-scroll flex flex-wrap h-full">
            { data.map((item, idx) => ( <Tile tile={item} key={`tile_${idx}`} /> )) }
        </div>
    )
}

export default Tiles