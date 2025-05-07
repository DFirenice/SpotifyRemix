import { cn } from "@/lib/utils"

const Tag = ({ secondary, text }: { secondary?: boolean, text: string }) => {
    return (
        <div className={cn(
            "inline-flex items-center px-3.5 py-1.5 border-fg-secondary/38 border-2 rounded-full",
            {
                "text-fg-primary": !secondary,
                "text-fg-secondary": secondary
            }
        )}>
            {text}
        </div>
    )
}

export default Tag