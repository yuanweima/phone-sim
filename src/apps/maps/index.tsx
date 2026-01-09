import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Search, Navigation, MapPin, Layers, User } from 'lucide-react'

interface MapsProps {
  instanceId: string
}

export default function Maps({ instanceId }: MapsProps) {
  const { settings } = usePhoneStore()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f7]">
      {/* Map placeholder */}
      <div className="flex-1 relative bg-gradient-to-b from-[#c8e0e8] to-[#d8e8d0]">
        {/* Fake map grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-12 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-gray-400/30" />
            ))}
          </div>
        </div>

        {/* Fake roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-3 bg-white/60" />
          <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-white/60" />
          <div className="absolute top-1/2 left-1/4 right-1/4 h-2 bg-gray-300/60" />
        </div>

        {/* Current location pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-8 h-8 rounded-full bg-[#007aff] flex items-center justify-center shadow-lg">
              <Navigation size={16} className="text-white -rotate-45" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#007aff] mt-1 opacity-50" />
          </motion.div>
        </div>

        {/* Some POI markers */}
        <div className="absolute top-1/4 left-1/3">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs shadow">
            <MapPin size={12} />
          </div>
        </div>
        <div className="absolute top-2/3 left-2/3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shadow">
            <MapPin size={12} />
          </div>
        </div>

        {/* Search bar overlay */}
        <div className="absolute top-0 left-0 right-0 p-4" style={{ paddingTop: DEVICE.safeArea.top + 8 }}>
          <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Maps"
              className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute right-4 top-1/3 flex flex-col gap-2">
          <motion.button
            className="w-10 h-10 rounded-lg bg-white shadow-lg flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Layers size={20} className="text-gray-600" />
          </motion.button>
          <motion.button
            className="w-10 h-10 rounded-lg bg-white shadow-lg flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Navigation size={20} className="text-[#007aff]" />
          </motion.button>
        </div>

        {/* Bottom info card */}
        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ paddingBottom: DEVICE.safeArea.bottom + 8 }}>
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#007aff] flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-black">Current Location</p>
                <p className="text-sm text-gray-500">San Francisco, CA</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                className="flex-1 py-2 rounded-lg bg-[#007aff] text-white font-medium text-sm"
                whileTap={{ scale: 0.98 }}
              >
                Directions
              </motion.button>
              <motion.button
                className="flex-1 py-2 rounded-lg bg-gray-100 text-black font-medium text-sm"
                whileTap={{ scale: 0.98 }}
              >
                Look Around
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
