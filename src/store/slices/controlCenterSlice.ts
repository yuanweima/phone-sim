export interface ControlCenterSlice {
  // State
  isControlCenterOpen: boolean
  isWifiOn: boolean
  isBluetoothOn: boolean
  isAirplaneMode: boolean
  isCellularOn: boolean
  isAirDropOn: boolean
  isHotspotOn: boolean
  isFlashlightOn: boolean
  isOrientationLocked: boolean
  flashlightIntensity: number

  // Actions
  openControlCenter: () => void
  closeControlCenter: () => void
  toggleControlCenter: () => void
  toggleWifi: () => void
  toggleBluetooth: () => void
  toggleAirplaneMode: () => void
  toggleCellular: () => void
  toggleAirDrop: () => void
  toggleHotspot: () => void
  toggleFlashlight: () => void
  toggleOrientationLock: () => void
  setFlashlightIntensity: (intensity: number) => void
}

type SetState = (partial: Partial<ControlCenterSlice> | ((state: ControlCenterSlice) => Partial<ControlCenterSlice>)) => void

export const createControlCenterSlice = (set: SetState): ControlCenterSlice => ({
  // Initial state
  isControlCenterOpen: false,
  isWifiOn: true,
  isBluetoothOn: true,
  isAirplaneMode: false,
  isCellularOn: true,
  isAirDropOn: false,
  isHotspotOn: false,
  isFlashlightOn: false,
  isOrientationLocked: false,
  flashlightIntensity: 100,

  // Actions
  openControlCenter: () => set({ isControlCenterOpen: true }),
  closeControlCenter: () => set({ isControlCenterOpen: false }),
  toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen })),

  toggleWifi: () => set((state) => ({ isWifiOn: !state.isWifiOn })),
  toggleBluetooth: () => set((state) => ({ isBluetoothOn: !state.isBluetoothOn })),

  toggleAirplaneMode: () => set((state) => ({
    isAirplaneMode: !state.isAirplaneMode,
    // When airplane mode is turned on, disable wifi and cellular
    ...(state.isAirplaneMode ? {} : { isWifiOn: false, isCellularOn: false }),
    // When airplane mode is turned off, restore wifi
    ...(!state.isAirplaneMode ? {} : { isWifiOn: true, isCellularOn: true }),
  })),

  toggleCellular: () => set((state) => ({ isCellularOn: !state.isCellularOn })),
  toggleAirDrop: () => set((state) => ({ isAirDropOn: !state.isAirDropOn })),
  toggleHotspot: () => set((state) => ({ isHotspotOn: !state.isHotspotOn })),
  toggleFlashlight: () => set((state) => ({ isFlashlightOn: !state.isFlashlightOn })),
  toggleOrientationLock: () => set((state) => ({ isOrientationLocked: !state.isOrientationLocked })),
  setFlashlightIntensity: (intensity) => set({ flashlightIntensity: Math.max(0, Math.min(100, intensity)) }),
})
