'use client'

import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import type { TThemesPanel } from "@app-types/themesPanel"
import { genSlug } from "@/utils/genSlug"

type TThemesPanelProps = {
    themes: TThemesPanel
}

const ThemesPanel = ({ themes }: TThemesPanelProps) => {
    const absPath = usePathname();
    
    const defineVariant = (type: string): "primary" | "default" => {
        const isActive = absPath.split('/').pop() === genSlug(type)
        return isActive ? "default" : "primary"
    }

    return (
        <div className="
            w-full flex flex-nowrap
            overflow-hidden align-center 
            gap-x-2 p-3
        ">
            { themes.map((type, i) => (
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
    )
}

export default ThemesPanel