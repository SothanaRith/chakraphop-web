'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/lib/api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = await authService.getProfile()
        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      // Token invalid or expired
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const data = await authService.login(credentials)
    const token = data?.accessToken || data?.token
    if (!token) {
      throw new Error('Login failed: missing access token')
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
    setIsAuthenticated(true)
    return data
  }

  const register = async (userData) => {
    const data = await authService.register(userData)
    const token = data?.accessToken || data?.token
    if (!token) {
      throw new Error('Registration failed: missing access token')
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
    setIsAuthenticated(true)
    return data
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
