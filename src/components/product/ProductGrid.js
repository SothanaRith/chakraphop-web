'use client'

export default function ProductGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  )
}
