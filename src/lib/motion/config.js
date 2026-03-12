// Motion tokens and configuration
// Centralized motion design system

export const MOTION = {
  // Durations
  DURATIONS: {
    MICRO: 0.1,        // 100ms - instant feedback
    FAST: 0.15,        // 150ms - hover, quick interactions
    SHORT: 0.2,        // 200ms - fade, most animations
    MEDIUM: 0.3,       // 300ms - emphasis, hero content
    SLOW: 0.5,         // 500ms - rarely used
  },

  // Easings
  EASING: {
    // Out: Fast start, smooth deceleration (most premium)
    OUT: [0.12, 0.4, 0.29, 0.95],
    // In: Smooth start, fast end (good for exits)
    IN: [0.32, 0, 0.67, 0],
    // In-Out: Smooth both ends
    IN_OUT: [0.25, 0.46, 0.45, 0.94],
    // Linear: Constant speed
    LINEAR: [0, 0, 1, 1],
  },

  // Animation presets
  ANIMATIONS: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },

    fadeOut: {
      initial: { opacity: 1 },
      animate: { opacity: 0 },
      transition: {
        duration: 0.15,
        ease: [0.32, 0, 0.67, 0],
      },
    },

    slideUpFadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: {
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },

    slideDownFadeIn: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: {
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },

    slideLeftFadeIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: {
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },

    slideRightFadeIn: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: {
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },

    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: {
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },

    pulse: {
      animate: { opacity: [0.5, 1, 0.5] },
      transition: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity,
      },
    },

    shake: {
      animate: { x: [-10, 10, -10, 10, 0] },
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },

    bounce: {
      animate: { y: [0, -10, 0] },
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },

  // Stagger configuration
  STAGGER: {
    // For lists and grids
    CONTAINER: {
      staggerChildren: 0.05,  // 50ms delay between children
      delayChildren: 0.1,     // Wait before starting first child
    },
    // Tighter stagger (product grid)
    TIGHT: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
    // Looser stagger (hero sections)
    LOOSE: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },

  // Variants for common components
  VARIANTS: {
    // Container that staggers children
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1,
        },
      },
    },

    // Child item in staggered list
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
    },

    // Hero title
    heroTitle: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
    },

    // Hero description
    heroDescription: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 0.1,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
    },

    // CTA button
    heroCTA: {
      hidden: { opacity: 0, scale: 0.95 },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          delay: 0.2,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
    },

    // Card hover
    card: {
      rest: { scale: 1 },
      hover: {
        scale: 1.02,
        transition: {
          duration: 0.15,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
      tap: {
        scale: 0.98,
      },
    },

    // Button hover
    button: {
      rest: { scale: 1 },
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.15,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
      tap: {
        scale: 0.95,
      },
    },
  },
}

// Hook to check if user prefers reduced motion
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Utility to get safe animation config based on motion preference
export function getSafeAnimation(animation, prefersReducedMotion) {
  if (!prefersReducedMotion) return animation

  // For reduced motion: instant fade only
  return {
    ...animation,
    transition: { duration: 0 },
  }
}

// Utility to create staggered delays
export function createStaggerDelay(index, baseDelay = 0, interval = 0.05) {
  return baseDelay + index * interval
}

// Export for convenience
export default MOTION
