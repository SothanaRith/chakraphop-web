import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminMediaService = {
  getMedia: async (params = {}) => {
    const response = await adminApiClient.get('/admin/media', { params })
    return unwrap(response)
  },

  uploadMedia: async (payload) => {
    const response = await adminApiClient.post('/admin/media', payload)
    return unwrap(response)
  },

  deleteMedia: async (mediaId) => {
    const response = await adminApiClient.delete(`/admin/media/${mediaId}`)
    return unwrap(response)
  },
}
