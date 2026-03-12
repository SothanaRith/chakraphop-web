'use client'

import { motion } from 'framer-motion'
import React from 'react'

// 1. FadeIn - Simple opacity animation
export const FadeIn = ({ children, delay = 0, duration = 0.2 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration,
      delay,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 2. SlideUp - Slide up with fade
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.2,
  distance = 20,
}) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: distance }}
    transition={{
      duration,
      delay,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 3. SlideDown - Slide down with fade
export const SlideDown = ({
  children,
  delay = 0,
  duration = 0.2,
  distance = 20,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -distance }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -distance }}
    transition={{
      duration,
      delay,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 4. SlideLeft - Slide from right
export const SlideLeft = ({
  children,
  delay = 0,
  duration = 0.2,
  distance = 20,
}) => (
  <motion.div
    initial={{ opacity: 0, x: distance }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: distance }}
    transition={{
      duration,
      delay,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 5. SlideRight - Slide from left
export const SlideRight = ({
  children,
  delay = 0,
  duration = 0.2,
  distance = 20,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -distance }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -distance }}
    transition={{
      duration,
      delay,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 6. Scale - Zoom in
export const Scale = ({
  children,
  delay = 0,
  duration = 0.2,
  scale = 0.95,
}) => (
  <motion.div
    initial={{ opacity: 0, scale }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale }}
    transition={{
      duration,
      delay,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 7. Stagger - Container for staggered child animations
export const Stagger = ({
  children,
  staggerDelay = 0.05,
  initialDelay = 0,
}) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: initialDelay,
        },
      },
    }}
  >
    {children}
  </motion.div>
)

// 8. StaggerItem - Child of Stagger
export const StaggerItem = ({ children, distance = 20 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: distance },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: [0.12, 0.4, 0.29, 0.95],
        },
      },
    }}
  >
    {children}
  </motion.div>
)

// 9. HoverScale - Card/button hover scale
export const HoverScale = ({
  children,
  scale = 1.02,
  className = '',
}) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.98 }}
    transition={{
      duration: 0.15,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// 10. Pulse - Pulsing animation (loading states)
export const Pulse = ({ children, duration = 1 }) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{
      duration,
      ease: 'linear',
      repeat: Infinity,
    }}
  >
    {children}
  </motion.div>
)

// 11. Shake - Shake animation (error states)
export const Shake = ({ children, onComplete }) => (
  <motion.div
    animate={{ x: [-10, 10, -10, 10, 0] }}
    transition={{
      duration: 0.3,
      ease: 'easeInOut',
    }}
    onAnimationComplete={onComplete}
  >
    {children}
  </motion.div>
)

// 12. Bounce - Bounce animation
export const Bounce = ({ children, onComplete }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 0.3,
      ease: 'easeOut',
    }}
    onAnimationComplete={onComplete}
  >
    {children}
  </motion.div>
)

// 13. Rotate - Spinning animation (loading)
export const Rotate = ({ children, duration = 1 }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration,
      ease: 'linear',
      repeat: Infinity,
    }}
  >
    {children}
  </motion.div>
)

// 14. PageTransition - Full page fade + slide
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{
      duration: 0.2,
      ease: [0.12, 0.4, 0.29, 0.95],
    }}
  >
    {children}
  </motion.div>
)

// 15. ScrollReveal - Reveal on scroll into view
export const ScrollReveal = ({ children, threshold = 0.1 }) => {
  const ref = React.useRef(null)
  const [isInView, setIsInView] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.3,
        ease: [0.12, 0.4, 0.29, 0.95],
      }}
    >
      {children}
    </motion.div>
  )
}

// 16. CountUp - Animate number from 0 to target
export const CountUp = ({ from = 0, to, duration = 1 }) => {
  const nodeRef = React.useRef()

  React.useEffect(() => {
    const controls = new Proxy(
      { value: from },
      {
        set: (target, key, value) => {
          target[key] = value
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value)
          }
          return true
        },
      }
    )

    const animate = async () => {
      const start = Date.now()
      const handler = () => {
        const progress = (Date.now() - start) / (duration * 1000)
        if (progress < 1) {
          controls.value = from + (to - from) * progress
          requestAnimationFrame(handler)
        } else {
          controls.value = to
        }
      }
      requestAnimationFrame(handler)
    }

    animate()
  }, [from, to, duration])

  return <span ref={nodeRef}>{from}</span>
}
