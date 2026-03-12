'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { courseService } from '@/lib/api'

export default function StudentDashboardPage() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLearning = async () => {
      try {
        const response = await courseService.getMyLearning()
        setEnrollments(response?.data || [])
      } catch (error) {
        console.error('Failed to load student dashboard', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLearning()
  }, [])

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-slate-50">
        <section className="container-section py-14">
          <h1 className="text-4xl font-bold text-slate-900">Student Dashboard</h1>
          <p className="mt-3 text-slate-600">Track enrolled courses and continue your lessons.</p>

          {loading ? (
            <p className="mt-8 text-slate-500">Loading dashboard...</p>
          ) : enrollments.length === 0 ? (
            <p className="mt-8 text-slate-500">No enrollments yet. Explore the course marketplace.</p>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {enrollments.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs uppercase tracking-wide text-cyan-700">{item.level} • {item.category}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-3 text-sm text-slate-600">Progress: {Number(item.progressPercent || 0).toFixed(0)}%</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-cyan-600" style={{ width: `${Number(item.progressPercent || 0)}%` }} />
                  </div>
                  <Link href={`/tech/courses/${item.slug}`} className="mt-5 inline-block btn btn-secondary rounded-xl">
                    Continue
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
