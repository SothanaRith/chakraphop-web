'use client'

import { useEffect, useState } from 'react'
import { adminOrdersService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert, WarningAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { Modal } from '@/components/admin/Modal'
import { RoleGuard } from '@/components/admin/RoleGuard'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [statusFilter])

  const loadOrders = async () => {
    try {
      setError('')
      setIsLoading(true)
      const params = statusFilter !== 'ALL' ? { status: statusFilter } : {}
      const data = await adminOrdersService.getOrders({ ...params, limit: 100 })
      setOrders(data.orders || data.items || [])
    } catch (err) {
      setError(err.message || 'Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    {
      key: 'orderNumber',
      label: 'Order',
      render: (order) => (
        <button
          onClick={() => {
            setSelectedOrder(order)
            setShowDetailModal(true)
          }}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {order.orderNumber}
        </button>
      ),
    },
    {
      key: 'customerEmail',
      label: 'Customer',
      render: (order) => order.customerEmail || order.email || 'N/A',
    },
    {
      key: 'status',
      label: 'Status',
      render: (order) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            order.status === 'DELIVERED'
              ? 'bg-green-100 text-green-800'
              : order.status === 'CANCELLED'
                ? 'bg-gray-100 text-gray-800'
                : order.status === 'PROCESSING'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {order.status}
        </span>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      render: (order) => <span>${order.total?.toFixed(2) || '0.00'}</span>,
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">View and manage customer orders</p>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {['ALL', 'PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={orders}
          isLoading={isLoading}
          searchableKeys={['orderNumber', 'customerEmail', 'email', 'status']}
          searchPlaceholder="Search orders by number, customer, status..."
          isEmpty={!isLoading && orders.length === 0}
          emptyMessage="No orders found"
        />
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={showDetailModal}
          order={selectedOrder}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedOrder(null)
          }}
          onSuccess={() => {
            setSuccess('Order updated successfully')
            loadOrders()
          }}
          onError={(msg) => setError(msg)}
        />
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ORDER DETAIL MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OrderDetailModal({ isOpen, order, onClose, onSuccess, onError }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showRefundConfirm, setShowRefundConfirm] = useState(false)
  const [cancelReason, setCancelReason] = useState('CUSTOMER_REQUEST')
  const [cancelNotes, setCancelNotes] = useState('')
  const [refundReason, setRefundReason] = useState('OTHER')
  const [refundNotes, setRefundNotes] = useState('')

  const handleCancelOrder = async () => {
    try {
      setIsSubmitting(true)
      await adminOrdersService.cancelOrder(order.id, {
        reason: cancelReason,
        notes: cancelNotes,
      })
      onSuccess()
      onClose()
    } catch (err) {
      onError(err.message || 'Failed to cancel order')
    } finally {
      setIsSubmitting(false)
      setShowCancelConfirm(false)
    }
  }

  const handleRefundOrder = async () => {
    try {
      setIsSubmitting(true)
      await adminOrdersService.refundOrder(order.id, {
        reason: refundReason,
        notes: refundNotes,
        refundAmount: order.total,
      })
      onSuccess()
      onClose()
    } catch (err) {
      onError(err.message || 'Failed to process refund')
    } finally {
      setIsSubmitting(false)
      setShowRefundConfirm(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <Modal isOpen={isOpen} title={`Order ${order.orderNumber}`} onClose={onClose} size="lg">
        <div className="space-y-6">
          {/* Order Status */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">Status</p>
                <p className="text-lg font-bold text-gray-900">{order.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">Total</p>
                <p className="text-lg font-bold text-gray-900">${order.total?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Items</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Product</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Qty</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2">{item.productName}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">${item.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Customer</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Email: {order.customerEmail}</p>
              <p>Phone: {order.customerPhone || 'N/A'}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Shipping Address</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>{order.shippingAddress?.street}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            {order.status !== 'CANCELLED' && (
              <RoleGuard requiredPermission="UPDATE_ORDER_STATUS">
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Cancel Order
                </button>
              </RoleGuard>
            )}

            <RoleGuard requiredRole="SUPER_ADMIN">
              {order.status === 'COMPLETED' && (
                <button
                  onClick={() => setShowRefundConfirm(true)}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                >
                  Process Refund
                </button>
              )}
            </RoleGuard>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Cancel Confirmation */}
      <ConfirmDialog
        isOpen={showCancelConfirm}
        title="Cancel Order"
        description={`Are you sure you want to cancel order ${order.orderNumber}? Stock will be released.`}
        isDangerous
        isLoading={isSubmitting}
        actionLabel="Cancel Order"
        onConfirm={handleCancelOrder}
        onCancel={() => setShowCancelConfirm(false)}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="CUSTOMER_REQUEST">Customer Request</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
              <option value="PAYMENT_FAILED">Payment Failed</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={cancelNotes}
              onChange={(e) => setCancelNotes(e.target.value)}
              placeholder="Explain why this order is being cancelled..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </ConfirmDialog>

      {/* Refund Confirmation */}
      <ConfirmDialog
        isOpen={showRefundConfirm}
        title="Process Refund"
        description={`Process ${order.total?.toFixed(2)} refund for order ${order.orderNumber}?`}
        isDangerous
        isLoading={isSubmitting}
        actionLabel="Process Refund"
        onConfirm={handleRefundOrder}
        onCancel={() => setShowRefundConfirm(false)}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <select
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="DEFECTIVE_PRODUCT">Defective Product</option>
              <option value="CUSTOMER_DISSATISFACTION">Customer Dissatisfaction</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={refundNotes}
              onChange={(e) => setRefundNotes(e.target.value)}
              placeholder="Explain reason for refund..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </ConfirmDialog>
    </>
  )
}
