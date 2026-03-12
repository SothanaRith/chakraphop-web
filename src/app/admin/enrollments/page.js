'use client'

import { useEffect, useState } from 'react'
import { adminEnrollmentsService } from '@/lib/api/admin'
import { DataTable } from '@/components/admin/DataTable'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'
import { Modal } from '@/components/admin/Modal'

export default function AdminEnrollmentsPage() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [progress, setProgress] = useState(null)
  const [isProgressOpen, setIsProgressOpen] = useState(false)

  const loadData = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await adminEnrollmentsService.getEnrollments({ limit: 100 })
      setRows(data.items || [])
    } catch (err) {
      setError(err.message || 'Failed to load enrollments')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleRemove = async (enrollmentId) => {
    try {
      await adminEnrollmentsService.removeEnrollment(enrollmentId)
      setSuccess('Enrollment removed')
      loadData()
    } catch (err) {
      setError(err.message || 'Failed to remove enrollment')
    }
  }

  const handleViewProgress = async (enrollmentId) => {
    try {
      const data = await adminEnrollmentsService.getEnrollmentProgress(enrollmentId)
      setProgress(data)
      setIsProgressOpen(true)
    } catch (err) {
      setError(err.message || 'Failed to load enrollment progress')
    }
  }

  const columns = [
    {
      key: 'student',
      label: 'Student',
      render: (row) => row.studentName || row.studentEmail,
    },
    {
      key: 'courseTitle',
      label: 'Course',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'progressPercent',
      label: 'Progress',
      render: (row) => `${Number(row.progressPercent || 0).toFixed(1)}%`,
    },
    {
      key: 'enrolledAt',
      label: 'Enrolled',
      render: (row) => new Date(row.enrolledAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-3">
          <button onClick={() => handleViewProgress(row.id)} className="text-blue-700 hover:text-blue-900">
            Progress
          </button>
          <button onClick={() => handleRemove(row.id)} className="text-red-700 hover:text-red-900">
            Remove
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Enrollment Management</h1>
        <p className="text-gray-600 mt-1">Track student progress and remove enrollments when needed.</p>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={rows}
          isLoading={isLoading}
          searchableKeys={['studentName', 'studentEmail', 'courseTitle', 'status']}
          searchPlaceholder="Search enrollments by student, course, status..."
          isEmpty={!isLoading && rows.length === 0}
          emptyMessage="No enrollments found"
        />
      </div>

      <Modal isOpen={isProgressOpen} title="Enrollment Progress" onClose={() => setIsProgressOpen(false)} size="lg">
        {!progress ? (
          <p className="text-sm text-gray-600">No progress data.</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Course</p>
              <p className="font-semibold text-gray-900">{progress.enrollment?.courseTitle}</p>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {(progress.lessons || []).map((lesson) => (
                <div key={lesson.id} className="p-3 border border-gray-200 rounded">
                  <p className="font-medium text-gray-900">{lesson.lessonTitle}</p>
                  <p className="text-xs text-gray-600 mt-1">Status: {lesson.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
