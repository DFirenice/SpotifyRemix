'use client'

import ViewContainer from "@/components/sorting/ViewContainer"
import ViewControlPanel from "@/components/sorting/ViewControlPanel"
import mockPlaylists from "@/data/temp/playlists"

import { useRef } from "react"
import { createViewModeStore } from "@/stores/createViewModeStore"

const PlaylistsPage = () => {
    const playlists = mockPlaylists
    
    const storeRef = useRef<ReturnType<typeof createViewModeStore>>(null)    
    if (!storeRef.current) storeRef.current = createViewModeStore("playlists") // pageKey

    const useStore = storeRef.current,
            viewMode = useStore((s) => s.viewMode),
            setViewMode = useStore((s) => s.setViewMode)

    return (
        <div className="page-container">
            <ViewControlPanel viewMode={viewMode} setViewMode={setViewMode} />
            <ViewContainer includeFavorite viewMode={viewMode} data={playlists} />
        </div>
    )
}

export default PlaylistsPage