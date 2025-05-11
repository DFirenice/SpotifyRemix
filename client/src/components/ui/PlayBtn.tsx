import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/Icon"

type TPlay = {
    reference: unknown
}

// If current track, playlist, or playlist that contains this track is playing
const isPlaying = false

const PlayBtn = ({ reference }: TPlay) => {
    return (
        <Button variant="none" size="icon">
            <Icon color="#1ED760" size="large" id={isPlaying ? "pause" : "play"} />
        </Button>
    )
}

export default PlayBtn

//
// Tasks:
// 
//  For 'currently playing' create own store
//  Use the store to check if pass playlist is playing
//    Make PlayBtn active / inactive
//
//  The store should contain:
//    1. Playing track
//    2. Track's parent playlist (actual or reference)
//
//