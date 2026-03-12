import apiClient from './client'

export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiClient.get(`/products${queryString ? `?${queryString}` : ''}`)
  },

  // Get product by slug
  getProduct: async (slug) => {
    return await apiClient.get(`/products/${slug}`)
  },

  // Get products by category
  getProductsByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiClient.get(`/products/category/${category}${queryString ? `?${queryString}` : ''}`)
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const queryString = new URLSearchParams({ ...params, q: query }).toString()
    return await apiClient.get(`/products/search?${queryString}`)
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return await apiClient.get('/products/featured')
  },

  // Get new arrivals
  getNewArrivals: async () => {
    return await apiClient.get('/products/new')
  },

  // Get product reviews
  getProductReviews: async (productId) => {
    return await apiClient.get(`/products/${productId}/reviews`)
  },

  // Add product review
  addProductReview: async (productId, review) => {
    return await apiClient.post(`/products/${productId}/reviews`, review)
  },

  // Admin: Create product
  createProduct: async (productData) => {
    return await apiClient.post('/admin/products', productData)
  },

  // Admin: Update product
  updateProduct: async (id, productData) => {
    return await apiClient.put(`/admin/products/${id}`, productData)
  },

  // Admin: Delete product
  deleteProduct: async (id) => {
    return await apiClient.delete(`/admin/products/${id}`)
  },
}
