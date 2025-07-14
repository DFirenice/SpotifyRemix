import { TPlaylist, TSong } from "@app-types/mediaEntities.types.ts"
import { formatTime } from "@/utils/timeFortmatter"

export const accumulateAndFormatTime = (songs: TSong[], compact: boolean = true) => {
    return formatTime(
        songs.reduce((acc, i) => acc + i.duration, 0),
        compact
    )
}

export const accumulateAndFormatAuthors = (songs: TSong[], reducer: number) => {
    const s = songs.length
    let final = []

    if (reducer > s) songs[1] ? reducer = 2 : reducer = s // Init.: min 2
    for (let i = 0; i < reducer; i++) final.push(songs[i].author.username)
    if (s > reducer) final.push(`and ${s - reducer} more`)

    return final.join(", ")
}

export const accumulateAndFormatPlaylists = (playlists: TPlaylist[], reducer: number) => {
    const s = playlists.length
    let final = []

    if (reducer > s) playlists[1] ? reducer = 2 : reducer = s // Init.: min 2
    for (let i = 0; i < reducer; i++) final.push(playlists[i].name)
    if (s > reducer) final.push(`and ${s - reducer} more`)

    return final.join(", ")
}