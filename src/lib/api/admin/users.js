import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminUsersService = {
  // Get users list
  getUsers: async (params = {}) => {
    const response = await adminApiClient.get('/admin/users', { params })
    return unwrap(response)
  },

  // Get user detail
  getUser: async (userId) => {
    const response = await adminApiClient.get(`/admin/users/${userId}`)
    return unwrap(response)
  },

  // Create admin user
  createUser: async (userData) => {
    const response = await adminApiClient.post('/admin/users', userData)
    return unwrap(response)
  },

  // Update admin user
  updateUser: async (userId, userData) => {
    const response = await adminApiClient.patch(`/admin/users/${userId}`, userData)
    return unwrap(response)
  },

  // Activate user
  activateUser: async (userId) => {
    const response = await adminApiClient.post(`/admin/users/${userId}/enable`)
    return unwrap(response)
  },

  // Deactivate user
  deactivateUser: async (userId) => {
    const response = await adminApiClient.post(`/admin/users/${userId}/disable`)
    return unwrap(response)
  },

  // Update user role
  updateUserRole: async (userId, roleData) => {
    const response = await adminApiClient.patch(`/admin/users/${userId}/role`, roleData)
    return unwrap(response)
  },

  // Get user activity log
  getUserActivity: async (userId, params = {}) => {
    const response = await adminApiClient.get('/admin/activity', { params: { ...params, userId } })
    return unwrap(response)
  },

  // Get all roles available
  getRoles: async () => {
    const response = await adminApiClient.get('/admin/roles/permissions')
    return unwrap(response)
  },

  // Reset user password (admin-initiated)
  resetUserPassword: async (userId, passwordData) => {
    const response = await adminApiClient.post(
      `/admin/users/${userId}/reset-password`,
      passwordData
    )
    return unwrap(response)
  },
}
