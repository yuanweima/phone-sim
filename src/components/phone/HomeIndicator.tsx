import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { DEVICE } from '@/constants/device'
import { usePhoneStore } from '@/store'
import { iosSpring } from '@/constants/animations'

export function HomeIndicator() {
  const isLocked = usePhoneStore((state) => state.isLocked)
  const activeAppId = usePhoneStore((state) => state.activeAppId)
  const settings = usePhoneStore((state) => state.settings)
  const goHome = usePhoneStore((state) => state.goHome)

  // Determine indicator color based on context
  const isDarkBackground = settings.darkMode || isLocked || activeAppId
  const indicatorColor = isDarkBackground ? 'bg-white' : 'bg-black'
  const indicatorOpacity = isDarkBackground ? 'opacity-80' : 'opacity-40'

  // Handle swipe up gesture to go home
  const bind = useDrag(
    ({ movement: [, my], direction: [, dy], velocity: [, vy], last }) => {
      // Swipe up gesture (negative y direction)
      if (last && dy < 0 && (my < -50 || vy > 0.5)) {
        if (activeAppId) {
          goHome()
        }
      }
    },
    { axis: 'y', filterTaps: true }
  )

  return (
    <motion.div
      {...bind()}
      className="absolute left-0 right-0 z-[70] cursor-pointer"
      style={{
        bottom: 0,
        height: 40,
        touchAction: 'none',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={iosSpring.gentle}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: DEVICE.homeIndicator.bottomOffset }}
      >
        <motion.div
          className={`${indicatorColor} ${indicatorOpacity} rounded-full`}
          style={{
            width: DEVICE.homeIndicator.width,
            height: DEVICE.homeIndicator.height,
          }}
          whileHover={{ opacity: 1 }}
        />
      </div>
    </motion.div>
  )
}
