/**
 * PageWrapper Component
 * Universal page wrapper for consistent layout and spacing
 * Ensures all pages feel unified as one flagship product
 */

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function PageWrapper({ 
  children,
  className = '',
  showNav = true,
  showFooter = true,
  fullWidth = false
}) {
  return (
    <>
      {showNav && <Navigation />}
      <main className={`min-h-screen ${showNav ? 'pt-32' : ''} ${className}`}>
        {fullWidth ? children : (
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        )}
      </main>
      {showFooter && <Footer />}
    </>
  )
}
