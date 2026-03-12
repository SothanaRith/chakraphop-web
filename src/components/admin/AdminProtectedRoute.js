'use client'

import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AdminProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, loading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/auth/login')
    }

    if (!loading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push('/admin/access-denied')
    }
  }, [isAuthenticated, loading, requiredRole, user, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return children
}
