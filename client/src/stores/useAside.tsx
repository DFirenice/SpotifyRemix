import { create } from 'zustand'

export type TAside = React.ReactNode | null

interface IAsideState {
    openAside: TAside
    close: () => void
    toggle: (panel: TAside) => void
}

export const useAsideStore = create<IAsideState>((set, get) => ({
    openAside: null,
    close: () => set({ openAside: null }),
    toggle: (panel) => set({ openAside: get().openAside === panel ? null : panel })
}))