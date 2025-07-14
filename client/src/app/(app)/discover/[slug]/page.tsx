'use client'

import PlaylistSection from "@/components/PlaylistSection"
import mockPlaylists from "@/data/temp/playlists"

import { useState } from 'react'

const DiscoveryThemePage = () => {
    const discoverPlaylists = mockPlaylists
    // Temporarly: Playlist preview
    const [ imgUrl, setImgUrl ] = useState(discoverPlaylists[0].previewURL)

    const handleInView = (id: string) => {
        const cPlaylist = discoverPlaylists.find(pl => pl.id === id)
        if (cPlaylist) setImgUrl(cPlaylist.previewURL)
    }
    
    return (
        <div
            className="h-full w-full flex"
            style={{ background: `
                linear-gradient(0deg, rgba(0, 0, 0, .72), rgba(0, 0, 0, .72)),
                center / cover no-repeat url(${imgUrl})
            ` }}
        >
            <div className="
                    overflow-y-scroll w-full
                    snap-y snap-mandatory snap-always scroll-p-[10%]
                    *:first-of-type:mt-[10dvh] backdrop-blur-lg
            ">
                {/* Ｎｏｔｅ： array of newly suggested playlists */}
                { discoverPlaylists.map((playlist, i) =>
                    <PlaylistSection
                        key={playlist.id}
                        playlist={playlist}
                        imgUrl={playlist.previewURL}
                        onInView={handleInView}
                    />
                ) }
            </div>
        </div>
    )
}

export default DiscoveryThemePage