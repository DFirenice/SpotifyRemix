import { create } from "zustand"

interface NavState {
    history: string[]
    previous: string
    logPath: (path: string) => void
}

const HISTORY_LIMIT = 50 // 50-100 is a standard

export const useNavStore = create<NavState>((set, get) => ({
    history: [],
    previous: get()?.history?.length > 1 ? get().history[1] : '/',
    // Adds visited path as string to 'history' log
    logPath: (path: string) => set(state => {
        // Return object with keys of what to upd
        const h = state.history
        
        // Disallowing history overflow
        if (h.length >= HISTORY_LIMIT) {
            h.pop()
        }
        
        // Preventing from cycling
        // User: 0 -> 1 -> 2 -> 1 will result into [0, 1] final path
        if (h.length > 1 && path === h[1]) {
            h.shift()
            return { history: h }
        }
        
        h.unshift(path)
        return { history: h }
    })
}))