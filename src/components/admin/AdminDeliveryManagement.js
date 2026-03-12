// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADMIN DELIVERY STATUS MANAGEMENT COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useState } from 'react';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';

const VALID_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'PACKED',
  'SHIPPED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'FAILED',
  'RETURNED',
  'CANCELLED'
];

const STATUS_COLORS = {
  PENDING: 'bg-gray-100 text-gray-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PACKED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-800',
  DELIVERED: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  RETURNED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-100 text-gray-800'
};

export default function AdminDeliveryManagement({ orderId, currentStatus }) {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [carrierUrl, setCarrierUrl] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/delivery/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          status: newStatus,
          ...(trackingNumber && { trackingNumber }),
          ...(carrier && { carrier }),
          ...(carrierUrl && { carrierUrl }),
          ...(reason && { reason }),
          ...(notes && { notes })
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update delivery status');
      }

      setSuccess(true);
      setTrackingNumber('');
      setCarrier('');
      setCarrierUrl('');
      setReason('');
      setNotes('');

      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Manage Delivery Status</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">Delivery status updated successfully</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Status Badge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
          <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${STATUS_COLORS[currentStatus]}`}>
            {currentStatus}
          </div>
        </div>

        {/* New Status Selection */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Update Status To
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            {VALID_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Tracking Information */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Tracking Information</p>

          <div>
            <label htmlFor="trackingNumber" className="block text-sm text-gray-600 mb-1">
              Tracking Number
            </label>
            <input
              id="trackingNumber"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              disabled={isSubmitting}
              placeholder="e.g., 1Z999AA10123456784"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="carrier" className="block text-sm text-gray-600 mb-1">
                Carrier
              </label>
              <input
                id="carrier"
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                disabled={isSubmitting}
                placeholder="e.g., FedEx, UPS"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="carrierUrl" className="block text-sm text-gray-600 mb-1">
                Carrier Tracking URL
              </label>
              <input
                id="carrierUrl"
                type="url"
                value={carrierUrl}
                onChange={(e) => setCarrierUrl(e.target.value)}
                disabled={isSubmitting}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Status Update Notes</p>

          <div>
            <label htmlFor="reason" className="block text-sm text-gray-600 mb-1">
              Reason for Status Change
            </label>
            <input
              id="reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isSubmitting}
              placeholder="Why was the status changed?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm text-gray-600 mb-1">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
              placeholder="Any additional information about this delivery..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || newStatus === currentStatus}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
            Update Delivery Status
          </button>
        </div>

        {/* Status Rules Note */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-medium mb-1">Status Transition Rules:</p>
          <ul className="space-y-1 text-xs">
            <li>• PENDING → CONFIRMED → PACKED → SHIPPED</li>
            <li>• SHIPPED → OUT_FOR_DELIVERY → DELIVERED</li>
            <li>• Any status can be marked as CANCELLED (except completed states)</li>
            <li>• SHIPPED or OUT_FOR_DELIVERY can transition to FAILED</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
