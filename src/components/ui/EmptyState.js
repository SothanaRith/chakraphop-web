/**
 * EmptyState Component
 * Universal empty state component used across all pages
 * Provides consistent, helpful messaging when content is empty
 */

import Link from 'next/link'

export default function EmptyState({ 
  icon: Icon,
  title,
  description,
  cta,
  href,
  secondaryCta,
  secondaryHref,
  onAction
}) {
  return (
    <div className="text-center py-16 px-6">
      {/* Icon */}
      {Icon && (
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
            <Icon className="w-10 h-10 text-neutral-400" />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-heading-lg font-medium mb-3">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-body text-neutral-600 max-w-md mx-auto mb-8">
          {description}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {cta && href && (
          <Link href={href} className="btn btn-primary">
            {cta}
          </Link>
        )}
        
        {cta && onAction && (
          <button onClick={onAction} className="btn btn-primary">
            {cta}
          </button>
        )}

        {secondaryCta && secondaryHref && (
          <Link href={secondaryHref} className="btn btn-ghost">
            {secondaryCta}
          </Link>
        )}
      </div>
    </div>
  )
}
