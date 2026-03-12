'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Search, Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'

export default function Navigation() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { itemCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    router.push('/')
  }

  const navLinks = [
    { href: '/tech/store', label: 'Accessories Store' },
    { href: '/tech/courses', label: 'Course Marketplace' },
    { href: '/tech/student/dashboard', label: 'Student Dashboard' },
    { href: '/tech/instructor/dashboard', label: 'Instructor Dashboard' },
    { href: '/development', label: 'Development Services' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="container-fluid py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-display font-bold tracking-tight hover:opacity-70 transition-opacity">
            CHAKRAPHOP
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden md:block hover:opacity-70 transition-opacity focus-ring rounded-full p-1"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden md:block hover:opacity-70 transition-opacity focus-ring rounded-full p-1"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-body-sm font-medium">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-body-sm hover:bg-neutral-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-4 py-2 text-body-sm hover:bg-neutral-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-4 py-2 text-body-sm hover:bg-neutral-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Wishlist
                      </Link>
                      {['ADMIN', 'SUPER_ADMIN', 'INSTRUCTOR'].includes(user?.role) && (
                        <Link
                          href="/tech/instructor/dashboard"
                          className="block px-4 py-2 text-body-sm hover:bg-neutral-100 transition-colors border-t border-neutral-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Instructor Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-body-sm hover:bg-neutral-100 transition-colors border-t border-neutral-200 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="hidden md:block hover:opacity-70 transition-opacity focus-ring rounded-full p-1">
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative hover:opacity-70 transition-opacity focus-ring rounded-full p-1">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hover:opacity-70 transition-opacity focus-ring rounded-full p-1"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-6 animate-fade-in">
            <input
              type="search"
              placeholder="Search products or courses..."
              className="input w-full max-w-2xl"
              autoFocus
            />
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 animate-fade-in">
          <div className="container-fluid py-8">
            <div className="flex flex-col gap-6">
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-heading-sm text-neutral-900 hover:text-neutral-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* User Section */}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="text-heading-sm text-neutral-900 hover:text-neutral-600 transition-colors pt-6 border-t border-neutral-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-heading-sm text-neutral-900 hover:text-neutral-600 transition-colors text-left flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-heading-sm text-neutral-900 hover:text-neutral-600 transition-colors pt-6 border-t border-neutral-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
