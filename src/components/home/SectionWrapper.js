/**
 * SectionWrapper - Reusable section container
 * Provides consistent spacing, background colors, and responsive container
 */

export default function SectionWrapper({
  children,
  id = '',
  bgColor = 'bg-white',
  spacing = 'py-24 md:py-32 lg:py-40',
  className = '',
  withContainer = true,
}) {
  const content = withContainer ? (
    <div className="container-section">
      {children}
    </div>
  ) : (
    children
  )

  return (
    <section id={id} className={`${bgColor} ${spacing} ${className}`}>
      {content}
    </section>
  )
}
