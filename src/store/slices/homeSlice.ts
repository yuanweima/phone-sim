import type { HomePageLayout, FolderDefinition } from '@/types'

export interface HomeSlice {
  // State
  homePages: HomePageLayout[]
  dockApps: string[]
  currentPage: number
  isEditMode: boolean

  // Actions
  setCurrentPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  toggleEditMode: () => void
  setEditMode: (enabled: boolean) => void
  moveAppToPage: (appId: string, targetPageIndex: number, targetGridIndex: number) => void
  moveAppToDock: (appId: string, dockIndex: number) => void
  createFolder: (appIds: string[], name: string, pageIndex: number, gridIndex: number) => void
  renameFolder: (folderId: string, name: string) => void
  removeFromFolder: (folderId: string, appId: string) => void
  setHomeLayout: (pages: HomePageLayout[], dock: string[]) => void
}

// Default home layout
const defaultHomePages: HomePageLayout[] = [
  {
    id: 'page-1',
    apps: [
      'messages', 'calendar', 'photos', 'camera',
      'weather', 'clock', 'maps', 'notes',
      'reminders', 'news', 'health', 'wallet',
      'settings', 'music', 'podcasts', 'tv',
      'books', 'appstore', 'fitness', 'translate',
      'calculator', 'compass', 'shortcuts', 'voice-memos',
    ],
  },
  {
    id: 'page-2',
    apps: [],
  },
]

const defaultDockApps = ['phone', 'safari', 'messages', 'music']

type SetState = (partial: Partial<HomeSlice> | ((state: HomeSlice) => Partial<HomeSlice>)) => void
type GetState = () => HomeSlice

export const createHomeSlice = (set: SetState, get: GetState): HomeSlice => ({
  // Initial state
  homePages: defaultHomePages,
  dockApps: defaultDockApps,
  currentPage: 0,
  isEditMode: false,

  // Actions
  setCurrentPage: (page) => {
    const state = get()
    const maxPage = state.homePages.length - 1
    set({ currentPage: Math.max(0, Math.min(maxPage, page)) })
  },

  nextPage: () => {
    const state = get()
    const maxPage = state.homePages.length - 1
    if (state.currentPage < maxPage) {
      set({ currentPage: state.currentPage + 1 })
    }
  },

  prevPage: () => {
    const state = get()
    if (state.currentPage > 0) {
      set({ currentPage: state.currentPage - 1 })
    }
  },

  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

  setEditMode: (enabled) => set({ isEditMode: enabled }),

  moveAppToPage: (appId, targetPageIndex, targetGridIndex) =>
    set((state) => {
      const newPages = state.homePages.map((page, pageIndex) => {
        // Remove app from current location
        const filteredApps = page.apps.filter((app: string | FolderDefinition) => {
          if (typeof app === 'string') return app !== appId
          return true
        })

        if (pageIndex === targetPageIndex) {
          // Insert app at target position
          const newApps = [...filteredApps]
          newApps.splice(targetGridIndex, 0, appId)
          return { ...page, apps: newApps }
        }

        return { ...page, apps: filteredApps }
      })

      // Also remove from dock if moving to grid
      const newDockApps = state.dockApps.filter((id) => id !== appId)

      return { homePages: newPages, dockApps: newDockApps }
    }),

  moveAppToDock: (appId, dockIndex) =>
    set((state) => {
      // Remove from pages
      const newPages = state.homePages.map((page) => ({
        ...page,
        apps: page.apps.filter((app: string | FolderDefinition) => {
          if (typeof app === 'string') return app !== appId
          return true
        }),
      }))

      // Remove from current dock position and add at new position
      const newDockApps = state.dockApps.filter((id) => id !== appId)
      newDockApps.splice(dockIndex, 0, appId)

      // Limit dock to 4 apps
      if (newDockApps.length > 4) {
        newDockApps.pop()
      }

      return { homePages: newPages, dockApps: newDockApps }
    }),

  createFolder: (appIds, name, pageIndex, gridIndex) =>
    set((state) => {
      const folder: FolderDefinition = {
        id: `folder-${Date.now()}`,
        name,
        apps: appIds,
      }

      const newPages = state.homePages.map((page, idx) => {
        if (idx !== pageIndex) {
          // Remove apps from other pages
          return {
            ...page,
            apps: page.apps.filter((app: string | FolderDefinition) => {
              if (typeof app === 'string') return !appIds.includes(app)
              return true
            }),
          }
        }

        // Create folder in target page
        const filteredApps = page.apps.filter((app: string | FolderDefinition) => {
          if (typeof app === 'string') return !appIds.includes(app)
          return true
        })
        const newApps = [...filteredApps]
        newApps.splice(gridIndex, 0, folder)
        return { ...page, apps: newApps }
      })

      return { homePages: newPages }
    }),

  renameFolder: (folderId, name) =>
    set((state) => ({
      homePages: state.homePages.map((page) => ({
        ...page,
        apps: page.apps.map((app: string | FolderDefinition) => {
          if (typeof app !== 'string' && app.id === folderId) {
            return { ...app, name }
          }
          return app
        }),
      })),
    })),

  removeFromFolder: (folderId, appId) =>
    set((state) => ({
      homePages: state.homePages.map((page) => ({
        ...page,
        apps: page.apps.map((app: string | FolderDefinition) => {
          if (typeof app !== 'string' && app.id === folderId) {
            return { ...app, apps: app.apps.filter((id: string) => id !== appId) }
          }
          return app
        }),
      })),
    })),

  setHomeLayout: (pages, dock) => set({ homePages: pages, dockApps: dock }),
})
