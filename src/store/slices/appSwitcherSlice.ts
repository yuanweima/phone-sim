export interface AppSwitcherSlice {
  // State
  isAppSwitcherOpen: boolean

  // Actions
  openAppSwitcher: () => void
  closeAppSwitcher: () => void
  toggleAppSwitcher: () => void
}

type SetState = (partial: Partial<AppSwitcherSlice> | ((state: AppSwitcherSlice) => Partial<AppSwitcherSlice>)) => void

export const createAppSwitcherSlice = (set: SetState): AppSwitcherSlice => ({
  // Initial state
  isAppSwitcherOpen: false,

  // Actions
  openAppSwitcher: () => set({ isAppSwitcherOpen: true }),
  closeAppSwitcher: () => set({ isAppSwitcherOpen: false }),
  toggleAppSwitcher: () => set((state) => ({ isAppSwitcherOpen: !state.isAppSwitcherOpen })),
})
