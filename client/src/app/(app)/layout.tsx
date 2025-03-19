'use client'

import { useRouter } from "next/navigation"
import Drawer from "@/components/Drawer"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    
    const authorized = true
    if (authorized) {
        return <>
            <Drawer />
            { children }
        </>
    }

    router.replace('/auth')
    return null
}

export default Layout