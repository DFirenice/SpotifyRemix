export const formatTime = (seconds: number, compact: boolean = true): string => {
    const totalSeconds = Math.ceil(seconds)

    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hrs = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const mins = Math.floor((totalSeconds % (60 * 60)) / 60)
    const secs = totalSeconds % 60

    if (compact) {
        const parts = []

        if (days > 0) parts.push(days)
        if (days > 0 || hrs > 0) parts.push(String(hrs).padStart(2, '0'))
        parts.push(String(mins).padStart(parts.length ? 2 : 1, '0')) // pad only if not first
        parts.push(String(secs).padStart(2, '0'))

        return parts.join(':')
    } else {
        const units = [
            { label: 'd', value: days },
            { label: 'hr', value: hrs },
            { label: 'min', value: mins },
            { label: 's', value: secs }
        ]

        const nonZero = units.filter(u => u.value > 0)
        if (nonZero.length === 0) return '0 seconds'

        return nonZero
            .map(u => `${u.value} ${u.label}`) // ${u.value !== 1 ? 's' : ''}
            .join(', ')
    }
}