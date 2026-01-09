import type { AppDefinition, AppInstance } from '@/types'

export interface AppsSlice {
  // State
  registeredApps: AppDefinition[]
  runningApps: AppInstance[]
  activeAppId: string | null

  // Actions
  registerApp: (app: AppDefinition) => void
  unregisterApp: (appId: string) => void
  launchApp: (appId: string) => void
  closeApp: (instanceId: string) => void
  closeAllApps: () => void
  setActiveApp: (instanceId: string | null) => void
  goHome: () => void
}

type SetState = (partial: Partial<AppsSlice> | ((state: AppsSlice) => Partial<AppsSlice>)) => void
type GetState = () => AppsSlice

export const createAppsSlice = (set: SetState, get: GetState): AppsSlice => ({
  // Initial state
  registeredApps: [],
  runningApps: [],
  activeAppId: null,

  // Actions
  registerApp: (app) =>
    set((state) => ({
      registeredApps: state.registeredApps.some((a) => a.id === app.id)
        ? state.registeredApps
        : [...state.registeredApps, app],
    })),

  unregisterApp: (appId) =>
    set((state) => ({
      registeredApps: state.registeredApps.filter((a) => a.id !== appId),
    })),

  launchApp: (appId) => {
    const state = get()
    const app = state.registeredApps.find((a) => a.id === appId)
    if (!app) return

    // Check if app is already running
    const existingInstance = state.runningApps.find((a) => a.appId === appId)

    if (existingInstance) {
      // Bring existing instance to front
      set({ activeAppId: existingInstance.id })
    } else {
      // Create new instance
      const instance: AppInstance = {
        id: `${appId}-${Date.now()}`,
        appId,
        launchedAt: Date.now(),
        state: {},
      }
      set((state) => ({
        runningApps: [...state.runningApps, instance],
        activeAppId: instance.id,
      }))
    }
  },

  closeApp: (instanceId) =>
    set((state) => {
      const newRunningApps = state.runningApps.filter((a) => a.id !== instanceId)
      const newActiveAppId = state.activeAppId === instanceId
        ? (newRunningApps.length > 0 ? newRunningApps[newRunningApps.length - 1].id : null)
        : state.activeAppId
      return {
        runningApps: newRunningApps,
        activeAppId: newActiveAppId,
      }
    }),

  closeAllApps: () => set({ runningApps: [], activeAppId: null }),

  setActiveApp: (instanceId) => set({ activeAppId: instanceId }),

  goHome: () => set({ activeAppId: null }),
})
