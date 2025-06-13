'use client'

import IconButton from "@/components/ui/IconButton"

const ViewSorter = () => {
    return (
        <div className="inline-flex">
            <IconButton icon="list" />
            <IconButton icon="grid" />
        </div>
    )
}

export default ViewSorter