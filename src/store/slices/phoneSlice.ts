export interface PhoneSlice {
  // State
  isLocked: boolean
  isScreenOn: boolean
  brightness: number
  volume: number
  isSilent: boolean

  // Actions
  lock: () => void
  unlock: () => void
  toggleScreen: () => void
  turnScreenOn: () => void
  turnScreenOff: () => void
  setBrightness: (value: number) => void
  setVolume: (value: number) => void
  toggleSilent: () => void
}

type SetState = (partial: Partial<PhoneSlice> | ((state: PhoneSlice) => Partial<PhoneSlice>)) => void

export const createPhoneSlice = (set: SetState): PhoneSlice => ({
  // Initial state
  isLocked: true,
  isScreenOn: true,
  brightness: 80,
  volume: 50,
  isSilent: false,

  // Actions
  lock: () => set({ isLocked: true }),

  unlock: () => set({ isLocked: false }),

  toggleScreen: () => set((state) => ({ isScreenOn: !state.isScreenOn })),

  turnScreenOn: () => set({ isScreenOn: true }),

  turnScreenOff: () => set({ isScreenOn: false, isLocked: true }),

  setBrightness: (value) => set({ brightness: Math.max(0, Math.min(100, value)) }),

  setVolume: (value) => set({ volume: Math.max(0, Math.min(100, value)) }),

  toggleSilent: () => set((state) => ({ isSilent: !state.isSilent })),
})
