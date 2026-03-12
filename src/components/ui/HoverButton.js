'use client'

import { useState } from 'react'

export default function HoverButton({ href, children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      className={`inline-block px-8 py-4 text-body font-medium text-white transition-all ${className}`}
      style={{ backgroundColor: isHovered ? 'var(--color-accent-hover)' : 'var(--color-accent-primary)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  )
}
