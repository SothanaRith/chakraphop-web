/**
 * Badge Component
 * Universal badge/tag component for labels and status indicators
 * Used across product cards, filters, and status displays
 */

export default function Badge({ 
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-900',
    primary: 'bg-accent-primary text-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    outline: 'border border-neutral-300 text-neutral-700'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-caption',
    md: 'px-3 py-1 text-body-sm',
    lg: 'px-4 py-1.5 text-body'
  }

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {children}
    </span>
  )
}
