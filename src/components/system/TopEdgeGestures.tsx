import { useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'

export function TopEdgeGestures() {
  const {
    openControlCenter,
    openNotificationCenter,
    isControlCenterOpen,
    isNotificationCenterOpen,
    isLocked
  } = usePhoneStore()

  const startXRef = useRef(0)
  const y = useMotionValue(0)

  const bind = useDrag(
    ({ xy: [x], movement: [, my], velocity: [, vy], first, last, direction: [, dy] }) => {
      // Don't trigger when locked (lock screen has its own gestures)
      if (isLocked) return

      // Don't trigger if centers are already open
      if (isControlCenterOpen || isNotificationCenterOpen) return

      if (first) {
        // Record starting X position
        startXRef.current = x
      }

      if (last) {
        // Check if swipe down threshold reached
        if ((my > 80 || vy > 0.5) && dy > 0) {
          // Determine which side the swipe started from
          if (startXRef.current > DEVICE.width / 2) {
            // Right side - Control Center
            openControlCenter()
          } else {
            // Left side - Notification Center
            openNotificationCenter()
          }
        }
        // Reset
        animate(y, 0, iosSpring.snappy)
      } else {
        // Only allow downward movement
        y.set(Math.max(0, my))
      }
    },
    { axis: 'y' }
  )

  // Only show hint when swiping down
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-[60] touch-none"
      style={{
        height: DEVICE.statusBar.height + 20,
        // cursor: 'grab'
      }}
      {...bind()}
    >
      {/* Visual indicator during swipe - can be customized */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm pointer-events-none"
        style={{
          height: y,
          opacity: y.get() > 0 ? 1 : 0
        }}
      />
    </motion.div>
  )
}
