'use client'

import IconButton from "@/components/ui/IconButton"
import type { TViewMode } from "@/stores/createViewModeStore"

const ViewSorter = ({ viewMode, setViewMode }: { viewMode: TViewMode, setViewMode: (mode: TViewMode) => void } ) => {
    return (
        <div className="inline-flex gap-1">
            <IconButton {...( viewMode === "list" && { variant: "primary", className: "icon-active-outline" } )} onClick={() => setViewMode('list')} icon="list" />
            <IconButton {...( viewMode === "tiles" && { variant: "primary", className: "icon-active-outline" } )} onClick={() => setViewMode('tiles')} icon="grid" />
        </div>
    )
}

export default ViewSorter