import { motion, AnimatePresence } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'
import { Music, Phone, Timer } from 'lucide-react'

export function DynamicIsland() {
  const {
    isDynamicIslandExpanded,
    dynamicIslandContent,
    toggleDynamicIsland,
  } = usePhoneStore()

  const di = DEVICE.dynamicIsland

  return (
    <motion.div
      className="absolute left-1/2 bg-black z-[60] cursor-pointer flex items-center justify-center overflow-hidden"
      style={{
        top: di.topOffset,
        x: '-50%',
      }}
      animate={{
        width: isDynamicIslandExpanded ? di.expandedWidth : di.width,
        height: isDynamicIslandExpanded ? di.expandedHeight : di.height,
        borderRadius: isDynamicIslandExpanded ? di.expandedBorderRadius : di.borderRadius,
      }}
      transition={iosSpring.bouncy}
      onClick={toggleDynamicIsland}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {dynamicIslandContent ? (
          <motion.div
            key={dynamicIslandContent.id}
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DynamicIslandContent
              type={dynamicIslandContent.type}
              isExpanded={isDynamicIslandExpanded}
            />
          </motion.div>
        ) : (
          <motion.div
            key="camera-indicator"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Front camera (fake) */}
            <div className="w-3 h-3 rounded-full bg-[#1a1a2a] ring-1 ring-[#2a2a3a]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface DynamicIslandContentProps {
  type: 'music' | 'call' | 'timer' | 'navigation' | 'notification'
  isExpanded: boolean
}

function DynamicIslandContent({ type, isExpanded }: DynamicIslandContentProps) {
  if (type === 'music') {
    return (
      <div className="w-full h-full flex items-center px-3 text-white">
        {isExpanded ? (
          <div className="w-full flex items-center gap-3">
            {/* Album art placeholder */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Music size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Now Playing</div>
              <div className="text-xs text-gray-400 truncate">Artist Name</div>
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-white rounded-full" />
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-1">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Music size={12} />
            </div>
            {/* Audio visualizer bars */}
            <div className="flex items-end gap-0.5 h-4">
              {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-green-500 rounded-full"
                  animate={{ height: [h * 16, h * 8, h * 16] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (type === 'call') {
    return (
      <div className="w-full h-full flex items-center px-3 text-white">
        {isExpanded ? (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-green-500">Incoming Call</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <Phone size={20} className="rotate-[135deg]" />
              </button>
              <button className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Phone size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-green-500" />
              <span className="text-xs">John Doe</span>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        )}
      </div>
    )
  }

  if (type === 'timer') {
    return (
      <div className="w-full h-full flex items-center px-3 text-white">
        {isExpanded ? (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Timer size={24} className="text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-light font-mono">02:45</div>
                <div className="text-xs text-gray-400">Timer</div>
              </div>
            </div>
            <button className="px-4 py-2 rounded-full bg-orange-500 text-sm font-medium">
              Stop
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-1">
            <Timer size={14} className="text-orange-500" />
            <span className="text-sm font-mono text-orange-500">02:45</span>
          </div>
        )}
      </div>
    )
  }

  return null
}
