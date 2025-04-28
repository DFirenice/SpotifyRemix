'use client'
import { useParams } from "next/navigation"

const DiscoveryThemePage = () => {
    const params = useParams()
    const rawSlug = params?.slug as string,
          decodedSlug = decodeURIComponent(rawSlug)

    return (
        <div>
            Theme page: {decodedSlug.toString()}
        </div>
    )
}

export default DiscoveryThemePage