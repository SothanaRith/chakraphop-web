import apiClient from './client'

const unwrapData = (response) => response?.data ?? response

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    const data = unwrapData(response)
    return {
      ...data,
      token: data?.accessToken || data?.token,
    }
  },

  // Login with email/password
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials)
    const data = unwrapData(response)
    return {
      ...data,
      token: data?.accessToken || data?.token,
    }
  },

  // Logout
  logout: async () => {
    return await apiClient.post('/auth/logout')
  },

  // Google OAuth
  googleAuth: async (code) => {
    return await apiClient.post('/auth/google', { code })
  },

  // Send OTP
  sendOTP: async (phoneNumber) => {
    return await apiClient.post('/auth/otp/send', { phoneNumber })
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otp) => {
    return await apiClient.post('/auth/otp/verify', { phoneNumber, otp })
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await apiClient.post('/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return await apiClient.post('/auth/reset-password', { token, newPassword })
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/me')
    return unwrapData(response)
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken })
    return unwrapData(response)
  },
}
