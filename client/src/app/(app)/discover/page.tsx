import { redirect } from "next/navigation"
import { discoverThemes } from "@/data/DiscoverPage"

const DiscoveryHomePage = () => {
    const initialTheme = discoverThemes[0]
    return redirect(`/discover/${initialTheme}`)
}

export default DiscoveryHomePage