import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminLessonsService = {
  getLessons: async (params = {}) => {
    const response = await adminApiClient.get('/admin/lessons', { params })
    return unwrap(response)
  },

  deleteLesson: async (lessonId) => {
    const response = await adminApiClient.delete(`/admin/lessons/${lessonId}`)
    return unwrap(response)
  },
}
