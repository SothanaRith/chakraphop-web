/**
 * ErrorState Component
 * Universal error state component for handling failures gracefully
 * Provides clear messaging and recovery actions
 */

import { AlertCircle, RefreshCw } from 'lucide-react'

export default function ErrorState({ 
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  action = "Try Again",
  onRetry,
  showIcon = true
}) {
  return (
    <div className="text-center py-16 px-6">
      {/* Icon */}
      {showIcon && (
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-heading-lg font-medium mb-3">
        {title}
      </h3>

      {/* Message */}
      <p className="text-body text-neutral-600 max-w-md mx-auto mb-8">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button 
          onClick={onRetry}
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {action}
        </button>
      )}
    </div>
  )
}
