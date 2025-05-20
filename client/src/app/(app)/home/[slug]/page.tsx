'use client'

import { homeThemes } from "@/data/HomePage"
import ThemesPanel from "@/components/ThemesPanel"

const App = () => {
    return <div className="h-full bordered">
        <ThemesPanel themes={homeThemes} />
    </div>
}

export default App