import apiClient from './client'

export const cartService = {
  // Get user's cart
  getCart: async () => {
    return await apiClient.get('/cart')
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1, variantId = null) => {
    return await apiClient.post('/cart/add', {
      productId,
      quantity,
      variantId,
    })
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    return await apiClient.put('/cart/update', {
      itemId,
      quantity,
    })
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    return await apiClient.delete(`/cart/remove/${itemId}`)
  },

  // Clear entire cart
  clearCart: async () => {
    return await apiClient.delete('/cart/clear')
  },

  // Apply discount code
  applyDiscount: async (code) => {
    return await apiClient.post('/cart/discount', { code })
  },

  // Remove discount
  removeDiscount: async () => {
    return await apiClient.delete('/cart/discount')
  },
}
