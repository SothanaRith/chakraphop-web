import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminCoursesService = {
  getCourses: async (params = {}) => {
    const response = await adminApiClient.get('/courses', { params })
    return unwrap(response)
  },

  getCourseBySlug: async (slug) => {
    const response = await adminApiClient.get(`/courses/${slug}`)
    return unwrap(response)
  },

  createCourse: async (courseData) => {
    const response = await adminApiClient.post('/courses', courseData)
    return unwrap(response)
  },

  updateCourse: async (courseId, courseData) => {
    const response = await adminApiClient.patch(`/courses/${courseId}`, courseData)
    return unwrap(response)
  },

  createSection: async (courseId, sectionData) => {
    const response = await adminApiClient.post(`/courses/${courseId}/sections`, sectionData)
    return unwrap(response)
  },

  updateSection: async (sectionId, sectionData) => {
    const response = await adminApiClient.patch(`/courses/sections/${sectionId}`, sectionData)
    return unwrap(response)
  },

  createLesson: async (courseId, lessonData) => {
    const response = await adminApiClient.post(`/courses/${courseId}/lessons`, lessonData)
    return unwrap(response)
  },

  updateLesson: async (lessonId, lessonData) => {
    const response = await adminApiClient.patch(`/courses/lessons/${lessonId}`, lessonData)
    return unwrap(response)
  },
}
