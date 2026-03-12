'use client'

/**
 * LoadingButton Component
 * Button with integrated loading state
 * Provides clear visual feedback for async actions
 */

import { Loader2 } from 'lucide-react'

export default function LoadingButton({ 
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses = 'btn relative'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  )
}
