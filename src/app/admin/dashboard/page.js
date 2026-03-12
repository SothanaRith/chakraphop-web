'use client'

import { useEffect, useState } from 'react'
import { adminDashboardService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [recentEnrollments, setRecentEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setError('')
      setIsLoading(true)

      const [metricsData, alertsData, ordersData, enrollmentsData] = await Promise.all([
        adminDashboardService.getMetrics(),
        adminDashboardService.getAlerts(),
        adminDashboardService.getRecentOrders(),
        adminDashboardService.getRecentEnrollments(),
      ])

      setMetrics(metricsData)
      setAlerts(alertsData)
      setRecentOrders(ordersData)
      setRecentEnrollments(enrollmentsData)
    } catch (err) {
      setError(err.message || 'Failed to load dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your store</p>
      </div>

      {error && (
        <ErrorAlert message={error} onDismiss={() => setError('')} />
      )}

      {/* Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <div className="text-gray-600 text-sm font-medium">Total Users</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalUsers || 0}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-500">
            <div className="text-gray-600 text-sm font-medium">Total Instructors</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalInstructors || 0}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-gray-600 text-sm font-medium">Total Courses</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalCourses || 0}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-teal-500">
            <div className="text-gray-600 text-sm font-medium">Total Products</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalProducts || 0}</div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-gray-600 text-sm font-medium">Total Orders</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold text-gray-900">{metrics.totalOrders || 0}</div>
              <span className="ml-2 text-sm text-green-600">
                {metrics.ordersToday || 0} today
              </span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-gray-600 text-sm font-medium">Total Revenue</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold text-gray-900">
                ${(metrics.totalRevenue || 0).toFixed(2)}
              </div>
              <span className="ml-2 text-sm text-green-600">
                ${(metrics.revenueToday || 0).toFixed(2)} today
              </span>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-gray-600 text-sm font-medium">Low Stock Items</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold text-gray-900">{metrics.lowStockCount || 0}</div>
              <span className="ml-2 text-sm text-yellow-600">Items below threshold</span>
            </div>
          </div>

          {/* Failed Orders */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-gray-600 text-sm font-medium">Failed Orders</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-3xl font-bold text-gray-900">{metrics.failedOrders || 0}</div>
              <span className="ml-2 text-sm text-red-600">Requires attention</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-600">No recent orders.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.slice(0, 6).map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-gray-600">{order.customerName || order.email || 'Customer'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${Number(order.total || 0).toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Enrollments</h2>
          {recentEnrollments.length === 0 ? (
            <p className="text-sm text-gray-600">No recent enrollments.</p>
          ) : (
            <div className="space-y-3">
              {recentEnrollments.slice(0, 6).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-900">{enrollment.courseTitle}</p>
                    <p className="text-gray-600">{enrollment.studentName || enrollment.studentEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-semibold">{Number(enrollment.progressPercent || 0).toFixed(1)}%</p>
                    <p className="text-xs text-gray-600">{enrollment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`flex items-start p-4 rounded border-l-4 ${
                  alert.severity === 'error'
                    ? 'bg-red-50 border-red-500'
                    : alert.severity === 'warning'
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
          ✓ No active alerts
        </div>
      )}
    </div>
  )
}
