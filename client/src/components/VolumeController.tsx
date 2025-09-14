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
import { cn } from "@/lib/utils"

type TVolumeControllerProps = {
    volumeState: [number, (e: number) => void]
    mutedState: [boolean, (e: boolean) => void]
    onMute: () => void
}

const VolumeController = ({ onMute, mutedState, volumeState }: TVolumeControllerProps) => {
    const [ open, setOpen ] = useState<boolean>(false)

    // Saving new volume on mouse up
    const handleStorageUpdate = () => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem('sound_volume', String(volumeState[0]))
        }
        console.log('saved new sound volume: ', volumeState[0])
    }

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
                        { mutedState[0] && <Icon size="small" id="close" className="absolute bottom-[-3%] right-[-5%]" /> }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn(
                    "w-[10dvw] min-w-[100px] bg-dp-0/10 border-accent-default/10",
                    { "brightness-50": mutedState[0] },
                    "rounded-full py-1.5"
                )}>
                    <Slider
                        className="py-2.5"
                        defaultValue={[volumeState[0]]}
                        onValueChange={(e) => {
                            volumeState[1](e[0])
                            mutedState[1](false)
                        }}
                        onClickCapture={handleStorageUpdate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default VolumeController