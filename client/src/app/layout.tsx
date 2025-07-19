import type { Metadata } from "next"
import Head from "next/head"

import '@/../public/styles/satoshi.css'
import "./shadcnGlobals.css"
import './globals.css'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export const metadata: Metadata = {
    title: "SpotRem",
    description: "Special music platform",
}

import { Auth0Provider } from '@auth0/nextjs-auth0'
import NavProvider from "@/components/providers/NavProvider"

export default function RootLayout(
    { children, }: Readonly<{ children: React.ReactNode }>
) {
    return (
        <Auth0Provider>
            <NavProvider>
                <html lang="en" className="dark">
                    <Head>
                        {/* Temporary solution for fonts */}
                        <link rel="stylesheet" href="/fonts/fonts.css" />
                    </Head>
                    <body className="bg-dp-0">
                        {children}
                    </body>
                </html>
            </NavProvider>
        </Auth0Provider>
    )
}