'use client'

import { useEffect, useState } from 'react'
import { adminUsersService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { RoleGuard } from '@/components/admin/RoleGuard'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await adminUsersService.getUsers({ limit: 100 })
      setUsers(data.users || data.items || [])
    } catch (err) {
      setError(err.message || 'Failed to load users')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeactivate = async () => {
    try {
      setError('')
      await adminUsersService.deactivateUser(selectedUser.id)
      setSuccess('User deactivated successfully')
      loadUsers()
      setShowDeactivateConfirm(false)
    } catch (err) {
      setError(err.message || 'Failed to deactivate user')
    }
  }

  const columns = [
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
            user.role === 'SUPER_ADMIN'
              ? 'bg-purple-100 text-purple-800'
              : user.role === 'ADMIN'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
          }`}>
          {user.role}
        </span>
      ),
    },
    {
      key: 'fullName',
      label: 'Name',
      render: (user) => `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A',
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (user) => (
        <span
          className={
            user.isActive
              ? 'text-green-600 font-medium'
              : 'text-red-600 font-medium'
          }
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (user) =>
        user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => (
        <RoleGuard requiredRole="SUPER_ADMIN">
          <div className="flex gap-2">
            <a
              href={`/admin/users/${user.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </a>
            {user.isActive && (
              <button
                onClick={() => {
                  setSelectedUser(user)
                  setShowDeactivateConfirm(true)
                }}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Deactivate
              </button>
            )}
          </div>
        </RoleGuard>
      ),
    },
  ]

  return (
    <RoleGuard requiredRole="SUPER_ADMIN">
      <div>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Users</h1>
            <p className="text-gray-600 mt-1">Manage admin team members</p>
          </div>
          <a
            href="/admin/users/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add User
          </a>
        </div>

        {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
        {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={users}
            isLoading={isLoading}
            searchableKeys={['email', 'firstName', 'lastName', 'role']}
            searchPlaceholder="Search users by email, name, role..."
            isEmpty={!isLoading && users.length === 0}
            emptyMessage="No users found"
          />
        </div>

        {/* Deactivate Confirmation */}
        <ConfirmDialog
          isOpen={showDeactivateConfirm}
          title="Deactivate User"
          description={`Deactivate ${selectedUser?.name}? They will no longer be able to access the admin panel.`}
          isDangerous
          actionLabel="Deactivate"
          onConfirm={handleDeactivate}
          onCancel={() => setShowDeactivateConfirm(false)}
        />
      </div>
    </RoleGuard>
  )
}
