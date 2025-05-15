// Dev note: Add hours support to calculate playlists' total playtime
export const formatTime = (seconds: number): string => {
    const s = Math.ceil(seconds)
    
    const secs = Math.floor(s % 60),
          mins = Math.floor(s / 60)

    return `${mins}:${secs.toString().padStart(2, '0')}`
}