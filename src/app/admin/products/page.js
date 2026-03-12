'use client'

import { useEffect, useState } from 'react'
import { adminProductsService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { RoleGuard } from '@/components/admin/RoleGuard'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [statusFilter, searchTerm])

  const loadProducts = async () => {
    try {
      setError('')
      setIsLoading(true)
      const params = {}

      if (statusFilter !== 'ALL') {
        params.status = statusFilter
      }
      if (searchTerm) {
        params.search = searchTerm
      }

      const data = await adminProductsService.getProducts({ ...params, limit: 100 })
      setProducts(data.products || data.items || [])
    } catch (err) {
      setError(err.message || 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchive = async () => {
    try {
      setError('')
      await adminProductsService.archiveProduct(selectedProduct.id)
      setSuccess('Product archived successfully')
      loadProducts()
      setShowArchiveConfirm(false)
    } catch (err) {
      setError(err.message || 'Failed to archive product')
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (product) => (
        <div>
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-500">{product.slug}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (product) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            product.status === 'ACTIVE'
              ? 'bg-green-100 text-green-800'
              : product.status === 'DRAFT'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {product.status}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (product) => `$${Number(product.basePrice || 0).toFixed(2)}`,
    },
    {
      key: 'totalStock',
      label: 'Stock',
      render: (product) => (
        <span className={product.totalStock < 10 ? 'font-bold text-red-600' : ''}>
          {product.totalStock || 0}
        </span>
      ),
    },
    {
      key: 'variants',
      label: 'Variants',
      render: (product) => product.variantCount || 0,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (product) => (
        <RoleGuard requiredPermission="EDIT_PRODUCTS">
          <div className="flex gap-2">
            <a
              href={`/admin/products/${product.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </a>
            {product.status !== 'ARCHIVED' && (
              <button
                onClick={() => {
                  setSelectedProduct(product)
                  setShowArchiveConfirm(true)
                }}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Archive
              </button>
            )}
          </div>
        </RoleGuard>
      ),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage product catalog</p>
        </div>
        <RoleGuard requiredPermission="EDIT_PRODUCTS">
          <a
            href="/admin/products/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + New Product
          </a>
        </RoleGuard>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          {['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={products}
          isLoading={isLoading}
          searchableKeys={['name', 'slug', 'status']}
          searchPlaceholder="Search products by name, slug, status..."
          isEmpty={!isLoading && products.length === 0}
          emptyMessage="No products found"
        />
      </div>

      {/* Archive Confirmation */}
      <ConfirmDialog
        isOpen={showArchiveConfirm}
        title="Archive Product"
        description={`Archive "${selectedProduct?.name}"? It will no longer be visible to customers.`}
        isDangerous
        actionLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setShowArchiveConfirm(false)}
      />
    </div>
  )
}
