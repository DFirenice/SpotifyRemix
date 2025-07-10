import { TSong } from "@/types/mediaEntities.types.ts"

// Helper: safely accessing nested value from object using a path like "author.username"
const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export const sortBy = (
    sortable: TSong[],
    prop: string, // no longer restricted to keyof TSong
    asc: boolean = false
): TSong[] => {
    return sortable.toSorted((a, b) => {
        const aVal = getNestedValue(a, prop)
        const bVal = getNestedValue(b, prop)

        if (aVal === bVal) return 0
        if (asc) return aVal > bVal ? 1 : -1
        else return aVal < bVal ? 1 : -1
    })
}