'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { adminAuthService } from '@/lib/api/admin'

const AdminAuthContext = createContext({})

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if admin is logged in on mount
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
      if (token) {
        const userData = await adminAuthService.getProfile()
        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      // Token invalid or expired
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
      }
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setError(null)
      const data = await adminAuthService.login(credentials)

      // Store token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', data.accessToken)
        localStorage.setItem('adminUser', JSON.stringify(data.user))
      }

      setUser(data.user)
      setIsAuthenticated(true)
      return data
    } catch (err) {
      setError(err.message || 'Login failed')
      throw err
    }
  }

  const logout = async () => {
    try {
      await adminAuthService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
      }
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!user) return false
    if (user.role === 'SUPER_ADMIN') return true // Super admin has all access
    return user.role === requiredRole
  }

  // Check if user can perform action (role-based)
  const canPerform = (action) => {
    if (!user) return false
    if (user.role === 'SUPER_ADMIN') return true

    const rolePermissions = {
      ADMIN: [
        'VIEW_DASHBOARD',
        'VIEW_ORDERS',
        'VIEW_PRODUCTS',
        'VIEW_INVENTORY',
        'EDIT_PRODUCTS',
        'ADJUST_INVENTORY',
        'UPDATE_ORDER_STATUS',
        'CREATE_NOTES',
        'VIEW_USERS',
        'VIEW_COURSES',
        'MANAGE_COURSES',
        'MANAGE_COURSE_CONTENT',
        'VIEW_ACCESSORY_SETS',
        'MANAGE_ACCESSORY_SETS',
      ],
      INVENTORY_MANAGER: [
        'VIEW_DASHBOARD',
        'VIEW_PRODUCTS',
        'VIEW_INVENTORY',
        'ADJUST_INVENTORY',
        'VIEW_ACCESSORY_SETS',
        'MANAGE_ACCESSORY_SETS',
      ],
      INSTRUCTOR: [
        'VIEW_DASHBOARD',
        'VIEW_COURSES',
        'MANAGE_COURSES',
        'MANAGE_COURSE_CONTENT',
      ],
      STAFF: ['VIEW_DASHBOARD', 'VIEW_ORDERS', 'VIEW_PRODUCTS', 'VIEW_INVENTORY', 'CREATE_NOTES'],
    }

    return rolePermissions[user.role]?.includes(action) || false
  }

  const updateUser = (userData) => {
    setUser(userData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminUser', JSON.stringify(userData))
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        error,
        login,
        logout,
        hasRole,
        canPerform,
        updateUser,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
