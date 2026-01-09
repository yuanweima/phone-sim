import { motion } from 'framer-motion'
import { DEVICE } from '@/constants/device'
import { usePhoneStore } from '@/store'
import { TimeDisplay } from './TimeDisplay'
import { BatteryIndicator } from './BatteryIndicator'
import { SignalIndicator } from './SignalIndicator'
import { WifiIndicator } from './WifiIndicator'

export function StatusBar() {
  const settings = usePhoneStore((state) => state.settings)
  const isLocked = usePhoneStore((state) => state.isLocked)
  const activeAppId = usePhoneStore((state) => state.activeAppId)

  // Determine text color based on context
  const textColor = settings.darkMode || isLocked ? 'text-white' : 'text-black'

  return (
    <motion.div
      className={`absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 ${textColor}`}
      style={{
        height: DEVICE.statusBar.height,
        paddingTop: DEVICE.statusBar.paddingTop,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side - Time (hidden when Dynamic Island is present in collapsed state) */}
      <div className="flex-1 flex items-center">
        <TimeDisplay />
      </div>

      {/* Center - Dynamic Island space (handled by DynamicIsland component) */}
      <div style={{ width: DEVICE.dynamicIsland.width + 20 }} />

      {/* Right side - Status icons */}
      <div className="flex-1 flex items-center justify-end gap-1">
        <SignalIndicator />
        <WifiIndicator />
        <BatteryIndicator />
      </div>
    </motion.div>
  )
}
