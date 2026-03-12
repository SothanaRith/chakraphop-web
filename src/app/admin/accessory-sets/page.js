'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { adminAccessorySetsService } from '@/lib/api/admin'
import { productService } from '@/lib/api'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { Modal } from '@/components/admin/Modal'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { RoleGuard } from '@/components/admin/RoleGuard'

const setFormInitial = {
  name: '',
  slug: '',
  description: '',
  coverImageUrl: '',
  bundlePrice: '',
  status: 'DRAFT',
}

const itemFormInitial = {
  productId: '',
  quantity: '1',
  displayOrder: '0',
  note: '',
}

const unwrap = (payload) => payload?.data || payload || {}

export default function AccessorySetsPage() {
  const [sets, setSets] = useState([])
  const [products, setProducts] = useState([])
  const [selectedSet, setSelectedSet] = useState(null)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const [showSetModal, setShowSetModal] = useState(false)
  const [showItemModal, setShowItemModal] = useState(false)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
  const [setForm, setSetForm] = useState(setFormInitial)
  const [itemForm, setItemForm] = useState(itemFormInitial)
  const [editingSet, setEditingSet] = useState(null)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadProducts = useCallback(async () => {
    try {
      const response = await productService.getProducts({ limit: 200, status: 'ACTIVE' })
      setProducts(response?.data?.products || [])
    } catch (err) {
      console.error('Failed to load products for set mapping', err)
    }
  }, [])

  const loadSetDetail = useCallback(async (slug) => {
    if (!slug) return

    try {
      setIsDetailLoading(true)
      const response = await adminAccessorySetsService.getSetBySlug(slug)
      const data = unwrap(response)
      setSelectedSet(data)
    } catch (err) {
      setError(err.message || 'Failed to load set details')
    } finally {
      setIsDetailLoading(false)
    }
  }, [])

  const loadSets = useCallback(async () => {
    try {
      setError('')
      setIsLoading(true)
      const response = await adminAccessorySetsService.getSets({
        status: statusFilter,
        search: searchTerm || undefined,
      })
      const data = unwrap(response)
      const items = Array.isArray(data) ? data : data.items || data.sets || []
      setSets(items)

      if (selectedSet?.slug) {
        await loadSetDetail(selectedSet.slug)
      }
    } catch (err) {
      setError(err.message || 'Failed to load desk accessory sets')
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter, searchTerm, selectedSet?.slug, loadSetDetail])

  useEffect(() => {
    loadSets()
  }, [loadSets])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const filteredSets = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return sets

    return sets.filter((setItem) => {
      return (
        setItem.name?.toLowerCase().includes(q) ||
        setItem.slug?.toLowerCase().includes(q) ||
        setItem.description?.toLowerCase().includes(q)
      )
    })
  }, [sets, searchTerm])

  const openCreateSet = () => {
    setEditingSet(null)
    setSetForm(setFormInitial)
    setShowSetModal(true)
  }

  const openEditSet = (setItem) => {
    setEditingSet(setItem)
    setSetForm({
      name: setItem.name || '',
      slug: setItem.slug || '',
      description: setItem.description || '',
      coverImageUrl: setItem.coverImageUrl || '',
      bundlePrice: setItem.bundlePrice ? String(setItem.bundlePrice) : '',
      status: setItem.status || 'DRAFT',
    })
    setShowSetModal(true)
  }

  const saveSet = async () => {
    try {
      setSubmitting(true)
      setError('')

      const payload = {
        ...setForm,
        bundlePrice: setForm.bundlePrice ? Number(setForm.bundlePrice) : null,
      }

      if (editingSet?.id) {
        await adminAccessorySetsService.updateSet(editingSet.id, payload)
        setSuccess('Accessory set updated successfully')
      } else {
        await adminAccessorySetsService.createSet(payload)
        setSuccess('Accessory set created successfully')
      }

      setShowSetModal(false)
      await loadSets()
    } catch (err) {
      setError(err.message || 'Failed to save accessory set')
    } finally {
      setSubmitting(false)
    }
  }

  const openAddItem = () => {
    setItemForm({ ...itemFormInitial, displayOrder: String(selectedSet?.items?.length || 0) })
    setShowItemModal(true)
  }

  const saveItem = async () => {
    if (!selectedSet?.id) return

    try {
      setSubmitting(true)
      setError('')
      await adminAccessorySetsService.addItem(selectedSet.id, {
        productId: itemForm.productId,
        quantity: Number(itemForm.quantity || 1),
        displayOrder: Number(itemForm.displayOrder || 0),
        note: itemForm.note,
      })
      setSuccess('Item added to set successfully')
      setShowItemModal(false)
      await loadSetDetail(selectedSet.slug)
      await loadSets()
    } catch (err) {
      setError(err.message || 'Failed to add item to set')
    } finally {
      setSubmitting(false)
    }
  }

  const removeItem = async () => {
    if (!selectedSet?.id || !itemToRemove?.id) return

    try {
      setSubmitting(true)
      setError('')
      await adminAccessorySetsService.removeItem(selectedSet.id, itemToRemove.id)
      setSuccess('Item removed from set')
      setShowRemoveConfirm(false)
      await loadSetDetail(selectedSet.slug)
      await loadSets()
    } catch (err) {
      setError(err.message || 'Failed to remove item from set')
    } finally {
      setSubmitting(false)
      setItemToRemove(null)
    }
  }

  const setColumns = [
    {
      key: 'name',
      label: 'Set Name',
      render: (setItem) => (
        <button
          onClick={(event) => {
            event.stopPropagation()
            loadSetDetail(setItem.slug)
          }}
          className="text-left"
        >
          <p className="font-semibold text-gray-900 hover:text-blue-700">{setItem.name}</p>
          <p className="text-xs text-gray-500">/{setItem.slug}</p>
              {setItem.coverImageUrl && (
                <p className="text-xs text-gray-500 mt-1 truncate max-w-[240px]">Image: {setItem.coverImageUrl}</p>
              )}
        </button>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (setItem) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            setItem.status === 'ACTIVE'
              ? 'bg-green-100 text-green-800'
              : setItem.status === 'DRAFT'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {setItem.status}
        </span>
      ),
    },
    {
      key: 'bundlePrice',
      label: 'Bundle Price',
      render: (setItem) => (setItem.bundlePrice ? `$${Number(setItem.bundlePrice).toFixed(2)}` : '-'),
    },
    {
      key: 'itemCount',
      label: 'Items',
      render: (setItem) => setItem.itemCount || setItem.items?.length || 0,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (setItem) => (
        <RoleGuard requiredPermission="MANAGE_ACCESSORY_SETS">
          <button
            onClick={(event) => {
              event.stopPropagation()
              openEditSet(setItem)
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
          <h1 className="text-3xl font-bold text-gray-900">Desk Accessory Sets</h1>
          <p className="text-gray-600 mt-1">Group desk accessories into curated sets and attach products to each set.</p>
        </div>

        <RoleGuard requiredPermission="MANAGE_ACCESSORY_SETS">
          <button
            onClick={openCreateSet}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + New Set
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
              placeholder="Search set by name or slug"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <div className="flex gap-2 flex-wrap">
              {['ALL', 'DRAFT', 'ACTIVE', 'ARCHIVED'].map((status) => (
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
            columns={setColumns}
            data={filteredSets}
            isLoading={isLoading}
            isEmpty={!isLoading && filteredSets.length === 0}
            emptyMessage="No desk accessory sets found"
            onRowClick={(setItem) => loadSetDetail(setItem.slug)}
          />
        </section>

        <section className="bg-white rounded-lg shadow p-5">
          {!selectedSet ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Select a set to view or manage its items.
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs uppercase text-gray-500">Selected Set</p>
                  <h2 className="text-xl font-bold text-gray-900">{selectedSet.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">/{selectedSet.slug}</p>
                </div>
                <RoleGuard requiredPermission="MANAGE_ACCESSORY_SETS">
                  <button
                    onClick={openAddItem}
                    className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    + Add Item
                  </button>
                </RoleGuard>
              </div>

              <p className="text-sm text-gray-600 mb-3">{selectedSet.description || 'No description added yet.'}</p>

              <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {selectedSet.coverImageUrl ? (
                  <img
                    src={selectedSet.coverImageUrl}
                    alt={selectedSet.name}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                )}
              </div>

              {isDetailLoading ? (
                <p className="text-sm text-gray-500">Loading set items...</p>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {(selectedSet.items || []).length === 0 && (
                    <p className="text-sm text-gray-500">No items in this set yet.</p>
                  )}

                  {(selectedSet.items || []).map((item) => (
                    <article key={item.id} className="border border-gray-200 rounded p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Qty: {item.quantity} • Order: {item.displayOrder}
                          </p>
                          {item.note && <p className="text-xs text-gray-600 mt-1">{item.note}</p>}
                        </div>
                        <RoleGuard requiredPermission="MANAGE_ACCESSORY_SETS">
                          <button
                            onClick={() => {
                              setItemToRemove(item)
                              setShowRemoveConfirm(true)
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </RoleGuard>
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
        isOpen={showSetModal}
        title={editingSet ? 'Edit Accessory Set' : 'Create Accessory Set'}
        onClose={() => setShowSetModal(false)}
        size="lg"
      >
        <div className="space-y-3">
          <Field label="Set Name">
            <input
              value={setForm.name}
              onChange={(event) => setSetForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <Field label="Slug">
            <input
              value={setForm.slug}
              onChange={(event) => setSetForm((prev) => ({ ...prev, slug: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              value={setForm.description}
              onChange={(event) => setSetForm((prev) => ({ ...prev, description: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <Field label="Cover Image URL">
            <input
              type="url"
              placeholder="https://images.example.com/desk-set.jpg"
              value={setForm.coverImageUrl}
              onChange={(event) => setSetForm((prev) => ({ ...prev, coverImageUrl: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Bundle Price">
              <input
                type="number"
                min="0"
                step="0.01"
                value={setForm.bundlePrice}
                onChange={(event) => setSetForm((prev) => ({ ...prev, bundlePrice: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>

            <Field label="Status">
              <select
                value={setForm.status}
                onChange={(event) => setSetForm((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </Field>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowSetModal(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={saveSet}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : editingSet ? 'Update Set' : 'Create Set'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showItemModal} title="Add Item To Set" onClose={() => setShowItemModal(false)}>
        <div className="space-y-3">
          <Field label="Product">
            <select
              value={itemForm.productId}
              onChange={(event) => setItemForm((prev) => ({ ...prev, productId: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Quantity">
              <input
                type="number"
                min="1"
                value={itemForm.quantity}
                onChange={(event) => setItemForm((prev) => ({ ...prev, quantity: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>

            <Field label="Display Order">
              <input
                type="number"
                min="0"
                value={itemForm.displayOrder}
                onChange={(event) => setItemForm((prev) => ({ ...prev, displayOrder: event.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </Field>
          </div>

          <Field label="Note">
            <textarea
              rows={2}
              value={itemForm.note}
              onChange={(event) => setItemForm((prev) => ({ ...prev, note: event.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowItemModal(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={saveItem}
              disabled={submitting || !itemForm.productId}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Add Item'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={showRemoveConfirm}
        title="Remove set item"
        description={`Remove "${itemToRemove?.productName || 'this item'}" from the set?`}
        isDangerous
        isLoading={submitting}
        actionLabel="Remove"
        onConfirm={removeItem}
        onCancel={() => {
          setShowRemoveConfirm(false)
          setItemToRemove(null)
        }}
      />
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
