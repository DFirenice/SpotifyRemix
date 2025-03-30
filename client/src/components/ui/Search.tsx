'use client'

import { useState } from 'react'
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandList
} from '@/components/ui/command'

const Search = () => {
    const [ open, setOpen ] = useState(false)
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search..." />
            <CommandList>
                <CommandEmpty>No results found...</CommandEmpty>
            </CommandList>
        </CommandDialog>
    )
}

export default Search