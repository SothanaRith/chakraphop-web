import apiClient from './client'

export const orderService = {
  // Get user's orders
  getOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiClient.get(`/orders${queryString ? `?${queryString}` : ''}`)
  },

  // Get order by ID
  getOrder: async (id) => {
    return await apiClient.get(`/orders/${id}`)
  },

  // Create new order
  createOrder: async (orderData) => {
    return await apiClient.post('/orders', orderData)
  },

  // Cancel order
  cancelOrder: async (id) => {
    return await apiClient.post(`/orders/${id}/cancel`)
  },

  // Track order
  trackOrder: async (id) => {
    return await apiClient.get(`/orders/${id}/track`)
  },

  // Admin: Get all orders
  getAllOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiClient.get(`/admin/orders${queryString ? `?${queryString}` : ''}`)
  },

  // Admin: Update order status
  updateOrderStatus: async (id, status) => {
    return await apiClient.put(`/admin/orders/${id}/status`, { status })
  },
}
