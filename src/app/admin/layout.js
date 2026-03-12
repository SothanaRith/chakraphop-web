'use client'

import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute'

export default function AdminPageLayout({ children }) {
  return (
    <AdminProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </AdminProtectedRoute>
  )
}
