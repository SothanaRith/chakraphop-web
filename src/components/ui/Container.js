export default function Container({ children, variant = 'section', className = '' }) {
  const variants = {
    fluid: 'container-fluid',
    section: 'container-section',
    narrow: 'container-narrow',
  }

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}
