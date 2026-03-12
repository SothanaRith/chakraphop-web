import apiClient from './client'

export const courseService = {
  getCourses: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return await apiClient.get(`/courses${query ? `?${query}` : ''}`)
  },

  getCourseBySlug: async (slug) => {
    return await apiClient.get(`/courses/${slug}`)
  },

  createCourse: async (payload) => {
    return await apiClient.post('/courses', payload)
  },

  updateCourse: async (courseId, updates) => {
    return await apiClient.patch(`/courses/${courseId}`, updates)
  },

  addSection: async (courseId, payload) => {
    return await apiClient.post(`/courses/${courseId}/sections`, payload)
  },

  addLesson: async (courseId, payload) => {
    return await apiClient.post(`/courses/${courseId}/lessons`, payload)
  },

  enroll: async (courseId) => {
    return await apiClient.post(`/courses/${courseId}/enroll`)
  },

  getMyLearning: async () => {
    return await apiClient.get('/courses/me/learning/list')
  },

  getLearningLessons: async (courseId) => {
    return await apiClient.get(`/courses/${courseId}/learn`)
  },

  updateProgress: async (payload) => {
    return await apiClient.post('/courses/me/progress', payload)
  },

  getInstructorDashboard: async () => {
    return await apiClient.get('/courses/instructor/dashboard/overview')
  },
}
