'use client'

import IconButton from "@/components/ui/IconButton"
import ViewSorter from "@/components/ViewSorter"
import SearchOpenable from "@/components/ui/SearchOpenable"
import { cn } from "@/lib/utils"

const ViewControlPanel = ({ schema = 'filters_view' }: { schema?: 'view_filters' | 'filters_view' }) => {
    return (
        <div className="w-full flex items-center justify-between gap-1">
            <IconButton icon="add_simple" />
            <div className={cn(
                "space-x-1 inline-flex",
                { '-order-1': schema == "view_filters" }
            )}>
                <ViewSorter />
                <IconButton className="pl-1 gap-0.5" icon="sort" text="Sorted by" />
                <IconButton className="pl-1 gap-0.5" icon="filter" text="Filter: All" />
                <SearchOpenable />
            </div>
        </div>
    )
}

export default ViewControlPanel