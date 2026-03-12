'use client'

import React from 'react'

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

// Hook for scroll-triggered animations
export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: options.threshold || 0.1 })

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}

// Hook to get safe animation config based on motion preference
export function useSafeAnimation(animation) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (!prefersReducedMotion) return animation

  // Return instant animation (no transition)
  return {
    ...animation,
    transition: { duration: 0 },
  }
}

// Hook for debouncing animation states
export function useAnimationDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

// Hook for tracking element size changes
export function useAnimationSize(ref) {
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return size
}
