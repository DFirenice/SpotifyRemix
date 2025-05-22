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
                w-full h-fit rounded-md pr-3 hover:bg-dp-2
                select-none text-fg-secondary
            "
            { ...(action && { onclick: action }) }
            { ...(link && { href: link || '' }) } // Add error toast
        >
            <Icon id={icon} size="large" />
            <div>{content}</div>
        </a>
    )
}

export default DrawerItem