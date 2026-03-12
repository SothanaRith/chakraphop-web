import adminApiClient from './client'

const unwrap = (response) => response?.data || response

export const adminDashboardService = {
  // Get complete dashboard summary
  getSummary: async () => {
    const response = await adminApiClient.get('/admin/dashboard/summary')
    return unwrap(response)
  },

  // Backward-compatible metrics shape consumed by existing dashboard page
  getMetrics: async () => {
    const summary = await adminDashboardService.getSummary()
    const totals = summary?.totals || {}
    const alerts = summary?.alerts || {}

    return {
      totalUsers: totals.users || 0,
      totalInstructors: totals.instructors || 0,
      totalCourses: totals.courses || 0,
      totalProducts: totals.products || 0,
      totalOrders: totals.orders || 0,
      totalRevenue: totals.revenue || 0,
      lowStockCount: alerts.lowStockCount || 0,
      failedOrders: 0,
      ordersToday: 0,
      revenueToday: 0,
    }
  },

  // Backward-compatible alerts list
  getAlerts: async () => {
    const summary = await adminDashboardService.getSummary()
    const lowStockItems = summary?.alerts?.lowStockItems || []

    return lowStockItems.length
      ? [
          {
            severity: 'warning',
            title: 'Low stock variants',
            message: `${lowStockItems.length} variants are below threshold`,
          },
        ]
      : []
  },

  getRecentOrders: async () => {
    const summary = await adminDashboardService.getSummary()
    return summary?.recentOrders || []
  },

  getRecentEnrollments: async () => {
    const summary = await adminDashboardService.getSummary()
    return summary?.recentEnrollments || []
  },
}
