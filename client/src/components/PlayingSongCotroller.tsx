import PlayBtn from "@/components/ui/PlayBtn"
import Image from "next/image"

import { Skeleton } from "@/components/ui/skeleton"

import { formatTime } from "@/utils/timeFortmatter"
import { useRef, useState, useEffect } from "react"
import ReactHowler from 'react-howler'
import { Slider } from "@/components/ui/slider"
import IconButton from "./ui/IconButton"
import { Separator } from "@/components/ui/separator"
import VolumeController from "@/components/VolumeController"

import usePlayingSongStore from "@/stores/PlayingSong"
import useCachedSongsStore from "@/stores/CachedSongs"

export type TSignedSongData = {
    coverUrl: string | null
    songUrl: string | null
}

const PlayingSongController = () => {
    const playerRef = useRef<ReactHowler>(null)
    const { song, isPlaying, setIsPlaying } = usePlayingSongStore()
    const [ signedData, setSignedData ] = useState<TSignedSongData | null>() // For Signed urls

    // Cache store
    const { getFromCache, addToCache } = useCachedSongsStore()
    
    const [ duration, setDuration ] = useState<number>(0),
          [ seek, setSeek ] = useState<number>(0),
          [ isMuted, setIsMuted ] = useState(false),
          [ volume, setVolume ] = useState(30)

    const [ isSeeking, setSeeking ] = useState(false)

    // Initializing preferences
    useEffect(() => {
        if (typeof window !== "undefined") {
            const v = window.localStorage.getItem('sound_volume')
            if (!v) {
                window.localStorage.setItem('sound_volume', '30')
                setVolume(30)
            }
            setVolume(Number(v))
        }
    }, [])

    // Requesting signed cover and song
    useEffect(() => {
        const requestData = async () => {
            setIsPlaying(true)
            try {
                // Check if has already been cached
                const cachedUrls = await getFromCache(song?.id || '')
                if (cachedUrls?.cache) {
                    setSignedData({
                        coverUrl: cachedUrls.cache.coverUrl,
                        songUrl: cachedUrls.cache.songUrl
                    })
                    return
                }

                // If not, caching and returning from cache
                if (!song) return
                else {
                    const cachedSong = await addToCache(song)
                    setSignedData({
                        coverUrl: cachedSong.cache!.coverUrl,
                        songUrl: cachedSong.cache!.songUrl
                    })
                }
            } catch (err) { console.error(err) }
        }
        requestData()
    }, [ song ])

    // 250ms update
    // Ｎｏｔｅ： Requires heavy optimization rework
    useEffect(() => {
        let frameId: number

        const updateSeek = () => {
            if (isPlaying && !isSeeking) {
                const howl = playerRef.current?.howler
                if (howl) setSeek(howl.seek() as number)
                frameId = requestAnimationFrame(updateSeek)
            }
        }

        if (isPlaying && !isSeeking) {
            frameId = requestAnimationFrame(updateSeek)
        }

        return () => cancelAnimationFrame(frameId)
    }, [ isPlaying, isSeeking ])

    const handleLoad = () => {
        const howl = playerRef?.current?.howler
        if (howl) {
            setDuration(howl.duration())
            setSeek(howl.seek())
        }
    }

    // Setting player's time to the ghost value from mouseDown event
    const handleSeekCommit = (v: number[]) => {
        const howl = playerRef?.current?.howler
        if (howl) howl.seek(v[0])
        setSeeking(false)
    }

    // Switcher for PlayBtn
    const handleSwitch = () => { setIsPlaying(!isPlaying) }
    const handleMuteAudio = () => { setIsMuted(!isMuted) }
    
    return (
        <div className="
            bg-gradient-to-br from-fg-secondary/20 to-accent-gray/80 min-h-[8dvh] w-full px-4 py-2 flex flex-row gap-6
            overflow-y-auto rounded-xl border-2 border-dp-1 justify-between
            *:flex *:flex-row *:items-center
        ">
            {/* Track preview */}
            <div>
                <div className="relative h-[85%] aspect-square">
                    { signedData?.coverUrl ?
                        <Image
                            src={signedData.coverUrl}
                            alt="Track preview" fill
                            className="rounded-lg object-cover"
                        />
                    : <Skeleton className="h-full rounded-lg bg-neutral-700" /> }
                </div>
                <div className="ml-1.5 flex flex-col leading-5">
                    { song ?  <> <span className="overflow-ellipsis">{song.title}</span>
                        <span className="text-icon-default text-nowrap">{song.artist.username}</span>
                    </> : <>
                        <Skeleton className="truncate w-[13ch] h-[1.5ch] bg-neutral-700" />
                        <Skeleton className="truncate my-1 w-[18ch] h-[1.5ch] bg-neutral-700" />
                        <Skeleton className="truncate w-[7ch] h-[1.5ch] bg-neutral-700" />
                    </> }
                </div>
            </div>
            {/* Track controller */}
            <div className="gap-1.5">
                <ReactHowler
                    preload
                    ref={playerRef}
                    onLoad={handleLoad}
                    src={signedData?.songUrl || '/'}
                    playing={isPlaying}
                    volume={volume / 100}
                    mute={isMuted}
                    format={[song?.file_path.split('.').pop() || ""]} // Hot Fix for cached blob. (blobs do not contain format)
                    html5 // For progressive streaming, because Web Audio API is too dumb in terms of streaming blobs
                />

                <IconButton icon="prev" />

                {/* Play button */}
                <PlayBtn
                    state={{ state: isPlaying, set: setIsPlaying }}
                    onClick={handleSwitch}
                    className="mx-2.5"
                    disabled={!song}
                />

                <IconButton icon="next" />
                <IconButton icon="shuffle" />
                <IconButton icon="loop" />

                <div className="inline-flex w-full min-w-[22.5dvw]">
                    <span className="text-icon-default mx-1">{ formatTime(seek) }</span>
                    <Slider
                        value={[seek]}
                        max={duration}
                        step={0.01}
                        onValueChange={(v) => setSeek(v[0])}
                        onValueCommit={(v) => handleSeekCommit(v)}
                        onPointerDown={() => setSeeking(true)}
                    />
                    <span className="text-icon-default mx-1">{ formatTime(duration) }</span>
                </div>
                <div>
                    <VolumeController
                        volumeState={[ volume, setVolume ]}
                        mutedState={[ isMuted, setIsMuted ]}
                        onMute={handleMuteAudio}
                    />
                </div>
            </div>
            {/* Other controls */}
            <div className="gap-1">
                <IconButton icon="like" />
                <IconButton icon="add_to_playlist" />
                <IconButton icon="lyrics" />
                <IconButton icon="device" />
                <IconButton icon="more" />
                <Separator orientation="vertical" className="h-[50%] mx-2" />
                <IconButton className="bg-blue-600/80 rounded-full" icon="info" color="#E0E0E0" /> {/* AI helper */}
                <IconButton icon="queue" />
            </div>
        </div>
    )
}

export default PlayingSongController