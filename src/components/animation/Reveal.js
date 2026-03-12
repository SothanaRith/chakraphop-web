'use client'

import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.18,
  once = true,
  variant = 'up',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, threshold])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${variant === 'mask' ? 'reveal-mask' : ''} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
