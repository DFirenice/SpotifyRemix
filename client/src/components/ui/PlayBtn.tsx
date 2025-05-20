import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/Icon"

type TPlay = {
    state: {
        state: boolean
        set: (newState: boolean) => void
    }
} & React.ButtonHTMLAttributes<HTMLButtonElement>

// Dev note: If current track, playlist, or playlist that contains this track is playing

const PlayBtn = ({ state, ...rest }: TPlay) => {
    const { state: isPlaying, set: setIsPlaying } = state || {}
    return (
        <Button
            disabled={!state}
            onClick={() => setIsPlaying(!isPlaying)}
            variant="none"
            size="icon"
            { ...rest }
        >
            {/* Replace hardcoded color with one from global styles */}
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