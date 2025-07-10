import { Button } from "@/components/ui/button"
import Icon, { TIconSize } from "@/components/ui/Icon"
import { Ticons } from "@/types/icons"
import { cn } from "@/lib/utils"

type TIconButtonProps = {
    icon: Ticons
    color?: string
    size?: TIconSize
    text?: string
    variant?: React.ComponentProps<typeof Button>["variant"]
}

export default function IconButton ({
    icon, color = "",
    size = "default", text,
    variant = "ghost",
    ...props
}: TIconButtonProps & React.ComponentProps<"button">) {
    return (
        <Button
            className={cn(
                { "pl-1 text-fg-secondary hover:text-fg-secondary": !!text },
                props?.className
            )}
            variant={variant}
            size={text ? "default" : "icon"}
            {...props}
        >
            <Icon color={color} id={icon} size={size} />
            { text }
        </Button>
    )
}