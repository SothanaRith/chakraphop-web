'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

export function AdminSidebar({ isOpen, onClose }) {
  const { user, logout } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
    router.push('/admin/auth/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊',
      permission: 'VIEW_DASHBOARD',
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: '📦',
      permission: 'VIEW_ORDERS',
    },
    {
      label: 'Inventory',
      href: '/admin/inventory',
      icon: '📦',
      permission: 'VIEW_INVENTORY',
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: '🏷️',
      permission: 'VIEW_PRODUCTS',
    },
    {
      label: 'Accessory Sets',
      href: '/admin/accessory-sets',
      icon: '🧩',
      permission: 'VIEW_ACCESSORY_SETS',
    },
    {
      label: 'Courses',
      href: '/admin/courses',
      icon: '🎓',
      permission: 'VIEW_COURSES',
    },
    {
      label: 'Lessons',
      href: '/admin/lessons',
      icon: '📚',
      permission: 'MANAGE_COURSE_CONTENT',
    },
    {
      label: 'Instructors',
      href: '/admin/instructors',
      icon: '🧑‍🏫',
      permission: 'VIEW_USERS',
      roleRequired: 'ADMIN',
    },
    {
      label: 'Enrollments',
      href: '/admin/enrollments',
      icon: '✅',
      permission: 'VIEW_COURSES',
    },
    {
      label: 'Media',
      href: '/admin/media',
      icon: '🖼️',
      permission: 'EDIT_PRODUCTS',
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: '👥',
      permission: 'VIEW_USERS',
      roleRequired: 'ADMIN',
    },
    {
      label: 'Audit Logs',
      href: '/admin/audit',
      icon: '📋',
      permission: 'VIEW_AUDIT',
      roleRequired: 'ADMIN',
    },
  ]

  const visibleItems = navItems.filter((item) => {
    if (user?.role === 'SUPER_ADMIN') return true
    if (user?.role === 'INSTRUCTOR') {
      return item.href === '/admin/dashboard' || item.href === '/admin/courses'
    }
    if (item.roleRequired && user?.role !== item.roleRequired) return false
    return true
  })

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform md:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {visibleItems.map((item) => (
                <li key={item.href}>
                  {(() => {
                    const active = pathname === item.href || pathname?.startsWith(`${item.href}/`)

                    return (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded transition ${
                      active
                        ? 'bg-gray-100 text-gray-900 font-semibold'
                        : 'text-white hover:bg-gray-800'
                    }`}
                    onClick={onClose}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                    )
                  })()}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export function AdminTopBar({ onMenuClick }) {
  const { user } = useAdminAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Menu button for mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          ☰
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-900 flex-1 md:flex-none"></h1>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
          >
            <span className="text-sm">{user?.email}</span>
            <span className="text-lg">▼</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-gray-200">
              <div className="p-3 border-b border-gray-200 text-sm text-gray-600">
                <p>Role: {user?.role}</p>
              </div>
              <button
                onClick={() => router.push('/admin/profile')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm"
              >
                Profile
              </button>
              <button
                onClick={() => router.push('/admin/auth/logout')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
