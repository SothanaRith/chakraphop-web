import apiClient from './client'

export const accessorySetService = {
  getSets: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return await apiClient.get(`/accessory-sets${query ? `?${query}` : ''}`)
  },

  getSetBySlug: async (slug) => {
    return await apiClient.get(`/accessory-sets/${slug}`)
  },
}
