"use client"

import Search from "@/components/ui/Search"
import IconButton from "@/components/ui/IconButton"
import { useState, useRef } from "react"

const SearchOpenable = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const [ isActive, setActive ] = useState(false)

    if (!isActive) return  (
        <IconButton icon="search" onClick={() => setActive(prev => !prev)} />
    )
    
    return <Search autoFocus ref={searchRef} />
}

export default SearchOpenable