// Warning: This code may have an unexpected behaviour & bugs!

'use client'
import { usePathname } from "next/navigation"

export const useActiveLink = (link: string): boolean => {
    const pathname = usePathname()
    // Absolute link / root link, returns true if root of the link has specified argument
    // Note: absolute routes start with an '*'
    if (link.at(-1) === "*") {
        return pathname.startsWith(link.slice(0, -2))
    } else { return pathname === link }
}