import {
    Command,
    CommandInput
} from '@/components/ui/command'
import React, { Ref } from 'react'
import { cn } from '@/lib/utils'

const Search = ({ ref, autoFocus = false, className } : { ref?: Ref<HTMLInputElement>, autoFocus?: boolean, className?: string}) => {
    return (
        <Command className={cn(
            "outline-none border-none bg-transparent &_div]:h-full **:border-none has-[input:focus]:bg-dp-1",
            className
        )}>
            <CommandInput autoFocus={autoFocus} placeholder="Search..." ref={ref} className="border-none"/>
        </Command>
    )
}

export default Search