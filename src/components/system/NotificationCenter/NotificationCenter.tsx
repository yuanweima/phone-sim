import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { usePhoneStore } from '@/store'
import { format, formatDistanceToNow } from 'date-fns'
import { X, Bell } from 'lucide-react'
import { iosSpring } from '@/constants/animations'
import { DEVICE } from '@/constants/device'

export function NotificationCenter() {
  const {
    closeNotificationCenter,
    notifications,
    removeNotification,
    clearAll,
    settings,
  } = usePhoneStore()

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Swipe up to close (like dismissing lock screen)
  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], last, direction: [, dy] }) => {
      if (last && (my < -100 || vy < -0.5) && dy < 0) {
        closeNotificationCenter()
      }
    },
    { axis: 'y' }
  )

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{
        background: settings.lockScreenWallpaper,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeNotificationCenter}
      {...bind()}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Time and Date - similar to lock screen */}
        <div
          className="flex flex-col items-center text-white"
          style={{
            paddingTop: DEVICE.dynamicIsland.topOffset + DEVICE.dynamicIsland.height + 24
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[64px] font-light tracking-tight leading-none">
            {format(time, 'h:mm')}
          </div>
          <div className="text-[17px] font-normal mt-2 opacity-90">
            {format(time, 'EEEE, MMMM d')}
          </div>
        </div>

        {/* Notifications header */}
        <div className="px-4 pt-6 pb-2 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wide">Notifications</h2>
          {notifications.length > 0 && (
            <motion.button
              className="text-white/70 text-sm"
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
            >
              Clear All
            </motion.button>
          )}
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto px-4 pb-8 ios-scroll" onClick={(e) => e.stopPropagation()}>
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-white/50">
              <Bell size={36} className="mb-3 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onDismiss={() => removeNotification(notification.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Swipe up indicator */}
        <div className="pb-8 flex flex-col items-center">
          <motion.div
            className="w-10 h-1 bg-white/50 rounded-full mb-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-white/70 text-sm">Swipe up to close</span>
        </div>
      </div>
    </motion.div>
  )
}

interface NotificationCardProps {
  notification: {
    id: string
    appId: string
    title: string
    body: string
    timestamp: number
    read: boolean
  }
  onDismiss: () => void
}

function NotificationCard({ notification, onDismiss }: NotificationCardProps) {
  const x = useMotionValue(0)

  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], last, direction: [dx] }) => {
      if (last) {
        if (Math.abs(mx) > 100 || Math.abs(vx) > 0.5) {
          // Dismiss
          onDismiss()
        } else {
          // Snap back
          x.set(0)
        }
      } else {
        x.set(mx)
      }
    },
    { axis: 'x' }
  )

  return (
    <motion.div
      className="relative"
      style={{ x }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -200, scale: 0.9 }}
      transition={iosSpring.default}
      {...bind()}
    >
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-white">
        <div className="flex items-start gap-3">
          {/* App icon */}
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
            {getAppIcon(notification.appId)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{notification.title}</span>
              <span className="text-xs opacity-70">
                {formatDistanceToNow(notification.timestamp, { addSuffix: false })}
              </span>
            </div>
            <p className="text-sm opacity-90">{notification.body}</p>
          </div>

          {/* Dismiss button */}
          <motion.button
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onDismiss()
            }}
          >
            <X size={14} />
          </motion.button>
        </div>
      </div>

      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
      )}
    </motion.div>
  )
}

function getAppIcon(appId: string): string {
  const icons: Record<string, string> = {
    messages: '💬',
    mail: '✉️',
    calendar: '📅',
    phone: '📞',
    weather: '🌤️',
    news: '📰',
    music: '🎵',
    reminders: '📝',
    photos: '🖼️',
  }
  return icons[appId] || '📱'
}
