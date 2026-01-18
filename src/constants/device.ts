// iPhone 15 Pro device specifications
export const DEVICE = {
  // Screen dimensions (logical pixels)
  width: 393,
  height: 852,

  // Physical frame
  frameWidth: 417,
  frameHeight: 876,
  frameBorderRadius: 55,
  frameBezelWidth: 12,

  // Screen border radius
  screenBorderRadius: 44,

  // Punch-hole camera dimensions
  punchHole: {
    size: 14,
    topOffset: 14,
  },

  // Status bar
  statusBar: {
    height: 54,
    paddingTop: 14,
    sidePadding: 24,
  },

  // Home indicator
  homeIndicator: {
    width: 134,
    height: 5,
    bottomOffset: 8,
    borderRadius: 2.5,
  },

  // App grid
  grid: {
    columns: 4,
    rows: 6,
    iconSize: 60,
    iconSpacing: 24,
    labelHeight: 20,
    topPadding: 90,
    sidePadding: 28,
  },

  // Dock
  dock: {
    height: 96,
    iconCount: 4,
    iconSize: 60,
    padding: 20,
    bottomOffset: 34,
    borderRadius: 36,
  },

  // Page dots
  pageDots: {
    size: 7,
    spacing: 8,
    bottomOffset: 16,
  },

  // Safe areas
  safeArea: {
    top: 59,
    bottom: 34,
    left: 0,
    right: 0,
  },
}

// Default wallpapers
export const DEFAULT_WALLPAPERS = {
  lockScreen: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  homeScreen: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
}

// Auto-lock delays (in milliseconds)
export const AUTO_LOCK_DELAYS = {
  never: 0,
  '30s': 30000,
  '1m': 60000,
  '2m': 120000,
  '3m': 180000,
  '4m': 240000,
  '5m': 300000,
}
