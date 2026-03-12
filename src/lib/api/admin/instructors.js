import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminInstructorsService = {
  getInstructors: async (params = {}) => {
    const response = await adminApiClient.get('/admin/instructors', { params })
    return unwrap(response)
  },

  approveInstructor: async (userId) => {
    const response = await adminApiClient.patch(`/admin/instructors/${userId}/approve`)
    return unwrap(response)
  },

  suspendInstructor: async (userId) => {
    const response = await adminApiClient.patch(`/admin/instructors/${userId}/suspend`)
    return unwrap(response)
  },

  getInstructorCourses: async (userId) => {
    const response = await adminApiClient.get(`/admin/instructors/${userId}/courses`)
    return unwrap(response)
  },

  getInstructorRevenue: async (userId) => {
    const response = await adminApiClient.get(`/admin/instructors/${userId}/revenue`)
    return unwrap(response)
  },
}
