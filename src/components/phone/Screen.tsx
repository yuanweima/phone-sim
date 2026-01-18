import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'
import { PunchHoleCamera } from './PunchHoleCamera'
import { HomeIndicator } from './HomeIndicator'
import { StatusBar } from '../system/StatusBar/StatusBar'
import { LockScreen } from '../system/LockScreen/LockScreen'
import { HomeScreen } from '../system/HomeScreen/HomeScreen'
import { ControlCenter } from '../system/ControlCenter/ControlCenter'
import { NotificationCenter } from '../system/NotificationCenter/NotificationCenter'
import { AppSwitcher } from '../system/AppSwitcher/AppSwitcher'
import { AppContainer } from '@/apps/AppContainer'
import { appRegistry } from '@/apps/registry'
import { TopEdgeGestures } from '../system/TopEdgeGestures'

export function Screen() {
  const registerApp = usePhoneStore((state) => state.registerApp)

  // Register all apps on mount
  useEffect(() => {
    Object.values(appRegistry).forEach((app) => {
      registerApp(app)
    })
  }, [registerApp])
  const isScreenOn = usePhoneStore((state) => state.isScreenOn)
  const isLocked = usePhoneStore((state) => state.isLocked)
  const brightness = usePhoneStore((state) => state.brightness)
  const settings = usePhoneStore((state) => state.settings)
  const activeAppId = usePhoneStore((state) => state.activeAppId)
  const isControlCenterOpen = usePhoneStore((state) => state.isControlCenterOpen)
  const isNotificationCenterOpen = usePhoneStore((state) => state.isNotificationCenterOpen)
  const isAppSwitcherOpen = usePhoneStore((state) => state.isAppSwitcherOpen)

  return (
    <div
      className={`relative w-full h-full overflow-hidden phone-ui ${settings.darkMode ? 'dark' : ''}`}
      style={{
        width: DEVICE.width,
        height: DEVICE.height,
        background: settings.wallpaper,
      }}
    >
      {/* Screen off overlay */}
      <AnimatePresence>
        {!isScreenOn && (
          <motion.div
            className="absolute inset-0 bg-black z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Brightness overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-[90]"
        style={{ opacity: 1 - brightness / 100 }}
      />

      {/* Punch-hole Camera */}
      <PunchHoleCamera />

      {/* Main content layers */}
      <div className="relative w-full h-full">
        {/* Status Bar - always on top */}
        <StatusBar />

        {/* Top edge gesture detection - for control center / notification center */}
        {!isLocked && <TopEdgeGestures />}

        {/* Lock Screen */}
        <AnimatePresence mode="wait">
          {isLocked && (
            <motion.div
              key="lock-screen"
              className="absolute inset-0 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={iosSpring.default}
            >
              <LockScreen />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Screen */}
        <AnimatePresence>
          {!isLocked && !activeAppId && (
            <motion.div
              key="home-screen"
              className="absolute inset-0 z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={iosSpring.default}
            >
              <HomeScreen />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active App */}
        <AnimatePresence>
          {activeAppId && (
            <motion.div
              key="app-container"
              className="absolute inset-0 z-25"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={iosSpring.default}
            >
              <AppContainer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Switcher */}
        <AnimatePresence>
          {isAppSwitcherOpen && (
            <motion.div
              key="app-switcher"
              className="absolute inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={iosSpring.snappy}
            >
              <AppSwitcher />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Center */}
        <AnimatePresence>
          {isControlCenterOpen && (
            <motion.div
              key="control-center"
              className="absolute inset-0 z-50"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={iosSpring.default}
            >
              <ControlCenter />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Center */}
        <AnimatePresence>
          {isNotificationCenterOpen && (
            <motion.div
              key="notification-center"
              className="absolute inset-0 z-50"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={iosSpring.default}
            >
              <NotificationCenter />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator */}
      <HomeIndicator />
    </div>
  )
}
