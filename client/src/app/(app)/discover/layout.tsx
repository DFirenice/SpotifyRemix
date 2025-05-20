'use client'

import ThemesPanel from "@/components/ThemesPanel"
import { discoverThemes } from "@/data/DiscoverPage"

const DiscorverPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex h-full flex-col bordered">
            <ThemesPanel themes={discoverThemes} />            
            { children }
        </section>
    )
}

export default DiscorverPage