import apiClient from './client'

export const contentService = {
  // Get blog posts
  async getBlogPosts(params = {}) {
    try {
      const response = await apiClient.get('/content/blog', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get blog post by slug
  async getBlogPostBySlug(slug) {
    try {
      const response = await apiClient.get(`/content/blog/${slug}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get related blog posts
  async getRelatedBlogPosts(postId) {
    try {
      const response = await apiClient.get(`/content/blog/${postId}/related`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get press releases
  async getPressReleases(params = {}) {
    try {
      const response = await apiClient.get('/content/press', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get press release by slug
  async getPressReleaseBySlug(slug) {
    try {
      const response = await apiClient.get(`/content/press/${slug}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get career positions
  async getCareers(params = {}) {
    try {
      const response = await apiClient.get('/content/careers', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get career position details
  async getCareerById(id) {
    try {
      const response = await apiClient.get(`/content/careers/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Submit job application
  async submitApplication(careerId, applicationData) {
    try {
      const response = await apiClient.post(`/content/careers/${careerId}/apply`, applicationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get static content by key
  async getContentByKey(key) {
    try {
      const response = await apiClient.get(`/content/${key}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default contentService
