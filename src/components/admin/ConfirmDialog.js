'use client'

import { useState } from 'react'

export function ConfirmDialog({
  isOpen,
  title,
  description,
  actionLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
  children,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>

        {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}

        {children && <div className="mb-4 text-sm text-gray-700">{children}</div>}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Loading...' : actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
