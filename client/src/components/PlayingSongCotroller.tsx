import PlayBtn from "@/components/ui/PlayBtn"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/Icon"

import { useRef, useState } from "react"
import ReactHowler from 'react-howler'
import { formatTime } from "@/utils/timeFortmatter"

const PlayingSongController = () => {
    const playerRef = useRef<ReactHowler>(null)
    const [ duration, setDuration ] = useState<number>(0)
    const [ seek, setSeek ] = useState<number>(0)

    const handleLoad = () => {
        const howl = playerRef?.current?.howler
        if (howl) {
            setDuration(howl.duration())
            setSeek(howl.seek())
        }
    }
        
    return (
        <div className="
            bg-accent-gray h-[8dvh] w-full px-4 flex flex-row gap-4
            overflow-y-auto rounded-xl border-2 border-dp-1
        ">
            <ReactHowler
                preload
                ref={playerRef}
                onLoad={handleLoad}
                src="https://goldfirestudios.com/proj/howlerjs/sound.ogg"
                playing={false}
                loop={false}
                volume={0.15}
            />
            <div className="flex flex-row gap-1.5 items-center h-full">
                <PlayBtn reference />
                <Button variant="ghost" size="icon">
                    <Icon id="prev"/>
                </Button>
                <Button variant="ghost" size="icon">
                    <Icon id="next"/>
                </Button>
                <Button variant="ghost" size="icon">
                    <Icon id="shuffle"/>
                </Button>
                <Button variant="ghost" size="icon">
                    <Icon id="loop"/>
                </Button>
            </div>
            <div>
                <span>{ formatTime(seek) }</span>
                <span>/{ formatTime(duration) }</span>
            </div>
        </div>
    )
}

export default PlayingSongController