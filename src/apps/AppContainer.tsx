import { Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { appRegistry } from './registry'
import { iosSpring } from '@/constants/animations'

export function AppContainer() {
  const { activeAppId, runningApps, registeredApps } = usePhoneStore()

  if (!activeAppId) return null

  const activeInstance = runningApps.find((app) => app.id === activeAppId)
  if (!activeInstance) return null

  const appDef = appRegistry[activeInstance.appId]
  if (!appDef) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <span className="text-white/50">App not found: {activeInstance.appId}</span>
      </div>
    )
  }

  const AppComponent = appDef.component

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeInstance.id}
        className="absolute inset-0 bg-white dark:bg-black"
        initial={{ opacity: 0, scale: 0.95, borderRadius: '22%' }}
        animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={iosSpring.default}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-black">
              <motion.div
                className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          }
        >
          <AppComponent instanceId={activeInstance.id} />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
