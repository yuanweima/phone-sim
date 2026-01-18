import { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'
import { LockClock } from './LockClock'
import { LockNotifications } from './LockNotifications'
import { Camera, Flashlight } from 'lucide-react'

export function LockScreen() {
  const { unlock, settings, toggleFlashlight, isFlashlightOn, launchApp } = usePhoneStore()
  const [isUnlocking, setIsUnlocking] = useState(false)

  // Swipe up to unlock
  const y = useMotionValue(0)
  const opacity = useTransform(y, [-150, 0], [0, 1])
  const scale = useTransform(y, [-150, 0], [1.1, 1])
  const unlockTextOpacity = useTransform(y, [-100, -50, 0], [0, 0.5, 1])

  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], last, cancel }) => {
      if (last) {
        if (my < -100 || vy < -0.5) {
          // Unlock threshold reached
          setIsUnlocking(true)
          animate(y, -DEVICE.height, {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            onComplete: () => {
              unlock()
              setIsUnlocking(false)
              y.set(0)
            },
          })
        } else {
          // Snap back
          animate(y, 0, iosSpring.bouncy)
        }
      } else {
        // Only allow upward swipe
        y.set(Math.min(0, my))
      }
    },
    { axis: 'y', from: () => [0, y.get()] }
  )

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{
        y,
        opacity,
        scale,
        background: settings.lockScreenWallpaper,
      }}
      {...bind()}
    >
      {/* Clock and Date - positioned below punch-hole */}
      <div
        className="flex flex-col items-center"
        style={{
          paddingTop: DEVICE.punchHole.topOffset + DEVICE.punchHole.size + 24
        }}
      >
        <LockClock />
      </div>

      {/* Notifications - takes remaining space */}
      <div className="flex-1 px-4 py-6 overflow-hidden">
        <LockNotifications />
      </div>

      {/* Bottom area with shortcuts */}
      <div className="pb-8 px-4">
        {/* Swipe up indicator */}
        <motion.div
          className="flex flex-col items-center mb-8"
          style={{ opacity: unlockTextOpacity }}
        >
          <motion.div
            className="w-10 h-1 bg-white/50 rounded-full mb-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-white/70 text-sm">Swipe up to unlock</span>
        </motion.div>

        {/* Shortcuts */}
        <div className="flex justify-between px-4">
          {/* Flashlight */}
          <motion.button
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isFlashlightOn
                ? 'bg-white text-black'
                : 'bg-white/20 text-white backdrop-blur-xl'
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              toggleFlashlight()
            }}
          >
            <Flashlight size={22} />
          </motion.button>

          {/* Camera */}
          <motion.button
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white"
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              unlock()
              launchApp('camera')
            }}
          >
            <Camera size={22} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
