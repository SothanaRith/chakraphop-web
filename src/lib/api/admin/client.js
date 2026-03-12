import axios from 'axios'

// Admin API uses same base as v1 API, but /admin/* routes
const ADMIN_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

// Create axios instance for admin API
const adminApiClient = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Request interceptor - Add auth token
adminApiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
adminApiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      // Handle specific status codes
      if (status === 401) {
        // Unauthorized - clear token and redirect to admin login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUser')
          window.location.href = '/admin/auth/login'
        }
      } else if (status === 403) {
        // Forbidden - insufficient permissions
        console.error('Access forbidden:', data.message)
      } else if (status === 404) {
        // Not found
        console.error('Resource not found:', data.message)
      } else if (status === 500) {
        // Server error
        console.error('Server error:', data.message)
      }

      return Promise.reject({
        message: data.message || 'An error occurred',
        status,
        errors: data.errors || [],
        data: data.data || null,
      })
    } else if (error.request) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      })
    } else {
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      })
    }
  }
)

export default adminApiClient
