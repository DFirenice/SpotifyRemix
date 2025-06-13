import { type Ticons } from "@/types/icons"
import Icon from "@/components/ui/Icon"

import { useActiveLink } from "@/hooks/isActiveLink"
import { cn } from "@/lib/utils"

const DrawerItem = (
    { content, action, link, icon }:
    {
        content: string | React.ReactNode
        action?: () => void
        link?: string
        icon: Ticons
    }
) => {
    const isActive = useActiveLink(link)
    return (
        <a
            className={cn(
                "flex flex-row gap-2.5 items-center cursor-pointer select-none text-fg-secondary",
                "w-full h-fit rounded-md pr-3 text-left no-underline  hover:bg-dp-2",
                { "text-fg-primary bg-dp-2": isActive }
            )}
            { ...(action && { onclick: action }) }
            { ...(link && { href: link || '' }) } // Add error toast
        >
            <Icon id={icon} size="large" />
            <div>{content}</div>
            { isActive && <Icon className="ml-auto" id="arrow_right"/> }
        </a>
    )
}

export default DrawerItem