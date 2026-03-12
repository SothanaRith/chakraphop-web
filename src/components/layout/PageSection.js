'use client'

export default function PageSection({ 
  children, 
  className = '',
  title,
  subtitle
}) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container-fluid">
        {title && (
          <div className="mb-12">
            <h2 className="font-display text-display-md md:text-display-lg font-bold tracking-tight mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-heading-md text-neutral-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
