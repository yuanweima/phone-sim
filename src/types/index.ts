// Phone State Types
export interface PhoneState {
  isLocked: boolean
  isScreenOn: boolean
  brightness: number
  volume: number
  isSilent: boolean
}

// App Types
export interface AppDefinition {
  id: string
  name: string
  icon: string
  category?: 'system' | 'utility' | 'social' | 'entertainment'
  component: React.LazyExoticComponent<React.ComponentType<AppProps>>
  backgroundColor?: string
  statusBarStyle?: 'light' | 'dark'
}

export interface AppProps {
  instanceId: string
}

export interface AppInstance {
  id: string
  appId: string
  launchedAt: number
  state: Record<string, unknown>
}

// Home Screen Types
export interface HomePageLayout {
  id: string
  apps: (string | FolderDefinition)[]
}

export interface FolderDefinition {
  id: string
  name: string
  apps: string[]
}

export interface AppPosition {
  pageIndex: number
  gridIndex: number
  folderId?: string
}

// Notification Types
export interface Notification {
  id: string
  appId: string
  title: string
  body: string
  timestamp: number
  read: boolean
  actions?: NotificationAction[]
}

export interface NotificationAction {
  id: string
  title: string
  destructive?: boolean
}

// Settings Types
export interface Settings {
  darkMode: boolean
  wallpaper: string
  lockScreenWallpaper: string
  soundEnabled: boolean
  hapticEnabled: boolean
  reduceMotion: boolean
  autoLockDelay: number
}

// Status Bar Types
export interface StatusBarState {
  time: string
  batteryLevel: number
  isCharging: boolean
  signalStrength: number
  wifiStrength: number
  isAirplaneMode: boolean
  isBluetoothOn: boolean
}

// Dynamic Island Types
export interface DynamicIslandState {
  isExpanded: boolean
  content: DynamicIslandContent | null
}

export interface DynamicIslandContent {
  id: string
  type: 'music' | 'call' | 'timer' | 'navigation' | 'notification'
  render: () => React.ReactNode
}

// Gesture Types
export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

export interface GestureState {
  isControlCenterOpen: boolean
  isNotificationCenterOpen: boolean
  isAppSwitcherOpen: boolean
}

// Control Center Types
export interface ControlCenterState {
  brightness: number
  volume: number
  isWifiOn: boolean
  isBluetoothOn: boolean
  isAirplaneMode: boolean
  isCellularOn: boolean
  isAirDropOn: boolean
  isHotspotOn: boolean
  isFlashlightOn: boolean
  isOrientationLocked: boolean
  isDarkModeOn: boolean
}
