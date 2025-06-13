import { Button } from "@/components/ui/button"
import Icon, { TIconSize } from "@/components/ui/Icon"
import { Ticons } from "@/types/icons"
import { cn } from "@/lib/utils"

type TIconButtonProps = {
    icon: Ticons
    color?: string
    size?: TIconSize
    text?: string
}

export default function IconButton ({
    icon, color = "",
    size = "default", text,
    ...props
}: TIconButtonProps & React.ComponentProps<"button">) {
    return (
        <Button
            className={cn({ "pl-1 text-fg-secondary hover:text-fg-secondary": !!text })}
            variant="ghost"
            size={text ? "default" : "icon"}
            {...props}
        >
            <Icon color={color} id={icon} size={size} />
            { text }
        </Button>
    )
}