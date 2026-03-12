import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { AdminAuthProvider } from '@/contexts/AdminAuthContext'
import { CartProvider } from '@/contexts/CartContext'
import PageTransition from '@/components/animation/PageTransition'

export const metadata = {
  title: 'Chakraphop - Accessories Store and Coding Academy',
  description: 'Premium gear and intensive education for developers',
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
