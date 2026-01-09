import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Image, Square, Heart, Clock } from 'lucide-react'

interface PhotosProps {
  instanceId: string
}

export default function Photos({ instanceId }: PhotosProps) {
  const { settings } = usePhoneStore()
  const [activeTab, setActiveTab] = useState<'library' | 'foryou' | 'albums' | 'search'>('library')

  // Generate placeholder photos with gradient backgrounds
  const photos = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    gradient: `linear-gradient(${45 + i * 15}deg, hsl(${i * 30}, 70%, 60%), hsl(${(i * 30 + 60) % 360}, 70%, 40%))`,
  }))

  const tabs = [
    { id: 'library' as const, icon: Image, label: 'Library' },
    { id: 'foryou' as const, icon: Heart, label: 'For You' },
    { id: 'albums' as const, icon: Square, label: 'Albums' },
    { id: 'search' as const, icon: Clock, label: 'Search' },
  ]

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-white'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${settings.darkMode ? 'text-white' : 'text-black'}`}>
          Library
        </h1>
        <button className="text-[#007aff] text-sm">Select</button>
      </div>

      {/* Photo grid */}
      <div className="flex-1 overflow-y-auto px-0.5">
        <div className="grid grid-cols-3 gap-0.5">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="aspect-square"
              style={{ background: photo.gradient }}
              whileTap={{ scale: 0.95, opacity: 0.8 }}
            />
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div
        className={`flex justify-around py-2 border-t ${settings.darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}
        style={{ paddingBottom: DEVICE.safeArea.bottom }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-[#007aff]' : settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={24} />
            <span className="text-[10px]">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
