'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { courseService } from '@/lib/api'

const levels = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']

export default function CourseMarketplacePage() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getCourses({ limit: 50 })
        setCourses(response?.data?.courses || [])
      } catch (error) {
        console.error('Failed to load courses', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        search.trim().length === 0 ||
        course.title?.toLowerCase().includes(search.toLowerCase()) ||
        course.shortDescription?.toLowerCase().includes(search.toLowerCase())

      const matchesLevel = level === 'ALL' || course.level === level
      return matchesSearch && matchesLevel
    })
  }, [courses, search, level])

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-slate-50">
        <section className="container-section py-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Course Marketplace</h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Learn programming through practical section-based courses with expert instructors and trackable lesson progress.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search React, Node.js, SQL, system design..."
              className="input rounded-xl border-slate-300"
            />
            <select value={level} onChange={(event) => setLevel(event.target.value)} className="input rounded-xl border-slate-300">
              {levels.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="mt-10 text-slate-500">Loading courses...</p>
          ) : (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <Link
                  key={course.id}
                  href={`/tech/courses/${course.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition"
                >
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100" />
                  <p className="mt-4 text-xs uppercase tracking-wide text-cyan-700">
                    {course.category} • {course.level}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900">{course.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{course.shortDescription || 'Hands-on coding curriculum.'}</p>
                  <p className="mt-3 text-sm text-slate-500">
                    Instructor: {course.instructor?.firstName} {course.instructor?.lastName}
                  </p>
                  <p className="mt-4 text-xl font-bold text-slate-900">${Number(course.price || 0).toFixed(2)}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
