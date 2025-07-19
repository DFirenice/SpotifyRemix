'use client'

import Link from "next/link"
import { useNavStore } from "@/stores/navigationStore"

const ReturnLink = ({ to }: { to?: string }) => {
    const prevPath = useNavStore(state => state.previous)
    return (
        <Link href={to || prevPath}>
            <i className="text-fg-secondary hover:text-accent-default hover:underline transition-all">
                ← Go Back
            </i>
        </Link>
    )
}

export default ReturnLink