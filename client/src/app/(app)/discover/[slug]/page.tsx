'use client'

import PlaylistSection from "@/components/PlaylistSection"

const DiscoveryThemePage = () => {
    // Temporarly: Plastlist preview
    const imgUrl = "https://i.pinimg.com/736x/fe/18/17/fe1817a80dfd28078d1d107b45a67c6d.jpg"

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
                {/* Temporary duplicating playlists */}
                {[...Array(5)].map((_, i) => <PlaylistSection key={i} imgUrl={imgUrl} />)}
            </div>
        </div>
    )
}

export default DiscoveryThemePage