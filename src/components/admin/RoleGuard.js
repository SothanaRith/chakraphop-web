'use client'

import { useAdminAuth } from '@/contexts/AdminAuthContext'

export function RoleGuard({ children, requiredRole = null, requiredPermission = null }) {
  const { user, hasRole, canPerform } = useAdminAuth()

  if (!user) return null

  // Check role if specified
  if (requiredRole && !hasRole(requiredRole)) {
    return null
  }

  // Check permission if specified
  if (requiredPermission && !canPerform(requiredPermission)) {
    return null
  }

  return children
}
