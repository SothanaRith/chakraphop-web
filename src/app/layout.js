import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { AdminAuthProvider } from '@/contexts/AdminAuthContext'
import { CartProvider } from '@/contexts/CartContext'
import PageTransition from '@/components/animation/PageTransition'

export const metadata = {
  title: 'TechForge - Accessories Store and Coding Academy',
  description: 'Shop desktop setup accessories and learn programming through modern online courses.',
  keywords: ['desktop accessories', 'programming courses', 'tech ecommerce', 'coding academy'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen">
        <AuthProvider>
          <AdminAuthProvider>
            <CartProvider>
              <PageTransition>{children}</PageTransition>
            </CartProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
