import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminAccessorySetsService = {
  getSets: async (params = {}) => {
    const response = await adminApiClient.get('/accessory-sets', { params })
    return unwrap(response)
  },

  getSetBySlug: async (slug) => {
    const response = await adminApiClient.get(`/accessory-sets/${slug}`)
    return unwrap(response)
  },

  createSet: async (payload) => {
    const response = await adminApiClient.post('/accessory-sets', payload)
    return unwrap(response)
  },

  updateSet: async (setId, payload) => {
    const response = await adminApiClient.patch(`/accessory-sets/${setId}`, payload)
    return unwrap(response)
  },

  addItem: async (setId, payload) => {
    const response = await adminApiClient.post(`/accessory-sets/${setId}/items`, payload)
    return unwrap(response)
  },

  updateItem: async (setId, itemId, payload) => {
    const response = await adminApiClient.patch(`/accessory-sets/${setId}/items/${itemId}`, payload)
    return unwrap(response)
  },

  removeItem: async (setId, itemId) => {
    const response = await adminApiClient.delete(`/accessory-sets/${setId}/items/${itemId}`)
    return unwrap(response)
  },
}
