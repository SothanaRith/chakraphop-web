import adminApiClient from './client'

export const adminAuditService = {
  // Get admin action logs
  getActionLogs: async (params = {}) => {
    const response = await adminApiClient.get('/admin/audit/actions', { params })
    return response.data
  },

  // Get error logs (read-only)
  getErrorLogs: async (params = {}) => {
    const response = await adminApiClient.get('/admin/audit/errors', { params })
    return response.data
  },

  // Get refund logs
  getRefundLogs: async (params = {}) => {
    const response = await adminApiClient.get('/admin/audit/refunds', { params })
    return response.data
  },

  // Get stock adjustment logs
  getStockLogs: async (params = {}) => {
    const response = await adminApiClient.get('/admin/audit/stock-adjustments', { params })
    return response.data
  },

  // Get system status
  getSystemStatus: async () => {
    const response = await adminApiClient.get('/admin/system/status')
    return response.data
  },
}
