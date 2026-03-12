import adminApiClient from './client'

const unwrapData = (response) => response?.data ?? response

export const adminAuthService = {
  // Admin login
  login: async (credentials) => {
    const response = await adminApiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    })

    const data = unwrapData(response)
    return {
      ...data,
      token: data?.accessToken || data?.token,
    }
  },

  // Admin logout
  logout: async () => {
    try {
      await adminApiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  // Get current admin profile
  getProfile: async () => {
    const response = await adminApiClient.get('/auth/me')
    return unwrapData(response)
  },

  // Verify admin session
  verifySession: async () => {
    const response = await adminApiClient.get('/auth/me')
    return unwrapData(response)
  },
}
