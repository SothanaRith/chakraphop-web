'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { courseService } from '@/lib/api'

export default function InstructorDashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await courseService.getInstructorDashboard()
        setDashboard(response?.data)
      } catch (error) {
        console.error('Failed to load instructor dashboard', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const stats = dashboard?.stats || {}
  const courses = dashboard?.courses || []

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-white">
        <section className="container-section py-14">
          <h1 className="text-4xl font-bold text-slate-900">Instructor Dashboard</h1>
          <p className="mt-3 text-slate-600">Manage course portfolio, performance, and recent enrollments.</p>

          {loading ? (
            <p className="mt-8 text-slate-500">Loading dashboard...</p>
          ) : (
            <>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Total courses</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totalCourses || 0}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Published</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stats.publishedCourses || 0}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Total enrollments</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totalEnrollments || 0}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">Average rating</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{Number(stats.avgRating || 0).toFixed(1)}</p>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Your courses</h2>
                <div className="mt-5 space-y-4">
                  {courses.map((course) => (
                    <article key={course.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-cyan-700">{course.status} • {course.level}</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">{course.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{course.totalLessons} lessons • {course.enrollmentCount} students</p>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
