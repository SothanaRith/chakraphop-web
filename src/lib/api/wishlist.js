import apiClient from './client'

export const wishlistService = {
  getWishlist: async () => {
    return await apiClient.get('/wishlist')
  },

  addToWishlist: async (productId, payload = {}) => {
    return await apiClient.post('/wishlist', {
      productId,
      ...payload,
    })
  },

  removeFromWishlist: async (productId) => {
    return await apiClient.delete(`/wishlist/${productId}`)
  },

  clearWishlist: async () => {
    return await apiClient.delete('/wishlist')
  },

  moveToCart: async (productId) => {
    return await apiClient.post(`/wishlist/${productId}/move-to-cart`)
  },

  isInWishlist: async (productId) => {
    return await apiClient.get(`/wishlist/${productId}/status`)
  },
}
