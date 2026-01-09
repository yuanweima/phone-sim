// iOS-style spring configurations for Framer Motion
export const iosSpring = {
  // Standard iOS spring for most animations
  default: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  },

  // Bouncy spring for playful interactions
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },

  // Stiff spring for quick snaps
  snappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },

  // Soft spring for large movements
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1.2,
  },

  // Very responsive for small UI elements
  responsive: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 40,
    mass: 0.3,
  },
}

// Timing configurations
export const iosTiming = {
  // Quick fade
  fade: {
    duration: 0.2,
    ease: [0.32, 0.72, 0, 1],
  },

  // Standard transition
  standard: {
    duration: 0.35,
    ease: [0.32, 0.72, 0, 1],
  },

  // Slow, deliberate transition
  slow: {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  },

  // App launch timing
  appLaunch: {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  },
}

// Animation variants
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUpVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
}

export const slideDownVariants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
}

export const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
}
