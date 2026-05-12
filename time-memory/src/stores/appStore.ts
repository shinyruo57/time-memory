import { create } from 'zustand'

interface AppState {
  isFirstLaunch: boolean
  hasSeenOnboarding: boolean
  toastMessage: string | null
  showToast: (msg: string) => void
  dismissToast: () => void
  completeOnboarding: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isFirstLaunch: true,
  hasSeenOnboarding: false,
  toastMessage: null,
  showToast: (msg) => set({ toastMessage: msg }),
  dismissToast: () => set({ toastMessage: null }),
  completeOnboarding: () => set({ hasSeenOnboarding: true, isFirstLaunch: false }),
}))
