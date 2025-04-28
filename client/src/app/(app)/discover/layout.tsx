'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { isActiveLink } from "@/utils/isActiveLink"
import { usePathname } from "next/navigation"
import { discoverThemes } from "@/data/DiscoverPage"

const DiscorverPage = ({ children }: { children: React.ReactNode }) => {
    const absPath = usePathname()

    const defineVariant = (path: string): "primary" | "default" => {
        const isActive = isActiveLink(path, `${absPath}/`)
        return isActive ? "default" : "primary"
    }

    // Rest of path based on 'discoverThemes' type
    const genSlug = (path: string) => (`${path.toLowerCase().split(' ').join("_")}`)

    return (
        <section className="flex h-full flex-col">
            {/* Panel */}
            <div className="
                w-full flex flex-nowrap
                overflow-hidden align-center 
                gap-x-2 py-3
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