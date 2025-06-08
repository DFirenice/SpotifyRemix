'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Icon from "@/components/ui/Icon"

import { useState } from 'react'

type TVolumeControllerProps = {
    volumeState: [number, (e: number) => void]
    onMute: () => void
    isMuted: boolean
}

const VolumeController = ({ onMute, isMuted, volumeState }: TVolumeControllerProps) => {
    const [ open, setOpen ] = useState<boolean>(false)

    // Disabling Shadcn's click behaviour and toggling mute
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onMute()
    }
    
    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        className="relative"
                        variant="ghost"
                        size="icon"
                        onClick={handleClick}
                    >
                        <Icon id="volume" />
                        { isMuted && <Icon size="small" id="close" className="absolute bottom-[-3%] right-[-5%]" /> }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[10dvw] bg-dp-0/20 border-accent-default/10">
                    <Slider
                        defaultValue={[volumeState[0]]}
                        onValueChange={(e) => volumeState[1](e[0])}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default VolumeController