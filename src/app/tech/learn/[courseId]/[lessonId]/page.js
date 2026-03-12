'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { courseService } from '@/lib/api'

function toEmbedUrl(url = '') {
  if (!url) return ''

  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/')
  }

  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]
    return `https://www.youtube.com/embed/${id}`
  }

  return url
}

export default function LessonPlayerPage() {
  const params = useParams()
  const [learningData, setLearningData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        const response = await courseService.getLearningLessons(params.courseId)
        setLearningData(response?.data)
      } catch (error) {
        console.error('Failed to load lessons', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.courseId) {
      fetchLearningData()
    }
  }, [params])

  const currentLesson = useMemo(() => {
    const lessons = learningData?.lessons || []
    return lessons.find((lesson) => lesson.id === params.lessonId) || lessons[0]
  }, [learningData, params.lessonId])

  const markLessonDone = async () => {
    if (!currentLesson) return

    try {
      await courseService.updateProgress({
        courseId: params.courseId,
        lessonId: currentLesson.id,
        status: 'COMPLETED',
      })
    } catch (error) {
      console.error('Progress update failed', error)
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-slate-50">
        <section className="container-section py-12">
          {loading ? (
            <p className="text-slate-500">Loading lesson player...</p>
          ) : !currentLesson ? (
            <p className="text-slate-500">No lesson found for this course.</p>
          ) : (
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h1 className="text-3xl font-bold text-slate-900">{currentLesson.title}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  {currentLesson.contentType} • {currentLesson.durationMinutes || 0} min
                </p>

                {currentLesson.contentType === 'VIDEO' ? (
                  <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      title={currentLesson.title}
                      src={toEmbedUrl(currentLesson.videoUrl)}
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="mt-6 prose max-w-none text-slate-700 whitespace-pre-wrap">
                    {currentLesson.content || 'Text lesson content will appear here.'}
                  </div>
                )}

                <button onClick={markLessonDone} className="mt-6 btn btn-primary rounded-xl">
                  Mark Lesson Completed
                </button>
              </article>

              <aside className="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
                <h2 className="text-lg font-semibold text-slate-900">Course lessons</h2>
                <div className="mt-4 space-y-2">
                  {(learningData?.lessons || []).map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/tech/learn/${params.courseId}/${lesson.id}`}
                      className={`block rounded-lg p-3 text-sm border ${
                        lesson.id === currentLesson.id
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-900'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {lesson.title}
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
