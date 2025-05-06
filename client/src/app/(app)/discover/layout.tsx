'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { discoverThemes } from "@/data/DiscoverPage"
import { genSlug } from "@/utils/genSlug"

const DiscorverPage = ({ children }: { children: React.ReactNode }) => {
    const absPath = usePathname()

    const defineVariant = (type: string): "primary" | "default" => {
        const isActive = absPath.split('/').pop() === genSlug(type)
        return isActive ? "default" : "primary"
    }

    return (
        <section className="flex h-full flex-col">
            {/* Panel */}
            <div className="
                w-full flex flex-nowrap
                overflow-hidden align-center 
                gap-x-2 p-3
            ">
                { discoverThemes.map((type, i) => (
                    <Button
                        key={`${type}_${i}`}
                        asChild variant={defineVariant(type)}
                    >
                        <Link href={genSlug(type)}>
                            {type}
                        </Link>
                    </Button>
                )) }
            </div>
            {/* Corresponding body */}
            <div className="h-full w-full flex">
                { children }
            </div>
        </section>
    )
}

export default DiscorverPage