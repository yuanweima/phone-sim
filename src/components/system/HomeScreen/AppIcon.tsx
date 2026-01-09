import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'
import { appIconColors } from '@/constants/theme'
import {
  Phone, MessageSquare, Globe, Camera, Image, Settings, Calculator,
  Clock, StickyNote, Cloud, Calendar, Map, Music, Mail, AppWindow,
  Wallet, Heart, FileText, Video, Users, Mic, Compass, Zap
} from 'lucide-react'

interface AppIconProps {
  appId: string
  onLongPress: () => void
}

// App icon mapping
const appIcons: Record<string, React.ComponentType<any>> = {
  phone: Phone,
  messages: MessageSquare,
  safari: Globe,
  camera: Camera,
  photos: Image,
  settings: Settings,
  calculator: Calculator,
  clock: Clock,
  notes: StickyNote,
  weather: Cloud,
  calendar: Calendar,
  maps: Map,
  music: Music,
  mail: Mail,
  appstore: AppWindow,
  wallet: Wallet,
  health: Heart,
  files: FileText,
  facetime: Video,
  contacts: Users,
  'voice-memos': Mic,
  compass: Compass,
  shortcuts: Zap,
}

// App display names
const appNames: Record<string, string> = {
  phone: 'Phone',
  messages: 'Messages',
  safari: 'Safari',
  camera: 'Camera',
  photos: 'Photos',
  settings: 'Settings',
  calculator: 'Calculator',
  clock: 'Clock',
  notes: 'Notes',
  weather: 'Weather',
  calendar: 'Calendar',
  maps: 'Maps',
  music: 'Music',
  mail: 'Mail',
  appstore: 'App Store',
  wallet: 'Wallet',
  health: 'Health',
  files: 'Files',
  facetime: 'FaceTime',
  contacts: 'Contacts',
  'voice-memos': 'Voice Memos',
  compass: 'Compass',
  shortcuts: 'Shortcuts',
  reminders: 'Reminders',
  news: 'News',
  podcasts: 'Podcasts',
  tv: 'TV',
  books: 'Books',
  fitness: 'Fitness',
  translate: 'Translate',
}

export function AppIcon({ appId, onLongPress }: AppIconProps) {
  const { launchApp, isEditMode, notifications } = usePhoneStore()
  const [isPressed, setIsPressed] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout>()

  const IconComponent = appIcons[appId] || AppWindow
  const backgroundColor = appIconColors[appId] || '#8E8E93'
  const appName = appNames[appId] || appId

  // Count unread notifications for this app
  const unreadCount = notifications.filter(
    (n) => n.appId === appId && !n.read
  ).length

  const handlePointerDown = () => {
    setIsPressed(true)
    longPressTimer.current = setTimeout(() => {
      onLongPress()
    }, 500)
  }

  const handlePointerUp = () => {
    setIsPressed(false)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  const handleClick = () => {
    if (!isEditMode) {
      launchApp(appId)
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      animate={isEditMode ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
      transition={
        isEditMode
          ? { duration: 0.15, repeat: Infinity, ease: 'easeInOut' }
          : iosSpring.responsive
      }
    >
      {/* Icon container */}
      <motion.div
        className="relative"
        style={{ width: DEVICE.grid.iconSize, height: DEVICE.grid.iconSize }}
        whileTap={{ scale: isEditMode ? 1 : 0.9 }}
        transition={iosSpring.responsive}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleClick}
      >
        {/* Icon background */}
        <div
          className="w-full h-full rounded-[22.5%] flex items-center justify-center shadow-lg"
          style={{ background: backgroundColor }}
        >
          <IconComponent size={32} className="text-white" strokeWidth={1.5} />
        </div>

        {/* Notification badge */}
        {unreadCount > 0 && !isEditMode && (
          <motion.div
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={iosSpring.bouncy}
          >
            <span className="text-white text-xs font-semibold">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          </motion.div>
        )}

        {/* Delete button in edit mode */}
        {isEditMode && (
          <motion.button
            className="absolute -top-1 -left-1 w-5 h-5 bg-gray-500/80 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={iosSpring.bouncy}
            onClick={(e) => {
              e.stopPropagation()
              // Would handle app removal here
            }}
          >
            <span className="text-white text-xs leading-none">−</span>
          </motion.button>
        )}
      </motion.div>

      {/* App name */}
      <span className="mt-1 text-[11px] text-white text-center font-medium truncate w-full drop-shadow-md">
        {appName}
      </span>
    </motion.div>
  )
}
