'use client'

import { useRef } from "react"
import { createViewModeStore } from "@/stores/createViewModeStore"

import ViewControlPanel from "@/components/sorting/ViewControlPanel"
import ViewContainer from "@/components/sorting/ViewContainer"

import mockSongs from "@/data/temp/songs"

const LikedSongsPage = () => {
    const storeRef = useRef<ReturnType<typeof createViewModeStore>>(null)    
    if (!storeRef.current) storeRef.current = createViewModeStore("liked") // pageKey

    const useStore = storeRef.current,
            viewMode = useStore((s) => s.viewMode),
            setViewMode = useStore((s) => s.setViewMode)

    return (
        <div className="page-container">
            <ViewControlPanel viewMode={viewMode} setViewMode={setViewMode} />
            <ViewContainer viewMode={viewMode} data={mockSongs} />
        </div>
    )
}

export default LikedSongsPage