'use client'

import { useEffect } from "react"
import { useNavStore } from "@/stores/navigationStore"
import { usePathname } from 'next/navigation'

const NavProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    
    const logPath = useNavStore(state => state.logPath)
    // const history = useNavStore(state => state.history)
    
    useEffect(() => {
        logPath(pathname)
        // console.log(history)
    }, [ pathname ])
    
    return <>{ children }</>
}

export default NavProvider