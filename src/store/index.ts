import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

import { createPhoneSlice } from './slices/phoneSlice'
import type { PhoneSlice } from './slices/phoneSlice'
import { createAppsSlice } from './slices/appsSlice'
import type { AppsSlice } from './slices/appsSlice'
import { createHomeSlice } from './slices/homeSlice'
import type { HomeSlice } from './slices/homeSlice'
import { createSettingsSlice } from './slices/settingsSlice'
import type { SettingsSlice } from './slices/settingsSlice'
import { createControlCenterSlice } from './slices/controlCenterSlice'
import type { ControlCenterSlice } from './slices/controlCenterSlice'
import { createNotificationSlice } from './slices/notificationSlice'
import type { NotificationSlice } from './slices/notificationSlice'
import { createAppSwitcherSlice } from './slices/appSwitcherSlice'
import type { AppSwitcherSlice } from './slices/appSwitcherSlice'
import { createDynamicIslandSlice } from './slices/dynamicIslandSlice'
import type { DynamicIslandSlice } from './slices/dynamicIslandSlice'

// Combined store type
export type PhoneStore = PhoneSlice &
  AppsSlice &
  HomeSlice &
  SettingsSlice &
  ControlCenterSlice &
  NotificationSlice &
  AppSwitcherSlice &
  DynamicIslandSlice

// Create the combined store
export const usePhoneStore = create<PhoneStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (...args) => ({
          ...createPhoneSlice(...args),
          ...createAppsSlice(...args),
          ...createHomeSlice(...args),
          ...createSettingsSlice(...args),
          ...createControlCenterSlice(...args),
          ...createNotificationSlice(...args),
          ...createAppSwitcherSlice(...args),
          ...createDynamicIslandSlice(...args),
        }),
        {
          name: 'phone-simulator-storage',
          // Only persist certain slices
          partialize: (state) => ({
            settings: state.settings,
            homePages: state.homePages,
            dockApps: state.dockApps,
            notifications: state.notifications,
          }),
        }
      )
    ),
    { name: 'PhoneSimulator' }
  )
)

// Selector hooks for better performance
export const useIsLocked = () => usePhoneStore((state) => state.isLocked)
export const useIsScreenOn = () => usePhoneStore((state) => state.isScreenOn)
export const useBrightness = () => usePhoneStore((state) => state.brightness)
export const useVolume = () => usePhoneStore((state) => state.volume)
export const useSettings = () => usePhoneStore((state) => state.settings)
export const useActiveApp = () => usePhoneStore((state) => state.activeAppId)
export const useRunningApps = () => usePhoneStore((state) => state.runningApps)
export const useHomePages = () => usePhoneStore((state) => state.homePages)
export const useDockApps = () => usePhoneStore((state) => state.dockApps)
export const useCurrentPage = () => usePhoneStore((state) => state.currentPage)
export const useIsEditMode = () => usePhoneStore((state) => state.isEditMode)
export const useNotifications = () => usePhoneStore((state) => state.notifications)
export const useIsControlCenterOpen = () => usePhoneStore((state) => state.isControlCenterOpen)
export const useIsNotificationCenterOpen = () => usePhoneStore((state) => state.isNotificationCenterOpen)
export const useIsAppSwitcherOpen = () => usePhoneStore((state) => state.isAppSwitcherOpen)
export const useDynamicIslandState = () =>
  usePhoneStore((state) => ({
    isExpanded: state.isDynamicIslandExpanded,
    content: state.dynamicIslandContent,
  }))
