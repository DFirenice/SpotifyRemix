'use client'

import ViewControlPanel from "@/components/sorting/ViewControlPanel"

import { createViewModeStore } from "@/stores/createViewModeStore"
import { useRef } from "react"

import mockSongs from "@/data/temp/songs" // Note: should be randomly generated playlists for the feed
import mockPlaylists from "@/data/temp/playlists"
import ViewContainer from "@/components/sorting/ViewContainer"

const LibraryPage = () => {
    const storeRef = useRef<ReturnType<typeof createViewModeStore>>(null)    
    if (!storeRef.current) storeRef.current = createViewModeStore("library") // pageKey

    const useStore = storeRef.current,
          viewMode = useStore((s) => s.viewMode),
          setViewMode = useStore((s) => s.setViewMode)

    return (
        <section className="page-container flex flex-col overflow-hidden">
            <ViewControlPanel viewMode={viewMode} setViewMode={setViewMode} schema="view_filters" />
            <ViewContainer includeFavorite data={[mockPlaylists[0], ...mockSongs, mockPlaylists[1]]} viewMode={viewMode} />
        </section>
    )
}

export default LibraryPage