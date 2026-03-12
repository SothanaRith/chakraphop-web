'use client'

import { usePathname } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute'

export default function AdminPageLayout({ children }) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/admin/auth')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <AdminProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </AdminProtectedRoute>
  )
}
