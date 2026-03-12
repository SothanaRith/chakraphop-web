'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { adminCoursesService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { Modal } from '@/components/admin/Modal'
import { RoleGuard } from '@/components/admin/RoleGuard'

const initialCourseForm = {
  title: '',
  slug: '',
  category: 'Web Development',
  level: 'BEGINNER',
  language: 'English',
  price: '0',
  status: 'DRAFT',
  shortDescription: '',
  description: '',
}

const initialSectionForm = {
  title: '',
  description: '',
  displayOrder: '0',
}

const initialLessonForm = {
  sectionId: '',
  title: '',
  contentType: 'VIDEO',
  videoUrl: '',
  content: '',
  durationMinutes: '0',
  isPreview: false,
  displayOrder: '0',
}

const unwrap = (payload) => payload?.data || payload || {}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const [showCourseModal, setShowCourseModal] = useState(false)
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [showLessonModal, setShowLessonModal] = useState(false)

  const [editingCourse, setEditingCourse] = useState(null)
  const [editingSection, setEditingSection] = useState(null)
  const [editingLesson, setEditingLesson] = useState(null)

  const [courseForm, setCourseForm] = useState(initialCourseForm)
  const [sectionForm, setSectionForm] = useState(initialSectionForm)
  const [lessonForm, setLessonForm] = useState(initialLessonForm)

  const [submitting, setSubmitting] = useState(false)

  const loadCourseDetail = useCallback(async (slug) => {
    try {
      setIsDetailLoading(true)
      const response = await adminCoursesService.getCourseBySlug(slug)
      const data = unwrap(response)
      setSelectedCourse(data)
    } catch (err) {
      setError(err.message || 'Failed to load course details')
    } finally {
      setIsDetailLoading(false)
    }
  }, [])

  const loadCourses = useCallback(async () => {
    try {
      setError('')
      setIsLoading(true)

      const params = {
        limit: 100,
        status: statusFilter,
      }

      const response = await adminCoursesService.getCourses(params)
      const data = unwrap(response)
      const items = data.courses || data.items || []
      setCourses(items)

      if (selectedCourse?.slug) {
        await loadCourseDetail(selectedCourse.slug)
      }
    } catch (err) {
      setError(err.message || 'Failed to load courses')
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter, selectedCourse?.slug, loadCourseDetail])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return courses

    return courses.filter((course) => {
      return (
        course.title?.toLowerCase().includes(query) ||
        course.slug?.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query)
      )
    })
  }, [courses, searchTerm])

  const openCreateCourse = () => {
    setEditingCourse(null)
    setCourseForm(initialCourseForm)
    setShowCourseModal(true)
  }

  const openEditCourse = (course) => {
    setEditingCourse(course)
    setCourseForm({
      title: course.title || '',
      slug: course.slug || '',
      category: course.category || 'Web Development',
      level: course.level || 'BEGINNER',
      language: course.language || 'English',
      price: String(course.price || 0),
      status: course.status || 'DRAFT',
      shortDescription: course.shortDescription || '',
      description: course.description || '',
    })
    setShowCourseModal(true)
  }

  const submitCourse = async () => {
    try {
      setSubmitting(true)
      setError('')

      const payload = {
        ...courseForm,
        price: Number(courseForm.price || 0),
      }

      if (editingCourse?.id) {
        await adminCoursesService.updateCourse(editingCourse.id, payload)
        setSuccess('Course updated successfully')
      } else {
        await adminCoursesService.createCourse(payload)
        setSuccess('Course created successfully')
      }

      setShowCourseModal(false)
      await loadCourses()
    } catch (err) {
      setError(err.message || 'Failed to save course')
    } finally {
      setSubmitting(false)
    }
  }

  const openCreateSection = () => {
    if (!selectedCourse?.id) return
    setEditingSection(null)
    setSectionForm({ ...initialSectionForm, displayOrder: String(selectedCourse.sections?.length || 0) })
    setShowSectionModal(true)
  }

  const openEditSection = (section) => {
    setEditingSection(section)
    setSectionForm({
      title: section.title || '',
      description: section.description || '',
      displayOrder: String(section.displayOrder || 0),
    })
    setShowSectionModal(true)
  }

  const submitSection = async () => {
    try {
      if (!selectedCourse?.id) return

      setSubmitting(true)
      setError('')

      const payload = {
        title: sectionForm.title,
        description: sectionForm.description,
        displayOrder: Number(sectionForm.displayOrder || 0),
      }

      if (editingSection?.id) {
        await adminCoursesService.updateSection(editingSection.id, payload)
        setSuccess('Section updated successfully')
      } else {
        await adminCoursesService.createSection(selectedCourse.id, payload)
        setSuccess('Section created successfully')
      }

      setShowSectionModal(false)
      await loadCourseDetail(selectedCourse.slug)
    } catch (err) {
      setError(err.message || 'Failed to save section')
    } finally {
      setSubmitting(false)
    }
  }

  const openCreateLesson = (sectionId = '') => {
    if (!selectedCourse?.id) return
    setEditingLesson(null)
    setLessonForm({
      ...initialLessonForm,
      sectionId: sectionId || selectedCourse.sections?.[0]?.id || '',
    })
    setShowLessonModal(true)
  }

  const openEditLesson = (lesson) => {
    setEditingLesson(lesson)
    setLessonForm({
      sectionId: lesson.sectionId || '',
      title: lesson.title || '',
      contentType: lesson.contentType || 'VIDEO',
      videoUrl: lesson.videoUrl || '',
      content: lesson.content || '',
      durationMinutes: String(lesson.durationMinutes || 0),
      isPreview: Boolean(lesson.isPreview),
      displayOrder: String(lesson.displayOrder || 0),
    })
    setShowLessonModal(true)
  }

  const submitLesson = async () => {
    try {
      if (!selectedCourse?.id) return

      setSubmitting(true)
      setError('')

      const payload = {
        ...lessonForm,
        durationMinutes: Number(lessonForm.durationMinutes || 0),
        displayOrder: Number(lessonForm.displayOrder || 0),
      }

      if (editingLesson?.id) {
        await adminCoursesService.updateLesson(editingLesson.id, payload)
        setSuccess('Lesson updated successfully')
      } else {
        await adminCoursesService.createLesson(selectedCourse.id, payload)
        setSuccess('Lesson created successfully')
      }

      setShowLessonModal(false)
      await loadCourseDetail(selectedCourse.slug)
    } catch (err) {
      setError(err.message || 'Failed to save lesson')
    } finally {
      setSubmitting(false)
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Course',
      render: (course) => (
        <button
          onClick={(event) => {
            event.stopPropagation()
            loadCourseDetail(course.slug)
          }}
          className="text-left"
        >
          <p className="font-semibold text-gray-900 hover:text-blue-700">{course.title}</p>
          <p className="text-xs text-gray-500">/{course.slug}</p>
        </button>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (course) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            course.status === 'PUBLISHED'
              ? 'bg-green-100 text-green-800'
              : course.status === 'DRAFT'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {course.status}
        </span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'level',
      label: 'Level',
    },
    {
      key: 'enrollmentCount',
      label: 'Students',
      render: (course) => course.enrollmentCount || 0,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (course) => (
        <RoleGuard requiredPermission="MANAGE_COURSES">
          <button
            onClick={(event) => {
              event.stopPropagation()
              openEditCourse(course)
            }}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
        </RoleGuard>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Create and edit courses, sections, and lessons.</p>
        </div>
        <RoleGuard requiredPermission="MANAGE_COURSES">
          <button
            onClick={openCreateCourse}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + New Course
          </button>
        </RoleGuard>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-6">
        <section className="bg-white rounded-lg shadow p-4">
          <div className="mb-4 space-y-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search courses by title or slug..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <div className="flex gap-2 flex-wrap">
              {['ALL', 'DRAFT', 'PUBLISHED', 'ARCHIVED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredCourses}
            isLoading={isLoading}
            isEmpty={!isLoading && filteredCourses.length === 0}
            emptyMessage="No courses found"
            onRowClick={(course) => loadCourseDetail(course.slug)}
          />
        </section>

        <section className="bg-white rounded-lg shadow p-5">
          {!selectedCourse ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Select a course to manage sections and lessons.
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs uppercase text-gray-500">Selected Course</p>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">/{selectedCourse.slug}</p>
                </div>
                <RoleGuard requiredPermission="MANAGE_COURSE_CONTENT">
                  <div className="flex gap-2">
                    <button
                      onClick={openCreateSection}
                      className="px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800"
                    >
                      + Section
                    </button>
                    <button
                      onClick={() => openCreateLesson('')}
                      className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      + Lesson
                    </button>
                  </div>
                </RoleGuard>
              </div>

              {isDetailLoading ? (
                <p className="text-sm text-gray-500">Loading course detail...</p>
              ) : (
                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  {(selectedCourse.sections || []).map((section) => (
                    <article key={section.id} className="border border-gray-200 rounded-lg">
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{section.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">Order: {section.displayOrder || 0}</p>
                          </div>
                          <RoleGuard requiredPermission="MANAGE_COURSE_CONTENT">
                            <div className="flex gap-3 text-sm">
                              <button
                                onClick={() => openEditSection(section)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Edit Section
                              </button>
                              <button
                                onClick={() => openCreateLesson(section.id)}
                                className="text-emerald-600 hover:text-emerald-800"
                              >
                                Add Lesson
                              </button>
                            </div>
                          </RoleGuard>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        {(section.lessons || []).length === 0 && (
                          <p className="text-sm text-gray-500">No lessons in this section yet.</p>
                        )}

                        {(section.lessons || []).map((lesson) => (
                          <div key={lesson.id} className="border border-gray-100 rounded p-3 bg-white">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-medium text-gray-900">{lesson.title}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {lesson.contentType} • {lesson.durationMinutes || 0} min • Order {lesson.displayOrder || 0}
                                </p>
                              </div>
                              <RoleGuard requiredPermission="MANAGE_COURSE_CONTENT">
                                <button
                                  onClick={() => openEditLesson(lesson)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Edit Lesson
                                </button>
                              </RoleGuard>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <Modal
        isOpen={showCourseModal}
        title={editingCourse ? 'Edit Course' : 'Create Course'}
        onClose={() => setShowCourseModal(false)}
        size="xl"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Title">
              <input
                value={courseForm.title}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, title: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
            <Field label="Slug">
              <input
                value={courseForm.slug}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, slug: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
            <Field label="Category">
              <input
                value={courseForm.category}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, category: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
            <Field label="Language">
              <input
                value={courseForm.language}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, language: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
            <Field label="Level">
              <select
                value={courseForm.level}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, level: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="BEGINNER">BEGINNER</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                value={courseForm.status}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </Field>
            <Field label="Price (USD)">
              <input
                type="number"
                min="0"
                value={courseForm.price}
                onChange={(event) => setCourseForm((prev) => ({ ...prev, price: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
          </div>

          <Field label="Short Description">
            <textarea
              rows={2}
              value={courseForm.shortDescription}
              onChange={(event) => setCourseForm((prev) => ({ ...prev, shortDescription: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              value={courseForm.description}
              onChange={(event) => setCourseForm((prev) => ({ ...prev, description: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowCourseModal(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={submitCourse}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSectionModal}
        title={editingSection ? 'Edit Section' : 'Create Section'}
        onClose={() => setShowSectionModal(false)}
      >
        <div className="space-y-3">
          <Field label="Section Title">
            <input
              value={sectionForm.title}
              onChange={(event) => setSectionForm((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              value={sectionForm.description}
              onChange={(event) => setSectionForm((prev) => ({ ...prev, description: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <Field label="Display Order">
            <input
              type="number"
              min="0"
              value={sectionForm.displayOrder}
              onChange={(event) => setSectionForm((prev) => ({ ...prev, displayOrder: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowSectionModal(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={submitSection}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : editingSection ? 'Update Section' : 'Create Section'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showLessonModal}
        title={editingLesson ? 'Edit Lesson' : 'Create Lesson'}
        onClose={() => setShowLessonModal(false)}
        size="lg"
      >
        <div className="space-y-3">
          <Field label="Section">
            <select
              value={lessonForm.sectionId}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, sectionId: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              {(selectedCourse?.sections || []).map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Lesson Title">
            <input
              value={lessonForm.title}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Content Type">
              <select
                value={lessonForm.contentType}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, contentType: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="VIDEO">VIDEO</option>
                <option value="TEXT">TEXT</option>
              </select>
            </Field>

            <Field label="Duration (minutes)">
              <input
                type="number"
                min="0"
                value={lessonForm.durationMinutes}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, durationMinutes: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
          </div>

          {lessonForm.contentType === 'VIDEO' ? (
            <Field label="Video URL">
              <input
                value={lessonForm.videoUrl}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, videoUrl: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
          ) : (
            <Field label="Text Content">
              <textarea
                rows={5}
                value={lessonForm.content}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, content: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Display Order">
              <input
                type="number"
                min="0"
                value={lessonForm.displayOrder}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, displayOrder: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>

            <label className="flex items-center gap-2 text-sm text-gray-700 mt-6">
              <input
                type="checkbox"
                checked={lessonForm.isPreview}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, isPreview: event.target.checked }))}
              />
              Mark as preview lesson
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowLessonModal(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={submitLesson}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : editingLesson ? 'Update Lesson' : 'Create Lesson'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  )
}
