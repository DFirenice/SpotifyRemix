'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "@/stores/useUserStore"
import { useProtectedApi } from "@/lib/axios"

import Navigation from '@/components/Navigation'
import Drawer from "@/components/Drawer"
import Aside from "@/components/Aside"
import PlayingSongController from "@/components/PlayingSongCotroller"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const { init, initialized, user } = useUserStore()

    useEffect(() => {
        const validateToken = async () => {
            const res = await useProtectedApi.get('/validate-token')
            if (res?.data?.success && res?.data?.isValid) init()
        }

        if (!initialized || !user) {
            try { validateToken() }
            catch { router.replace('/auth') }
        }
    }, [])

    return (
        <main className="
            grid template-area-app gap-y-2 gap-x-1.5
            h-screen py-2 px-1.5
        ">
            <Navigation className="grid-area-header" />
            <Drawer className="grid-area-aside flex flex-col gap-y-1" />
            {/* Content */}
            <section className="flex flex-col gap-1 overflow-hidden">
                {children}
                <PlayingSongController />
            </section>
            {/* Opening menus */}
            <Aside />
        </main>
    )
}

export default Layout