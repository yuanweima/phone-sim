import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import {
  Wifi, Bluetooth, Bell, Moon, User, Globe, Accessibility,
  Smartphone, Battery, Shield, ChevronRight, Search, Plane,
  Volume2, Vibrate
} from 'lucide-react'

interface SettingsProps {
  instanceId: string
}

export default function Settings({ instanceId }: SettingsProps) {
  const { settings, toggleDarkMode, goHome } = usePhoneStore()
  const [searchQuery, setSearchQuery] = useState('')

  const settingsGroups = [
    {
      items: [
        { icon: Plane, label: 'Airplane Mode', toggle: true },
        { icon: Wifi, label: 'Wi-Fi', value: 'Home Network' },
        { icon: Bluetooth, label: 'Bluetooth', value: 'On' },
        { icon: Smartphone, label: 'Cellular', value: '' },
        { icon: Vibrate, label: 'Personal Hotspot', value: 'Off' },
      ],
    },
    {
      items: [
        { icon: Bell, label: 'Notifications', value: '' },
        { icon: Volume2, label: 'Sounds & Haptics', value: '' },
        { icon: Moon, label: 'Focus', value: '' },
        { icon: Battery, label: 'Screen Time', value: '' },
      ],
    },
    {
      items: [
        { icon: User, label: 'General', value: '' },
        { icon: Accessibility, label: 'Accessibility', value: '' },
        { icon: Shield, label: 'Privacy & Security', value: '' },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { icon: Moon, label: 'Dark Mode', toggle: true, isOn: settings.darkMode, onToggle: toggleDarkMode },
      ],
    },
  ]

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Header */}
      <div className="px-5 pb-3 pt-2">
        <h1 className={`text-3xl font-bold ${settings.darkMode ? 'text-white' : 'text-black'}`}>
          Settings
        </h1>
      </div>

      {/* Search bar */}
      <div className="px-5 py-2 mb-2">
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
          <Search size={18} className={settings.darkMode ? 'text-gray-500' : 'text-gray-400'} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-base ${settings.darkMode ? 'text-white placeholder:text-gray-500' : 'text-black placeholder:text-gray-400'}`}
          />
        </div>
      </div>

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto ios-scroll px-5 pb-10">
        {/* Apple ID section */}
        <div className={`rounded-xl mb-8 ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
          <div className="flex items-center gap-4 p-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">U</span>
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-lg ${settings.darkMode ? 'text-white' : 'text-black'}`}>User</p>
              <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Apple ID, iCloud, Media & Purchases
              </p>
            </div>
            <ChevronRight size={20} className={settings.darkMode ? 'text-gray-600' : 'text-gray-400'} />
          </div>
        </div>

        {/* Settings groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            {group.title && (
              <h2 className={`text-sm font-medium uppercase tracking-wide px-4 mb-2 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {group.title}
              </h2>
            )}
            <div className={`rounded-xl overflow-hidden ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
              {group.items.map((item, itemIndex) => (
                <SettingsRow
                  key={itemIndex}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  toggle={item.toggle}
                  isOn={item.isOn}
                  onToggle={item.onToggle}
                  isDark={settings.darkMode}
                  showSeparator={itemIndex < group.items.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SettingsRowProps {
  icon: React.ComponentType<any>
  label: string
  value?: string
  toggle?: boolean
  isOn?: boolean
  onToggle?: () => void
  isDark: boolean
  showSeparator: boolean
}

function SettingsRow({
  icon: Icon,
  label,
  value,
  toggle,
  isOn,
  onToggle,
  isDark,
  showSeparator,
}: SettingsRowProps) {
  // Icon background colors
  const iconColors: Record<string, string> = {
    'Airplane Mode': 'bg-[#ff9500]',
    'Wi-Fi': 'bg-[#007aff]',
    'Bluetooth': 'bg-[#007aff]',
    'Cellular': 'bg-[#34c759]',
    'Personal Hotspot': 'bg-[#34c759]',
    'Notifications': 'bg-[#ff3b30]',
    'Sounds & Haptics': 'bg-[#ff2d55]',
    'Focus': 'bg-[#5856d6]',
    'Screen Time': 'bg-[#5856d6]',
    'General': 'bg-[#8e8e93]',
    'Accessibility': 'bg-[#007aff]',
    'Privacy & Security': 'bg-[#007aff]',
    'Dark Mode': 'bg-[#5856d6]',
  }

  return (
    <div className="flex items-center px-4 py-3.5 min-h-[52px]">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 ${iconColors[label] || 'bg-gray-500'}`}>
        <Icon size={18} className="text-white" />
      </div>
      <span className={`flex-1 text-[17px] ${isDark ? 'text-white' : 'text-black'}`}>{label}</span>
      {toggle ? (
        <motion.button
          className={`w-[51px] h-[31px] rounded-full p-0.5 ${isOn ? 'bg-[#34c759]' : isDark ? 'bg-[#39393d]' : 'bg-gray-300'}`}
          onClick={onToggle}
        >
          <motion.div
            className="w-[27px] h-[27px] rounded-full bg-white shadow"
            animate={{ x: isOn ? 20 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      ) : (
        <>
          {value && (
            <span className={`text-[17px] mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{value}</span>
          )}
          <ChevronRight size={20} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
        </>
      )}
    </div>
  )
}
