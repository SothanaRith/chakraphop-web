import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminEnrollmentsService = {
  getEnrollments: async (params = {}) => {
    const response = await adminApiClient.get('/admin/enrollments', { params })
    return unwrap(response)
  },

  getEnrollmentProgress: async (enrollmentId) => {
    const response = await adminApiClient.get(`/admin/enrollments/${enrollmentId}/progress`)
    return unwrap(response)
  },

  removeEnrollment: async (enrollmentId) => {
    const response = await adminApiClient.delete(`/admin/enrollments/${enrollmentId}`)
    return unwrap(response)
  },
}
