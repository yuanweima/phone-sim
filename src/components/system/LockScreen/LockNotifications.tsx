import { motion, AnimatePresence } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { formatDistanceToNow } from 'date-fns'

export function LockNotifications() {
  const notifications = usePhoneStore((state) => state.notifications)
  const unreadNotifications = notifications.filter((n) => !n.read).slice(0, 3)

  if (unreadNotifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-white/50">
        No notifications
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {unreadNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              {/* App icon placeholder */}
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-lg">
                {getAppIcon(notification.appId)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{notification.title}</span>
                  <span className="text-xs opacity-70">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: false })}
                  </span>
                </div>
                <p className="text-sm opacity-90 truncate">{notification.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
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
  }
  return icons[appId] || '📱'
}
