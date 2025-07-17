import Image from "next/image"
import type { TPlaylist } from "@/types/mediaEntities.types.ts"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import EntityHeader from "./EntityHeader"

type TPlaylistSectionProps = {
    playlist: TPlaylist
    onInView: (id: string) => void
}

const PlaylistSection = ({ playlist, onInView }: TPlaylistSectionProps) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        rootMargin: '0px'
    })

    useEffect(() => {
        if (inView) onInView(playlist.id)
    }, [inView])

    return (
        <section ref={ref} className="relative h-[80%] w-full snap-start overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex justify-center items-center gap-[3rem]">
                {/* Track images swiper */}
                <div className="relative w-[16dvw] aspect-[4/6]">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={inView ? { /* Rather complete using Ref */
                            delay: 3000,
                            disableOnInteraction: false,
                        } : false}
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="h-full cursor-grab"
                    >
                        {playlist.songs.map(song => (
                            <SwiperSlide key={song.id}>
                                <Image src={song.previewURL} fill className="object-cover rounded-2xl" alt="Discover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="w-[10dvw] aspect-square relative">
                        <Image src={playlist.previewURL} objectFit="cover" fill className="rounded-xl" alt="Playlist cover preview" />
                    </div>
                    <EntityHeader entity={playlist} />
                </div>
            </div>
        </section>
    )
}

export default PlaylistSection