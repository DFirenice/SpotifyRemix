'use client'

import { useRouter } from "next/navigation"
import Navigation from '@/components/Navigation'
import Drawer from "@/components/Drawer"
import Aside from "@/components/Aside"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    
    const authorized = true
    if (authorized) {
        return (
            <main className="
                grid template-area-app gap-y-2 gap-x-2.5 h-dvh
                py-1.5 px-2
            ">
                <Navigation className="grid-area-header" />
                <Drawer className="grid-area-aside flex flex-col gap-y-1" />
                {/* Content */}
                <section className="
                    overflow-y-auto rounded-md
                    border-2 border-dp-1
                    px-5 pt-3
                ">
                    { children }
                </section>
                {/* Opening menus */}
                <Aside />
            </main>
        )
    }

    router.replace('/auth')
    return null
}

export default Layout