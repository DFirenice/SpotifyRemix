import { redirect } from "next/navigation"
import { discoverThemes } from "@/data/DiscoverPage"
import { genSlug } from "@/utils/genSlug"

const DiscoveryHomePage = () => {
    const initialTheme = genSlug(discoverThemes[0])
    return redirect(`/discover/${initialTheme}`)
}

export default DiscoveryHomePage