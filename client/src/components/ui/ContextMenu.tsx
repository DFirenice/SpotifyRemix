import React from "react"

import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@radix-ui/react-dropdown-menu"

import Link from "next/link"
import Icon from "@app-ui/Icon"
import type { Ticons } from "@/types/icons"
import IconButton from "./IconButton"

type THasLink = {
    label: string | React.ReactElement
    link?: string
    icon: Ticons
}

type THasAction = {
    label: string | React.ReactElement
    action?: (() => void) | ((e: any) => void)
    icon: Ticons
}

type TContextMenuProps = {
    triggerElement: React.ElementType | React.ReactElement
    content: {
        menuLabel?: string
        items: (THasLink | THasAction)[]
    }
}

const ContextMenu = ({ triggerElement, content }: TContextMenuProps) => {
    const renderTrigger = () => {
        if (React.isValidElement(triggerElement)) {
            return triggerElement
        }
        const TriggerComponent = triggerElement as React.ElementType
        return <TriggerComponent />
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                { renderTrigger() }
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="
                    w-56 bg-dp-1 rounded-md py-2.5 px-1.5
                    border-1 border-fg-secondary/38 cursor-default z-10
                ">
                <DropdownMenuLabel className="text-fg-secondary text-xs my-1 px-1.75 uppercase tracking-wider">{ content?.menuLabel ?? null }</DropdownMenuLabel>
                
                { content.items.map(item => (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer rounded-md">
                                {/* Film: Spaghetti code. Produced and developed by me... */}
                                { 'link' in item ?
                                    <DropdownMenuLabel>
                                        <Link className="w-full h-full" href={item.link || ''}>
                                            <IconButton size="small" className="text-fg-secondary hover:text-fg-primary w-full justify-start pl-1" icon={item.icon} text={item.label} />
                                        </Link>
                                    </DropdownMenuLabel>
                                    : 'action' in item &&
                                        <DropdownMenuLabel onClick={item.action}>
                                            <IconButton size="small" className="text-fg-secondary hover:text-fg-primary w-full justify-start pl-1" icon={item.icon} text={item.label} />
                                        </DropdownMenuLabel>
                                }
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                )) }

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ContextMenu