'use client'

import IconButton from "@/components/ui/IconButton"

const ViewSorter = () => {
    return (
        <div className="inline-flex gap-1">
            <IconButton icon="list" />
            <IconButton icon="grid" />
        </div>
    )
}

export default ViewSorter