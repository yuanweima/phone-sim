// iOS Color Palette
export const iosColors = {
  // System colors
  blue: '#007AFF',
  green: '#34C759',
  indigo: '#5856D6',
  orange: '#FF9500',
  pink: '#FF2D55',
  purple: '#AF52DE',
  red: '#FF3B30',
  teal: '#5AC8FA',
  yellow: '#FFCC00',

  // Gray scale
  gray: {
    1: '#8E8E93',
    2: '#AEAEB2',
    3: '#C7C7CC',
    4: '#D1D1D6',
    5: '#E5E5EA',
    6: '#F2F2F7',
  },

  // Light mode
  light: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F2F2F7',
      tertiary: '#FFFFFF',
      grouped: '#F2F2F7',
    },
    text: {
      primary: '#000000',
      secondary: '#3C3C43',
      tertiary: '#3C3C43',
      quaternary: '#3C3C43',
    },
    separator: '#3C3C43',
    fill: {
      primary: '#787880',
      secondary: '#787880',
      tertiary: '#767680',
      quaternary: '#747480',
    },
  },

  // Dark mode
  dark: {
    background: {
      primary: '#000000',
      secondary: '#1C1C1E',
      tertiary: '#2C2C2E',
      grouped: '#000000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      tertiary: '#EBEBF5',
      quaternary: '#EBEBF5',
    },
    separator: '#38383A',
    fill: {
      primary: '#787880',
      secondary: '#787880',
      tertiary: '#767680',
      quaternary: '#747480',
    },
  },
}

// iOS Typography
export const iosTypography = {
  largeTitle: {
    fontSize: '34px',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.4px',
  },
  title1: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.4px',
  },
  title2: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.4px',
  },
  title3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: '-0.4px',
  },
  headline: {
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.4px',
  },
  body: {
    fontSize: '17px',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '-0.4px',
  },
  callout: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '-0.4px',
  },
  subheadline: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '-0.4px',
  },
  footnote: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '-0.4px',
  },
  caption1: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: 0,
  },
}

// App icon background colors
export const appIconColors: Record<string, string> = {
  phone: '#34C759',
  messages: '#34C759',
  safari: '#007AFF',
  mail: '#007AFF',
  music: '#FF2D55',
  photos: 'linear-gradient(180deg, #FF9500 0%, #FF2D55 50%, #AF52DE 100%)',
  camera: '#8E8E93',
  maps: 'linear-gradient(180deg, #34C759 0%, #007AFF 100%)',
  weather: '#5AC8FA',
  clock: '#000000',
  settings: '#8E8E93',
  calculator: '#000000',
  notes: '#FFCC00',
  calendar: '#FF3B30',
  appStore: '#007AFF',
  health: '#FF2D55',
  wallet: '#000000',
  files: '#007AFF',
  facetime: '#34C759',
  contacts: 'linear-gradient(180deg, #C7C7CC 0%, #8E8E93 100%)',
}
