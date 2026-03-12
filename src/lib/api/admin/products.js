import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminProductsService = {
  // Get products list
  getProducts: async (params = {}) => {
    const response = await adminApiClient.get('/admin/products', { params })
    return unwrap(response)
  },

  // Get product detail
  getProduct: async (productId) => {
    const response = await adminApiClient.get(`/admin/products/${productId}`)
    return unwrap(response)
  },

  // Create product
  createProduct: async (productData) => {
    const response = await adminApiClient.post('/admin/products', productData)
    return unwrap(response)
  },

  // Update product
  updateProduct: async (productId, productData) => {
    const response = await adminApiClient.patch(`/admin/products/${productId}`, productData)
    return unwrap(response)
  },

  // Manage variants
  getVariants: async (productId, params = {}) => {
    const response = await adminApiClient.get(`/admin/products/${productId}/variants`, { params })
    return unwrap(response)
  },

  // Create variant
  createVariant: async (productId, variantData) => {
    const response = await adminApiClient.post(
      `/admin/products/${productId}/variants`,
      variantData
    )
    return unwrap(response)
  },

  // Update variant
  updateVariant: async (productId, variantId, variantData) => {
    const response = await adminApiClient.patch(
      `/admin/products/${productId}/variants/${variantId}`,
      variantData
    )
    return unwrap(response)
  },

  // Bulk update prices
  bulkUpdatePrices: async (updateData) => {
    const response = await adminApiClient.post('/admin/products/bulk-update/prices', updateData)
    return unwrap(response)
  },

  // Bulk update status
  bulkUpdateStatus: async (updateData) => {
    const response = await adminApiClient.post('/admin/products/bulk-update/status', updateData)
    return unwrap(response)
  },

  // Publish product
  publishProduct: async (productId) => {
    const response = await adminApiClient.post(`/admin/products/${productId}/publish`)
    return unwrap(response)
  },

  // Archive product
  archiveProduct: async (productId) => {
    const response = await adminApiClient.post(`/admin/products/${productId}/archive`)
    return unwrap(response)
  },
}
