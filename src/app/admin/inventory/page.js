'use client'

import { useEffect, useState } from 'react'
import { adminInventoryService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert, WarningAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { Modal } from '@/components/admin/Modal'
import { RoleGuard } from '@/components/admin/RoleGuard'

export default function InventoryPage() {
  const [stockItems, setStockItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showAdjustModal, setShowAdjustModal] = useState(false)

  useEffect(() => {
    loadInventory()
  }, [])

  const loadInventory = async () => {
    try {
      setError('')
      setIsLoading(true)
      const data = await adminInventoryService.getStockList({ limit: 100 })
        setStockItems(data.items || data.products || [])
    } catch (err) {
      setError(err.message || 'Failed to load inventory')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenAdjust = (item) => {
    setSelectedItem(item)
    setShowAdjustModal(true)
  }

  const columns = [
    {
      key: 'sku',
      label: 'SKU',
    },
    {
      key: 'variantName',
      label: 'Variant',
        render: (item) => item.productName || item.name || item.sku,
    },
    {
      key: 'quantity',
      label: 'Current Stock',
      render: (item) => (
        <span
          className={
              (item.stockQuantity ?? item.quantity ?? 0) < (item.lowStockThreshold ?? 10)
              ? 'font-bold text-red-600'
              : 'text-gray-900'
          }
        >
            {item.stockQuantity ?? item.quantity ?? 0}
            {(item.stockQuantity ?? item.quantity ?? 0) < (item.lowStockThreshold ?? 10) && (
            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
              LOW
            </span>
          )}
        </span>
      ),
    },
    {
      key: 'lowStockThreshold',
      label: 'Threshold',
    },
    {
      key: 'reserved',
      label: 'Reserved',
    },
    {
      key: 'available',
      label: 'Available',
        render: (item) => <span className="font-medium">{(item.stockQuantity ?? item.quantity ?? 0) - (item.reserved || 0)}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <RoleGuard requiredPermission="ADJUST_INVENTORY">
          <button
            onClick={() => handleOpenAdjust(item)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Adjust
          </button>
        </RoleGuard>
      ),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-1">Manage stock levels and track movements</p>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      {/* Low stock warning */}
      {stockItems.filter((item) => (item.stockQuantity ?? item.quantity ?? 0) < (item.lowStockThreshold ?? 10)).length > 0 && (
        <WarningAlert
          title="Low Stock Alert"
          message={`${stockItems.filter((item) => (item.stockQuantity ?? item.quantity ?? 0) < (item.lowStockThreshold ?? 10)).length} items are below the low stock threshold`}
          onDismiss={null}
        />
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={stockItems}
          isLoading={isLoading}
          searchableKeys={['sku', 'productName', 'name']}
          searchPlaceholder="Search inventory by SKU or product..."
          isEmpty={!isLoading && stockItems.length === 0}
          emptyMessage="No inventory items found"
        />
      </div>

      {/* Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={showAdjustModal}
        item={selectedItem}
        onClose={() => {
          setShowAdjustModal(false)
          setSelectedItem(null)
        }}
        onSuccess={() => {
          setSuccess('Stock adjusted successfully')
          loadInventory()
          setShowAdjustModal(false)
        }}
        onError={(msg) => {
          setError(msg)
        }}
      />
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STOCK ADJUSTMENT MODAL COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StockAdjustmentModal({ isOpen, item, onClose, onSuccess, onError }) {
  const [adjustment, setAdjustment] = useState('')
  const [reason, setReason] = useState('OTHER')
  const [notes, setNotes] = useState('')
  const [requiresApproval, setRequiresApproval] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [validationError, setValidationError] = useState('')

  const handleSubmit = async () => {
    // Validation
    if (!adjustment || adjustment === '0') {
      setValidationError('Please enter an adjustment amount')
      return
    }

    if (!reason) {
      setValidationError('Please select a reason')
      return
    }

    const adjustmentNum = parseInt(adjustment)
    const willResult = (item?.quantity || 0) + adjustmentNum

    if (willResult < 0) {
      setValidationError(`Cannot reduce stock below 0. Current: ${item?.quantity}, Adjustment: ${adjustment}`)
      return
    }

    setValidationError('')
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true)
      await adminInventoryService.adjustStock({
        variantId: item.id,
        adjustment: parseInt(adjustment),
        reason,
        notes,
        requiresApproval,
      })

      onSuccess()
      resetForm()
    } catch (err) {
      onError(err.message || 'Failed to adjust stock')
    } finally {
      setIsSubmitting(false)
      setShowConfirm(false)
    }
  }

  const resetForm = () => {
    setAdjustment('')
    setReason('OTHER')
    setNotes('')
    setRequiresApproval(true)
    setValidationError('')
  }

  if (!isOpen || !item) return null

  const newStock = (item.quantity || 0) + parseInt(adjustment || 0)
  const isIncrease = parseInt(adjustment || 0) > 0

  return (
    <>
      <Modal isOpen={isOpen} title="Adjust Stock" onClose={onClose} size="lg">
        <div className="space-y-6">
          {/* Current Stock Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-blue-700 font-medium">Current Stock</p>
                <p className="text-2xl font-bold text-blue-900">{item.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Adjustment</p>
                <p className="text-2xl font-bold text-blue-900">
                  {adjustment ? (parseInt(adjustment) > 0 ? '+' : '') + adjustment : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">New Stock</p>
                <p
                  className={`text-2xl font-bold ${
                    newStock < 0 ? 'text-red-900' : 'text-blue-900'
                  }`}
                >
                  {newStock}
                </p>
              </div>
            </div>
          </div>

          {/* Adjustment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Amount *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                placeholder="Enter amount (+ or -)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() =>
                  setAdjustment((parseInt(adjustment || 0) * -1).toString())
                }
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                ↔️ Reverse
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Use - for decrease, + for increase</p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason * (CRITICAL: Explain why)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="OTHER">-- Select Reason --</option>
              <option value="DAMAGE">Damage/Defect</option>
              <option value="LOSS">Loss/Shrinkage</option>
              <option value="RECOUNT">Physical Count/Recount</option>
              <option value="RETURN">Customer Return</option>
              <option value="ADJUSTMENT">Inventory Correction</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Include reference, photos, details)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Physical count by Jane on 2024-01-15, 5 units found damaged, photos in system..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Approval */}
          <RoleGuard requiredRole="ADMIN">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="approval"
                checked={requiresApproval}
                onChange={(e) => setRequiresApproval(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="approval" className="text-sm text-gray-700">
                Requires admin approval (pending until reviewed)
              </label>
            </div>
          </RoleGuard>

          {/* Validation Error */}
          {validationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{validationError}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              Review Adjustment
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="Confirm Stock Adjustment"
        description={`Adjust ${item?.variantName} stock by ${
          parseInt(adjustment) > 0 ? '+' : ''
        }${adjustment}?`}
        isDangerous={parseInt(adjustment || 0) < 0}
        isLoading={isSubmitting}
        actionLabel="Confirm Adjustment"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      >
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Reason:</span>
            <span className="font-medium">{reason}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Stock:</span>
            <span className="font-medium">{item?.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span>New Stock:</span>
            <span className="font-medium">{newStock}</span>
          </div>
          {notes && (
            <div>
              <span className="block">Notes: {notes}</span>
            </div>
          )}
        </div>
      </ConfirmDialog>
    </>
  )
}
