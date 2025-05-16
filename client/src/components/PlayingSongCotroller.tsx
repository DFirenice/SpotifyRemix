import PlayBtn from "@/components/ui/PlayBtn"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/Icon"
import Image from "next/image"

import { formatTime } from "@/utils/timeFortmatter"
import { useRef, useState, useEffect } from "react"
import ReactHowler from 'react-howler'
import { Slider } from "@/components/ui/slider"
import IconButton from "./ui/IconButton"
import { Separator } from "@/components/ui/separator"

const PlayingSongController = () => {
    const playerRef = useRef<ReactHowler>(null)
    
    const [ duration, setDuration ] = useState<number>(0),
          [ seek, setSeek ] = useState<number>(0)

    const [ isPlaying, setPlaying ] = useState(false),
          [ isSeeking, setSeeking ] = useState(false)

    // 300ms update
    useEffect(() => {
        let interval: number
    
        if (isPlaying && !isSeeking) {
          interval = window.setInterval(() => {
            const howl = playerRef.current?.howler
            if (howl) setSeek(howl.seek() as number)
          }, 250)
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
        
    return (
        <div className="
            bg-gradient-to-br from-fg-secondary/20 to-accent-gray/80 h-[8dvh] w-full px-4 py-2 flex flex-row gap-6
            overflow-y-auto rounded-xl border-2 border-dp-1 justify-between
            *:flex *:flex-row *:items-center
        ">
            {/* Track preview */}
            <div>
                <div className="relative h-[85%] aspect-square">
                    <Image
                        src="https://i.pinimg.com/736x/f2/89/71/f2897106d15f970f0834581c78b48e61.jpg"
                        alt="Track preview" fill
                        className="rounded-lg"
                    />
                </div>
                <div className="ml-1.5 flex flex-col leading-5  ">
                    <span>Get lucky</span>
                    <span className="text-icon-default">Daft punk</span>
                    <span className="text-icon-default">Random Access Memories</span>
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
                    loop={false}
                    volume={0.15}
                />

                <IconButton icon="prev" />
                <PlayBtn reference className="mx-2.5" />
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
                <Button variant="ghost" size="icon">
                    <Icon id="volume" />
                </Button>
            </div>
            {/* Other controls */}
            <div className="gap-1">
                <IconButton icon="like" />
                <IconButton icon="add_to_playlist" />
                <IconButton icon="lyrics" />
                <IconButton icon="like" />
                <IconButton icon="device" />
                <Separator orientation="vertical" className="h-[50%] mx-2" />
                <IconButton className="bg-blue-600/80 rounded-full" icon="info" color="#E0E0E0" /> {/* AI helper */}
                <IconButton icon="queue" />
            </div>
        </div>
    )
}

export default PlayingSongController