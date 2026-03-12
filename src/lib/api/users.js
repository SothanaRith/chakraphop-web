import apiClient from './client'

export const userService = {
  // Get user profile
  getProfile: async () => {
    return await apiClient.get('/users/profile')
  },

  // Update user profile
  updateProfile: async (userData) => {
    return await apiClient.put('/users/profile', userData)
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return await apiClient.put('/users/password', {
      currentPassword,
      newPassword,
    })
  },

  // Get user addresses
  getAddresses: async () => {
    return await apiClient.get('/users/addresses')
  },

  // Add new address
  addAddress: async (addressData) => {
    return await apiClient.post('/users/addresses', addressData)
  },

  // Update address
  updateAddress: async (id, addressData) => {
    return await apiClient.put(`/users/addresses/${id}`, addressData)
  },

  // Delete address
  deleteAddress: async (id) => {
    return await apiClient.delete(`/users/addresses/${id}`)
  },

  // Set default address
  setDefaultAddress: async (id) => {
    return await apiClient.put(`/users/addresses/${id}/default`)
  },

  // Get wishlist
  getWishlist: async () => {
    return await apiClient.get('/users/wishlist')
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    return await apiClient.post('/users/wishlist', { productId })
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    return await apiClient.delete(`/users/wishlist/${productId}`)
  },

  // Admin: Get all users
  getAllUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiClient.get(`/admin/users${queryString ? `?${queryString}` : ''}`)
  },

  // Admin: Update user role
  updateUserRole: async (id, role) => {
    return await apiClient.put(`/admin/users/${id}/role`, { role })
  },

  // Admin: Delete user
  deleteUser: async (id) => {
    return await apiClient.delete(`/admin/users/${id}`)
  },
}
