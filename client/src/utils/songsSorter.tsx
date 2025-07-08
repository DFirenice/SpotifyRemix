import { TSong } from "@/types/tracksAndPlaylists"

// Utility that sorts songs[] by a specific property
// Ascending order: asc = true
export const sortBy = (sortable: TSong[], prop: keyof TSong, asc?: boolean): TSong[] => {
    const sorted = sortable.toSorted((a, b) => {
        if (asc && a[prop] < b[prop]) return -1
        else if (!asc && a[prop] > b[prop]) return -1
        return 0
    })

    return sorted
}