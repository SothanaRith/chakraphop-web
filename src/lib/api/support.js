import apiClient from './client'

export const supportService = {
  // Submit contact form
  async submitContactForm(data) {
    try {
      const response = await apiClient.post('/support/contact', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get FAQ items
  async getFAQ(category = null) {
    try {
      const params = category ? { category } : {}
      const response = await apiClient.get('/support/faq', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get FAQ categories
  async getFAQCategories() {
    try {
      const response = await apiClient.get('/support/faq/categories')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Subscribe to support notifications
  async subscribeToUpdates(email) {
    try {
      const response = await apiClient.post('/support/subscribe', { email })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default supportService
