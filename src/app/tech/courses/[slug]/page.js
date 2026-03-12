'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { courseService } from '@/lib/api'

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [enrollment, setEnrollment] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseService.getCourseBySlug(params.slug)
        setCourse(response?.data)
        setEnrollment(response?.data?.enrollment || null)
      } catch (error) {
        console.error('Failed to load course', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.slug) {
      fetchCourse()
    }
  }, [params])

  const handleEnroll = async () => {
    if (!course) return

    try {
      setEnrolling(true)
      const response = await courseService.enroll(course.id)
      setEnrollment(response?.data)
    } catch (error) {
      console.error('Enrollment failed', error)
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-white">
        <section className="container-section py-14">
          {loading ? (
            <p className="text-slate-500">Loading course...</p>
          ) : !course ? (
            <p className="text-slate-500">Course not found.</p>
          ) : (
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-700">
                  {course.category} • {course.level}
                </p>
                <h1 className="mt-2 text-4xl font-bold text-slate-900">{course.title}</h1>
                <p className="mt-5 text-slate-600">{course.description || course.shortDescription}</p>
                <p className="mt-6 text-sm text-slate-500">
                  Instructor: {course.instructor?.firstName} {course.instructor?.lastName}
                </p>

                <div className="mt-10 space-y-6">
                  {course.sections?.map((section, index) => (
                    <article key={section.id} className="rounded-xl border border-slate-200 p-5">
                      <h2 className="text-lg font-semibold text-slate-900">
                        Section {index + 1}: {section.title}
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {section.lessons?.map((lesson) => (
                          <li key={lesson.id}>
                            {lesson.title} ({lesson.contentType})
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="rounded-2xl border border-slate-200 p-6 h-fit sticky top-32">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100" />
                <p className="mt-6 text-3xl font-bold text-slate-900">${Number(course.price || 0).toFixed(2)}</p>
                <p className="mt-2 text-sm text-slate-500">{course.totalLessons || 0} lessons • {course.totalDurationMinutes || 0} min</p>

                {enrollment ? (
                  <Link
                    href={`/tech/learn/${course.id}/${course.sections?.[0]?.lessons?.[0]?.id || ''}`}
                    className="mt-6 btn btn-primary rounded-xl w-full"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="mt-6 btn btn-primary rounded-xl w-full"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
