'use client'

import { useEffect, useState } from 'react'
import { adminMediaService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      resolve(result.split(',')[1] || '')
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export default function AdminMediaPage() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [category, setCategory] = useState('general')

  const loadData = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await adminMediaService.getMedia({ limit: 100 })
      setItems(data.items || [])
    } catch (err) {
      setError(err.message || 'Failed to load media')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const base64Data = await toBase64(file)
      await adminMediaService.uploadMedia({
        originalFileName: file.name,
        mimeType: file.type,
        base64Data,
        category,
      })
      setSuccess('Media uploaded successfully')
      loadData()
    } catch (err) {
      setError(err.message || 'Failed to upload media')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminMediaService.deleteMedia(id)
      setSuccess('Media deleted')
      loadData()
    } catch (err) {
      setError(err.message || 'Failed to delete media')
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600 mt-1">Upload and manage product images, thumbnails, videos, and files.</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="general">General</option>
            <option value="product">Product</option>
            <option value="course">Course</option>
            <option value="lesson">Lesson</option>
          </select>
          <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
            {isUploading ? 'Uploading...' : 'Upload'}
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      {isLoading ? (
        <div className="text-gray-600">Loading media...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <article key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900 break-all">{item.originalFileName}</p>
              <p className="text-xs text-gray-600 mt-1">{item.mimeType}</p>
              <p className="text-xs text-gray-600">{(item.sizeBytes / 1024).toFixed(1)} KB</p>
              <p className="text-xs text-gray-600">Category: {item.category}</p>
              <div className="mt-3 flex justify-between items-center">
                <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-700 text-sm hover:text-blue-900">
                  Open
                </a>
                <button onClick={() => handleDelete(item.id)} className="text-red-700 text-sm hover:text-red-900">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
