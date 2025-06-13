'use client'

import IconButton from "@/components/ui/IconButton"
import ViewSorter from "@/components/ViewSorter"

const LikedSongsPage = () => {
    return ( 
        <div className="h-full rounded-md border-2 border-dp-1 p-1.5">
            {/* Sort&Filter Panel */}
            <div className="w-full flex items-center justify-between gap-1">
                <IconButton icon="add_simple" />
                <div className="space-x-1">
                    <ViewSorter />
                    <IconButton icon="sort" text="Sorted by" />
                    <IconButton icon="filter" text="Filter: All" />
                    <IconButton icon="search" />
                </div>
            </div>
        </div>
    )
}

export default LikedSongsPage