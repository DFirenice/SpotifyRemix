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
    const sizeRation = {
        'small': 24,
        'default': 32,
        'large': 40
    }[size] || 0

    if (icon) {
        return (
            <div className="
                flex justify-center items-center
                relative pointer-events-none
                w-fit h-fit
            ">
                <Image
                    src={icon}
                    alt={id}
                    height={sizeRation}
                    width={sizeRation}
                />
            </div>
        )
    }

    return null
}

export default Icon