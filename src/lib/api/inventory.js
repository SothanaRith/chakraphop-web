import apiClient from './client'

export const inventoryService = {
  // Check product availability
  checkAvailability: async (productId, variantId = null) => {
    return await apiClient.get(`/inventory/check/${productId}${variantId ? `?variantId=${variantId}` : ''}`)
  },

  // Admin: Get inventory status
  getInventoryStatus: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiClient.get(`/admin/inventory${queryString ? `?${queryString}` : ''}`)
  },

  // Admin: Update inventory
  updateInventory: async (productId, inventoryData) => {
    return await apiClient.put(`/admin/inventory/${productId}`, inventoryData)
  },

  // Admin: Get low stock alerts
  getLowStockAlerts: async () => {
    return await apiClient.get('/admin/inventory/alerts')
  },
}
