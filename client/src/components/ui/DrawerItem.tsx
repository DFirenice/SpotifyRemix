import { type Ticons } from "@/types/icons"
import Icon from "@/components/ui/Icon"

const DrawerItem = (
    { content, action, link, icon }:
    {
        content: string | React.ReactNode
        action?: () => void
        link?: string
        icon: Ticons
    }
) => {
    return (
        <a
            className="
                flex flex-row gap-2.5 items-center
                text-left no-underline cursor-pointer
                w-full h-fit rounded-xl pr-3 hover:bg-dp-1
                select-none
            "
            { ...(action && { onclick: action }) }
            { ...(link && { href: link || '' }) } // Add error toast
        >
            <Icon id={icon} />
            <div>{content}</div>
        </a>
    )
}

export default DrawerItem