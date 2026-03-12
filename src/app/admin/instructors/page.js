'use client'

import { useEffect, useState } from 'react'
import { adminInstructorsService } from '@/lib/api/admin'
import { DataTable } from '@/components/admin/DataTable'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'

export default function AdminInstructorsPage() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadData = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await adminInstructorsService.getInstructors({ limit: 100 })
      setRows(data.items || [])
    } catch (err) {
      setError(err.message || 'Failed to load instructors')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleApprove = async (userId) => {
    try {
      await adminInstructorsService.approveInstructor(userId)
      setSuccess('Instructor approved')
      loadData()
    } catch (err) {
      setError(err.message || 'Failed to approve instructor')
    }
  }

  const handleSuspend = async (userId) => {
    try {
      await adminInstructorsService.suspendInstructor(userId)
      setSuccess('Instructor suspended')
      loadData()
    } catch (err) {
      setError(err.message || 'Failed to suspend instructor')
    }
  }

  const columns = [
    { key: 'email', label: 'Email' },
    {
      key: 'name',
      label: 'Name',
      render: (row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() || 'N/A',
    },
    {
      key: 'isVerified',
      label: 'Verified',
      render: (row) => (row.isVerified ? 'Yes' : 'No'),
    },
    {
      key: 'courseCount',
      label: 'Courses',
    },
    {
      key: 'estimatedRevenue',
      label: 'Revenue',
      render: (row) => `$${Number(row.estimatedRevenue || 0).toFixed(2)}`,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-3">
          {!row.isVerified && (
            <button
              onClick={() => handleApprove(row.id)}
              className="text-green-700 hover:text-green-900"
            >
              Approve
            </button>
          )}
          {row.isActive ? (
            <button
              onClick={() => handleSuspend(row.id)}
              className="text-red-700 hover:text-red-900"
            >
              Suspend
            </button>
          ) : (
            <span className="text-gray-500">Suspended</span>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Instructor Management</h1>
        <p className="text-gray-600 mt-1">Approve, suspend, and monitor instructor performance.</p>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={rows}
          isLoading={isLoading}
          searchableKeys={['email', 'firstName', 'lastName', 'headline']}
          searchPlaceholder="Search instructors by email or name..."
          isEmpty={!isLoading && rows.length === 0}
          emptyMessage="No instructors found"
        />
      </div>
    </div>
  )
}
