'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export function useRequireAuth(requireAdmin = false) {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/login')
      } else if (requireAdmin && user?.role !== 'admin') {
        router.push('/')
      }
    }
  }, [isAuthenticated, loading, user, requireAdmin, router])

  return { user, isAuthenticated, loading }
}
