import type { Settings } from '@/types'
import { DEFAULT_WALLPAPERS } from '@/constants/device'

export interface SettingsSlice {
  // State
  settings: Settings

  // Actions
  toggleDarkMode: () => void
  setDarkMode: (enabled: boolean) => void
  setWallpaper: (url: string) => void
  setLockScreenWallpaper: (url: string) => void
  toggleSound: () => void
  toggleHaptic: () => void
  toggleReduceMotion: () => void
  setAutoLockDelay: (delay: number) => void
  updateSettings: (partial: Partial<Settings>) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  darkMode: true,
  wallpaper: DEFAULT_WALLPAPERS.homeScreen,
  lockScreenWallpaper: DEFAULT_WALLPAPERS.lockScreen,
  soundEnabled: true,
  hapticEnabled: true,
  reduceMotion: false,
  autoLockDelay: 60000, // 1 minute
}

type SetState = (partial: Partial<SettingsSlice> | ((state: SettingsSlice) => Partial<SettingsSlice>)) => void

export const createSettingsSlice = (set: SetState): SettingsSlice => ({
  // Initial state
  settings: defaultSettings,

  // Actions
  toggleDarkMode: () =>
    set((state) => ({
      settings: { ...state.settings, darkMode: !state.settings.darkMode },
    })),

  setDarkMode: (enabled) =>
    set((state) => ({
      settings: { ...state.settings, darkMode: enabled },
    })),

  setWallpaper: (url) =>
    set((state) => ({
      settings: { ...state.settings, wallpaper: url },
    })),

  setLockScreenWallpaper: (url) =>
    set((state) => ({
      settings: { ...state.settings, lockScreenWallpaper: url },
    })),

  toggleSound: () =>
    set((state) => ({
      settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled },
    })),

  toggleHaptic: () =>
    set((state) => ({
      settings: { ...state.settings, hapticEnabled: !state.settings.hapticEnabled },
    })),

  toggleReduceMotion: () =>
    set((state) => ({
      settings: { ...state.settings, reduceMotion: !state.settings.reduceMotion },
    })),

  setAutoLockDelay: (delay) =>
    set((state) => ({
      settings: { ...state.settings, autoLockDelay: delay },
    })),

  updateSettings: (partial) =>
    set((state) => ({
      settings: { ...state.settings, ...partial },
    })),

  resetSettings: () => set({ settings: defaultSettings }),
})
