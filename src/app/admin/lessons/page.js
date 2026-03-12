'use client'

import { useEffect, useState } from 'react'
import { adminLessonsService } from '@/lib/api/admin'
import { DataTable } from '@/components/admin/DataTable'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'

export default function AdminLessonsPage() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadData = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await adminLessonsService.getLessons()
      setRows(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load lessons')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (lessonId) => {
    try {
      await adminLessonsService.deleteLesson(lessonId)
      setSuccess('Lesson deleted')
      loadData()
    } catch (err) {
      setError(err.message || 'Failed to delete lesson')
    }
  }

  const columns = [
    { key: 'courseTitle', label: 'Course' },
    { key: 'sectionTitle', label: 'Section' },
    { key: 'title', label: 'Lesson' },
    { key: 'contentType', label: 'Type' },
    {
      key: 'durationMinutes',
      label: 'Duration',
      render: (row) => `${row.durationMinutes || 0} min`,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="text-red-700 hover:text-red-900"
        >
          Delete
        </button>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lessons</h1>
        <p className="text-gray-600 mt-1">Manage video/text lessons across all courses.</p>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={rows}
          isLoading={isLoading}
          searchableKeys={['courseTitle', 'sectionTitle', 'title', 'contentType']}
          searchPlaceholder="Search lessons by course, section, title..."
          isEmpty={!isLoading && rows.length === 0}
          emptyMessage="No lessons found"
        />
      </div>
    </div>
  )
}
