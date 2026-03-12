'use client'

import { useState } from 'react'

export default function LazyFadeImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover media-fade-in ${loaded ? 'loaded' : ''}`}
      />
    </div>
  )
}
