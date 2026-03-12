import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminInventoryService = {
  // Get inventory overview
  getOverview: async (params = {}) => {
    const response = await adminApiClient.get('/admin/inventory/overview', { params })
    return unwrap(response)
  },

  // Get stock list with filters
  getStockList: async (params = {}) => {
    const response = await adminApiClient.get('/admin/inventory/overview', { params })
    return unwrap(response)
  },

  // Get low stock items
  getLowStock: async (params = {}) => {
    const response = await adminApiClient.get('/admin/inventory/low-stock-alerts', { params })
    return unwrap(response)
  },

  // Get stock movements history
  getMovements: async (params = {}) => {
    const response = await adminApiClient.get('/admin/inventory/movements', { params })
    return unwrap(response)
  },

  // Adjust stock (with optional approval workflow)
  adjustStock: async (adjustmentData) => {
    const response = await adminApiClient.post('/admin/inventory/adjust-stock', adjustmentData)
    return unwrap(response)
  },

  // Approve pending stock adjustment
  approveAdjustment: async (adjustmentId, approvalData) => {
    const response = await adminApiClient.post(
      `/admin/inventory/adjust-stock/${adjustmentId}/approve`,
      approvalData
    )
    return unwrap(response)
  },

  // Reject pending stock adjustment
  rejectAdjustment: async (adjustmentId, rejectionData) => {
    const response = await adminApiClient.post(
      `/admin/inventory/adjust-stock/${adjustmentId}/reject`,
      rejectionData
    )
    return unwrap(response)
  },

  // Bulk import stock
  bulkImport: async (importData) => {
    const response = await adminApiClient.post('/admin/inventory/bulk-import', importData)
    return unwrap(response)
  },
}
