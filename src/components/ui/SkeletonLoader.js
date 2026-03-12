/**
 * SkeletonLoader Component
 * Universal skeleton loading states for async content
 * Prevents layout shift and provides visual feedback
 */

export default function SkeletonLoader({ type = 'default', count = 1, className = '' }) {
  const skeletons = Array.from({ length: count })

  // Product Card Skeleton
  if (type === 'product-card') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-neutral-200 rounded mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  // Product Grid Skeleton
  if (type === 'product-grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-neutral-200 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-5 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              <div className="flex gap-2 mt-3">
                <div className="h-6 w-6 bg-neutral-200 rounded-full"></div>
                <div className="h-6 w-6 bg-neutral-200 rounded-full"></div>
                <div className="h-6 w-6 bg-neutral-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Blog Post Card Skeleton
  if (type === 'blog-card') {
    return (
      <div className={`grid md:grid-cols-2 gap-12 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-neutral-200 rounded-lg mb-6"></div>
            <div className="h-3 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-neutral-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  // Cart Item Skeleton
  if (type === 'cart-item') {
    return (
      <div className={`space-y-4 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="bg-white rounded p-6 flex gap-6 animate-pulse">
            <div className="w-32 h-32 bg-neutral-200 rounded flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-neutral-200 rounded w-2/3"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
              <div className="h-10 bg-neutral-200 rounded w-32 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // List Skeleton
  if (type === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-12 bg-neutral-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  // Text Block Skeleton
  if (type === 'text') {
    return (
      <div className={`space-y-2 animate-pulse ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="h-4 bg-neutral-200 rounded"></div>
        ))}
      </div>
    )
  }

  // Default Skeleton
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-24 bg-neutral-200 rounded"></div>
    </div>
  )
}
