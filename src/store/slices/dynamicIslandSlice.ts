import type { DynamicIslandContent } from '@/types'

export interface DynamicIslandSlice {
  // State
  isDynamicIslandExpanded: boolean
  dynamicIslandContent: DynamicIslandContent | null

  // Actions
  expandDynamicIsland: () => void
  collapseDynamicIsland: () => void
  toggleDynamicIsland: () => void
  setDynamicIslandContent: (content: DynamicIslandContent | null) => void
  showMusicPlayer: (title: string, artist: string) => void
  showTimer: (timeLeft: string) => void
  showCall: (callerName: string) => void
  clearDynamicIsland: () => void
}

type SetState = (partial: Partial<DynamicIslandSlice> | ((state: DynamicIslandSlice) => Partial<DynamicIslandSlice>)) => void

export const createDynamicIslandSlice = (set: SetState): DynamicIslandSlice => ({
  // Initial state
  isDynamicIslandExpanded: false,
  dynamicIslandContent: null,

  // Actions
  expandDynamicIsland: () => set({ isDynamicIslandExpanded: true }),
  collapseDynamicIsland: () => set({ isDynamicIslandExpanded: false }),
  toggleDynamicIsland: () => set((state) => ({ isDynamicIslandExpanded: !state.isDynamicIslandExpanded })),

  setDynamicIslandContent: (content) => set({ dynamicIslandContent: content }),

  showMusicPlayer: (_title, _artist) =>
    set({
      dynamicIslandContent: {
        id: `music-${Date.now()}`,
        type: 'music',
        render: () => null, // Will be rendered by DynamicIsland component
      },
      isDynamicIslandExpanded: false,
    }),

  showTimer: (_timeLeft) =>
    set({
      dynamicIslandContent: {
        id: `timer-${Date.now()}`,
        type: 'timer',
        render: () => null,
      },
      isDynamicIslandExpanded: false,
    }),

  showCall: (_callerName) =>
    set({
      dynamicIslandContent: {
        id: `call-${Date.now()}`,
        type: 'call',
        render: () => null,
      },
      isDynamicIslandExpanded: true, // Calls expand by default
    }),

  clearDynamicIsland: () =>
    set({
      dynamicIslandContent: null,
      isDynamicIslandExpanded: false,
    }),
})
