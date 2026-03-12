'use client'

/**
 * Input Component
 * Universal form input with validation feedback
 * Consistent styling and error handling across all forms
 */

import { useState } from 'react'
import { AlertCircle, Check } from 'lucide-react'

export default function Input({ 
  label,
  error,
  hint,
  success,
  required = false,
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={wrapperClassName}>
      {/* Label */}
      {label && (
        <label className="block text-body font-medium mb-2">
          {label}
          {required && <span className="text-accent-primary ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="w-5 h-5 text-neutral-400" />
          </div>
        )}

        <input
          className={`
            w-full px-4 py-3 rounded-lg border transition-all
            ${Icon ? 'pl-11' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
              : success
                ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                : 'border-neutral-300 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100'
            }
            disabled:bg-neutral-50 disabled:cursor-not-allowed
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Success Icon */}
        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="w-5 h-5 text-green-600" />
          </div>
        )}

        {/* Error Icon */}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Hint Text */}
      {hint && !error && !success && (
        <p className="mt-2 text-body-sm text-neutral-500">
          {hint}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-body-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && !error && (
        <p className="mt-2 text-body-sm text-green-600 flex items-center gap-1">
          <Check className="w-4 h-4" />
          {success}
        </p>
      )}
    </div>
  )
}
