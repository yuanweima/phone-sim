import { useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'
import { AppGrid } from './AppGrid'
import { Dock } from './Dock'
import { PageDots } from './PageDots'

export function HomeScreen() {
  const { homePages, currentPage, setCurrentPage, isEditMode, setEditMode } = usePhoneStore()
  const containerRef = useRef<HTMLDivElement>(null)

  // Page swipe handling
  const x = useMotionValue(-currentPage * DEVICE.width)

  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], last, direction: [dx] }) => {
      if (last) {
        const threshold = DEVICE.width / 4
        const velocityThreshold = 0.5

        let targetPage = currentPage

        if (Math.abs(mx) > threshold || Math.abs(vx) > velocityThreshold) {
          if (dx < 0 && currentPage < homePages.length - 1) {
            targetPage = currentPage + 1
          } else if (dx > 0 && currentPage > 0) {
            targetPage = currentPage - 1
          }
        }

        setCurrentPage(targetPage)
        animate(x, -targetPage * DEVICE.width, iosSpring.default)
      } else {
        // Live drag
        const dragX = -currentPage * DEVICE.width + mx
        // Add resistance at edges
        const minX = -(homePages.length - 1) * DEVICE.width
        const maxX = 0
        const resistedX = applyResistance(dragX, minX, maxX)
        x.set(resistedX)
      }
    },
    { axis: 'x', from: () => [x.get(), 0] }
  )

  // Long press to enter edit mode
  const handleLongPress = () => {
    setEditMode(true)
    // Haptic feedback would go here
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" ref={containerRef}>
      {/* App pages */}
      <div className="flex-1 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 flex"
          style={{ x }}
          {...bind()}
        >
          {homePages.map((page, index) => (
            <div
              key={page.id}
              className="flex-shrink-0"
              style={{ width: DEVICE.width }}
            >
              <AppGrid pageIndex={index} onLongPress={handleLongPress} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Page dots */}
      <PageDots />

      {/* Dock */}
      <Dock />

      {/* Edit mode overlay - tap anywhere to exit */}
      {isEditMode && (
        <motion.div
          className="absolute inset-0 z-50 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setEditMode(false)}
        >
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <motion.span
              className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Tap anywhere to exit edit mode
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Apply rubber band resistance at edges
function applyResistance(value: number, min: number, max: number): number {
  if (value > max) {
    const overshoot = value - max
    return max + overshoot * 0.3
  }
  if (value < min) {
    const overshoot = min - value
    return min - overshoot * 0.3
  }
  return value
}
