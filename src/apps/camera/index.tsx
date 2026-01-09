import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Zap, RotateCcw, ChevronUp, Circle, Image } from 'lucide-react'

interface CameraProps {
  instanceId: string
}

export default function Camera({ instanceId }: CameraProps) {
  const { goHome } = usePhoneStore()
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('auto')
  const [cameraMode, setCameraMode] = useState<'photo' | 'video' | 'portrait' | 'pano'>('photo')

  const modes = ['PANO', 'PORTRAIT', 'PHOTO', 'VIDEO', 'SLO-MO']

  return (
    <div
      className="w-full h-full flex flex-col bg-black"
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Viewfinder */}
      <div className="flex-1 relative overflow-hidden">
        {/* Camera preview placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <span className="text-gray-600 text-sm">Camera Preview</span>
        </div>

        {/* Top controls */}
        <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6">
          <motion.button
            className={`w-8 h-8 flex items-center justify-center ${flashMode === 'off' ? 'text-white/50' : 'text-yellow-400'}`}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const modes: ('off' | 'on' | 'auto')[] = ['off', 'on', 'auto']
              const currentIndex = modes.indexOf(flashMode)
              setFlashMode(modes[(currentIndex + 1) % modes.length])
            }}
          >
            <Zap size={24} fill={flashMode !== 'off' ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            className="text-yellow-400 text-sm font-medium"
            whileTap={{ scale: 0.95 }}
          >
            {flashMode.toUpperCase()}
          </motion.button>

          <motion.button
            className="w-8 h-8 flex items-center justify-center text-white"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        </div>

        {/* Focus indicator (simulated) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-20 h-20 border-2 border-yellow-400 rounded"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Mode selector */}
      <div className="py-4 px-4">
        <div className="flex justify-center gap-4 overflow-x-auto">
          {modes.map((mode) => (
            <motion.button
              key={mode}
              className={`text-xs font-medium whitespace-nowrap ${
                mode.toLowerCase() === cameraMode ? 'text-yellow-400' : 'text-white/50'
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCameraMode(mode.toLowerCase() as any)}
            >
              {mode}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="pb-8 px-8 flex items-center justify-between">
        {/* Last photo */}
        <motion.button
          className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden"
          whileTap={{ scale: 0.9 }}
        >
          <Image size={20} className="text-white/50" />
        </motion.button>

        {/* Shutter button */}
        <motion.button
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          <Circle size={60} className="text-white" fill="white" />
        </motion.button>

        {/* Flip camera */}
        <motion.button
          className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center"
          whileTap={{ scale: 0.9, rotate: 180 }}
        >
          <RotateCcw size={24} className="text-white" />
        </motion.button>
      </div>
    </div>
  )
}
