import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/Icon"
import { Ticons } from "@/types/icons"

type TIconButtonProps = {
    icon: Ticons
    color?: string
}

export default function IconButton ({ icon, color = "", ...props }: TIconButtonProps & React.ComponentProps<"button">) {
    return <Button variant="ghost" size="icon" {...props}>
        <Icon color={color} id={icon} />
    </Button>
}