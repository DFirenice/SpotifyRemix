'use client'

import { useRouter } from "next/navigation"
import Navigation from '@/components/Navigation'
import Drawer from "@/components/Drawer"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    
    const authorized = true
    if (authorized) {
        return (
            <main className='
                grid template-area-app gap-y-1 gap-x-2.5 h-dvh
                py-1.5 px-2
            '>
                <Navigation className="grid-area-header" />
                <Drawer className="grid-area-aside" />
                <section className="overflow-y-auto">
                    { children }
                </section>
            </main>
        )
    }

    router.replace('/auth')
    return null
}

export default Layout