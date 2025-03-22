import Image from "next/image"
import { type Ticons } from "@/types/icons"
import { icons } from "@/data/icons"

const Icon = (
    { size = 'default', id }:
    {
        size?: 'small' | 'default' | 'large'
        id: Ticons
    }
) => {
    const icon = icons[id] as Ticons || null
    // const sizes = {
    //     'small': 12,
    //     'default': 16,
    //     'large': 24
    // }

    if (icon) {
        return (
            <div className="flex min-w-10 min-h-10 relative pointer-events-none">
                <Image
                    src={icon}
                    alt={id}
                    fill
                    // height={sizes[size]}
                    // width={sizes[size]}
                />
            </div>
        )
    }

    return null
}

export default Icon