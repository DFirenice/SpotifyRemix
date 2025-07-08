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

const PlayingSongController = () => {
    const playerRef = useRef<ReactHowler>(null)
    const { song, isPlaying, setIsPlaying } = usePlayingSongStore()
    
    const [ duration, setDuration ] = useState<number>(0),
          [ seek, setSeek ] = useState<number>(0),
          [ isMuted, setIsMuted ] = useState(false),
          [ volume, setVolume ] = useState(30) // Make the initial value from localstorage

    const [ isSeeking, setSeeking ] = useState(false)

    // 300ms update
    useEffect(() => {
        let interval: number
    
        if (isPlaying && !isSeeking) {
          interval = window.setInterval(() => {
            const howl = playerRef.current?.howler
            if (howl) setSeek(howl.seek() as number)
          }, 10)
        }
    
        return () => clearInterval(interval)
      }, [isPlaying, isSeeking])

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
                    { song?.previewURL ?
                        <Image
                            src={song?.previewURL}
                            alt="Track preview" fill
                            className="rounded-lg"
                        />
                    : <Skeleton className="h-full rounded-lg bg-neutral-700" /> }
                </div>
                <div className="ml-1.5 flex flex-col leading-5">
                    { song ?  <> <span className="overflow-ellipsis">{song?.name}</span>
                        <span className="text-icon-default text-nowrap">{song?.author}</span>
                        <span className="text-icon-default text-nowrap">{song?.belongsRef}</span>
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
                    src="https://goldfirestudios.com/proj/howlerjs/sound.ogg"
                    playing={isPlaying}
                    loop={false} /* Doesn't work! */
                    volume={volume / 100}
                    mute={isMuted}
                />

                <IconButton icon="prev" />

                {/* Play button */}
                <PlayBtn state={{ state: isPlaying, set: setIsPlaying }} onClick={handleSwitch} className="mx-2.5" />

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