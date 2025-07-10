import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TViewMode = "list" | "tiles"

export const createViewModeStore = (pageKey: string, initial: TViewMode = "tiles") =>
    create(
        persist<{
            viewMode: TViewMode
            setViewMode: (mode: TViewMode) => void
        }>(
        (set) => ({
            viewMode: initial,
            setViewMode: (mode) => set({ viewMode: mode })
        }),
        {
            name: `content-view-mode-${pageKey}`
        }
    )
)