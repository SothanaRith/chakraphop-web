'use client'

import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useEffect } from 'react'

export default function AdminLogoutPage() {
  const { logout } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      await logout()
      router.push('/admin/auth/login')
    }

    handleLogout()
  }, [logout, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  )
}
