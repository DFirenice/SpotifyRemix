'use client'

import { useRouter } from "next/navigation"
import Navigation from '@/components/Navigation'
import Drawer from "@/components/Drawer"
import Aside from "@/components/Aside"
import PlayingSongController from "@/components/PlayingSongCotroller"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    
    const authorized = true
    if (authorized) {
        return (
            <main className="
                grid template-area-app gap-y-2 gap-x-1.5
                h-dvh py-2 px-1.5
            ">
                <Navigation className="grid-area-header" />
                <Drawer className="grid-area-aside flex flex-col gap-y-1" />
                {/* Content */}
                <section className="flex flex-col gap-1 overflow-hidden">
                    { children }
                    <PlayingSongController />
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