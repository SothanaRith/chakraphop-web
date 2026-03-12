'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    setEntered(false)

    const raf = requestAnimationFrame(() => {
      setEntered(true)
    })

    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return (
    <div
      className={`route-transition ${entered ? 'route-transition-entered' : ''}`}
      key={pathname}
    >
      {children}
    </div>
  )
}
