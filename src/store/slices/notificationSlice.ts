import type { Notification } from '@/types'

export interface NotificationSlice {
  // State
  notifications: Notification[]
  isNotificationCenterOpen: boolean

  // Actions
  openNotificationCenter: () => void
  closeNotificationCenter: () => void
  toggleNotificationCenter: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  clearAppNotifications: (appId: string) => void
}

type SetState = (partial: Partial<NotificationSlice> | ((state: NotificationSlice) => Partial<NotificationSlice>)) => void

export const createNotificationSlice = (set: SetState): NotificationSlice => ({
  // Initial state - some demo notifications
  notifications: [
    {
      id: 'notif-1',
      appId: 'messages',
      title: 'Messages',
      body: 'John: Hey, are you free tonight?',
      timestamp: Date.now() - 300000, // 5 minutes ago
      read: false,
    },
    {
      id: 'notif-2',
      appId: 'calendar',
      title: 'Calendar',
      body: 'Meeting with team in 30 minutes',
      timestamp: Date.now() - 600000, // 10 minutes ago
      read: false,
    },
    {
      id: 'notif-3',
      appId: 'mail',
      title: 'Mail',
      body: 'You have 3 new emails',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      read: true,
    },
  ],
  isNotificationCenterOpen: false,

  // Actions
  openNotificationCenter: () => set({ isNotificationCenterOpen: true }),
  closeNotificationCenter: () => set({ isNotificationCenterOpen: false }),
  toggleNotificationCenter: () => set((state) => ({ isNotificationCenterOpen: !state.isNotificationCenterOpen })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: `notif-${Date.now()}`,
          timestamp: Date.now(),
          read: false,
        },
        ...state.notifications,
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearAll: () => set({ notifications: [] }),

  clearAppNotifications: (appId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.appId !== appId),
    })),
})
