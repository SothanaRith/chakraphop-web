import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminOrdersService = {
  // Get orders list with filters
  getOrders: async (params = {}) => {
    const response = await adminApiClient.get('/admin/orders', { params })
    return unwrap(response)
  },

  // Get order detail
  getOrder: async (orderId) => {
    const response = await adminApiClient.get(`/admin/orders/${orderId}`)
    return unwrap(response)
  },

  // Get order timeline/history
  getOrderTimeline: async (orderId) => {
    const response = await adminApiClient.get(`/admin/orders/${orderId}/history`)
    return unwrap(response)
  },

  // Update order status
  updateOrderStatus: async (orderId, statusData) => {
    const response = await adminApiClient.patch(`/admin/orders/${orderId}/status`, statusData)
    return unwrap(response)
  },

  // Cancel order (with stock rollback)
  cancelOrder: async (orderId, cancellationData) => {
    const response = await adminApiClient.post(`/admin/orders/${orderId}/cancel`, cancellationData)
    return unwrap(response)
  },

  // Process refund (SUPER_ADMIN only)
  refundOrder: async (orderId, refundData) => {
    const response = await adminApiClient.post(`/admin/orders/${orderId}/refund`, refundData)
    return unwrap(response)
  },

  // Add internal note to order
  addNote: async (orderId, noteData) => {
    const response = await adminApiClient.post(`/admin/orders/${orderId}/notes`, noteData)
    return unwrap(response)
  },

  // Create manual order
  createManualOrder: async (orderData) => {
    const response = await adminApiClient.post('/admin/orders/create', orderData)
    return unwrap(response)
  },
}
