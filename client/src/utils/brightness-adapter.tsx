/**
 * Recieves [r, g, b] array and cuts off the off-max brightness
 * Used to avoid low contrast for the font and other features...
 * @returns [r, g, b]
*/
export const limitBrightness = ([r, g, b]: number[]) => {
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b
    const limit = 60 // max brightness allowed
    if (brightness > limit) {
        const scale = limit / brightness
        return [r * scale, g * scale, b * scale].map(Math.round)
    }
    return [r, g, b]
}