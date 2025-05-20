import { homeThemes } from "@/data/HomePage"

import { redirect } from "next/navigation"
import { genSlug } from "@/utils/genSlug"

const App = () => {
    const initialTheme = genSlug(homeThemes[0])
    return redirect(`/home/${initialTheme}`)
}

export default App