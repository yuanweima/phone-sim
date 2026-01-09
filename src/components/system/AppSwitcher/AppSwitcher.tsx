import { useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'

export function AppSwitcher() {
  const {
    runningApps,
    registeredApps,
    activeAppId,
    closeApp,
    setActiveApp,
    closeAppSwitcher,
    goHome,
  } = usePhoneStore()

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollX = useMotionValue(0)

  // Calculate card dimensions
  const cardWidth = DEVICE.width * 0.75
  const cardHeight = DEVICE.height * 0.65
  const cardGap = 20

  // Swipe to navigate cards
  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], last, direction: [dx] }) => {
      if (last) {
        // Snap to nearest card
        const currentOffset = scrollX.get()
        const cardIndex = Math.round(-currentOffset / (cardWidth + cardGap))
        const targetOffset = -cardIndex * (cardWidth + cardGap)
        animate(scrollX, targetOffset, iosSpring.default)
      } else {
        scrollX.set(scrollX.get() + mx / 10)
      }
    },
    { axis: 'x' }
  )

  // Handle tap on background to close
  const handleBackgroundClick = () => {
    closeAppSwitcher()
    goHome()
  }

  if (runningApps.length === 0) {
    return (
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center"
        onClick={handleBackgroundClick}
      >
        <motion.p
          className="text-white/50 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          No apps running
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute inset-0 bg-black/80 backdrop-blur-xl pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackgroundClick}
    >
      {/* App cards container */}
      <div
        ref={containerRef}
        className="flex items-start justify-center h-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        {...bind()}
      >
        <motion.div
          className="flex items-start gap-5 px-10"
          style={{ x: scrollX }}
        >
          {runningApps.map((appInstance, index) => (
            <AppCard
              key={appInstance.id}
              appInstance={appInstance}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              onClose={() => closeApp(appInstance.id)}
              onSelect={() => {
                setActiveApp(appInstance.id)
                closeAppSwitcher()
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

interface AppCardProps {
  appInstance: {
    id: string
    appId: string
    launchedAt: number
  }
  cardWidth: number
  cardHeight: number
  onClose: () => void
  onSelect: () => void
}

function AppCard({ appInstance, cardWidth, cardHeight, onClose, onSelect }: AppCardProps) {
  const y = useMotionValue(0)

  // Swipe up to close app
  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], last, direction: [, dy] }) => {
      if (last) {
        if (my < -100 || (vy < -0.5 && dy < 0)) {
          // Close app
          animate(y, -DEVICE.height, {
            ...iosSpring.snappy,
            onComplete: onClose,
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
    { axis: 'y' }
  )

  // App name mapping
  const appNames: Record<string, string> = {
    phone: 'Phone',
    messages: 'Messages',
    safari: 'Safari',
    settings: 'Settings',
    calculator: 'Calculator',
    photos: 'Photos',
    camera: 'Camera',
    notes: 'Notes',
    weather: 'Weather',
    clock: 'Clock',
    calendar: 'Calendar',
    maps: 'Maps',
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ y }}
      {...bind()}
    >
      {/* App preview card */}
      <motion.div
        className="rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        style={{
          width: cardWidth,
          height: cardHeight,
          background: 'linear-gradient(180deg, #2a2a3a 0%, #1a1a2a 100%)',
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelect}
      >
        {/* Placeholder content - would show actual app screenshot */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/30 text-2xl font-light">
            {appNames[appInstance.appId] || appInstance.appId}
          </span>
        </div>
      </motion.div>

      {/* App name */}
      <motion.span
        className="text-white text-sm font-medium mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {appNames[appInstance.appId] || appInstance.appId}
      </motion.span>
    </motion.div>
  )
}
