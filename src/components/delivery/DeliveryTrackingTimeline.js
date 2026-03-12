// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DELIVERY TRACKING TIMELINE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useEffect, useState } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  MapPin,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

const statusConfig = {
  PENDING: {
    icon: Clock,
    label: 'Pending',
    color: 'gray',
    description: 'Order received and being prepared'
  },
  CONFIRMED: {
    icon: CheckCircle2,
    label: 'Confirmed',
    color: 'blue',
    description: 'Order confirmed and ready for packing'
  },
  PACKED: {
    icon: Package,
    label: 'Packed',
    color: 'blue',
    description: 'Items packed and ready to ship'
  },
  SHIPPED: {
    icon: Truck,
    label: 'Shipped',
    color: 'purple',
    description: 'Package picked up by carrier'
  },
  OUT_FOR_DELIVERY: {
    icon: MapPin,
    label: 'Out for Delivery',
    color: 'orange',
    description: 'Package on its way to you'
  },
  DELIVERED: {
    icon: CheckCircle2,
    label: 'Delivered',
    color: 'green',
    description: 'Package successfully delivered'
  },
  FAILED: {
    icon: AlertCircle,
    label: 'Delivery Failed',
    color: 'red',
    description: 'Delivery attempt failed'
  },
  RETURNED: {
    icon: AlertCircle,
    label: 'Returned',
    color: 'red',
    description: 'Package returned to sender'
  },
  CANCELLED: {
    icon: AlertCircle,
    label: 'Cancelled',
    color: 'gray',
    description: 'Delivery cancelled'
  }
};

export default function DeliveryTrackingTimeline({ orderId }) {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedTrackingNumber, setCopiedTrackingNumber] = useState(false);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await fetch(`/api/delivery/track/${orderId}`);

        if (!response.ok) {
          throw new Error('Failed to load delivery tracking');
        }

        const data = await response.json();
        setTracking(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchTracking();
      // Refresh every 60 seconds
      const interval = setInterval(fetchTracking, 60000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  const copyTrackingNumber = () => {
    if (tracking?.trackingNumber) {
      navigator.clipboard.writeText(tracking.trackingNumber);
      setCopiedTrackingNumber(true);
      setTimeout(() => setCopiedTrackingNumber(false), 2000);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading delivery information...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">No delivery information available</p>
      </div>
    );
  }

  const currentConfig = statusConfig[tracking.currentStatus] || statusConfig.PENDING;
  const CurrentIcon = currentConfig.icon;

  const colorClasses = {
    gray: 'text-gray-600 bg-gray-100',
    blue: 'text-blue-600 bg-blue-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100',
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100'
  };

  const timelineOrder = [
    'PENDING',
    'CONFIRMED',
    'PACKED',
    'SHIPPED',
    'OUT_FOR_DELIVERY',
    'DELIVERED'
  ];

  const getStatusProgress = () => {
    const statusIndex = timelineOrder.indexOf(tracking.currentStatus);
    return statusIndex >= 0 ? ((statusIndex + 1) / timelineOrder.length) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <div className={`p-6 rounded-lg border-2 ${colorClasses[currentConfig.color]}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <CurrentIcon className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold">{currentConfig.label}</h3>
              <p className="text-sm mt-1">{currentConfig.description}</p>
              {tracking.lastUpdate && (
                <p className="text-xs mt-2 opacity-75">
                  Last updated: {new Date(tracking.lastUpdate).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Number & Carrier */}
      {(tracking.trackingNumber || tracking.carrier) && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
          <h4 className="font-semibold text-gray-900">Tracking Information</h4>

          {tracking.trackingNumber && (
            <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
              <div>
                <p className="text-xs text-gray-600">Tracking Number</p>
                <p className="font-mono font-semibold text-gray-900">{tracking.trackingNumber}</p>
              </div>
              <button
                onClick={copyTrackingNumber}
                className="p-2 hover:bg-gray-100 rounded transition"
                title="Copy tracking number"
              >
                {copiedTrackingNumber ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          )}

          {tracking.carrier && (
            <div className="p-3 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-600">Carrier</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-gray-900">{tracking.carrier}</p>
                {tracking.carrierUrl && (
                  <a
                    href={tracking.carrierUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Track <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      {tracking.statusHistory?.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Status History</h4>

          <div className="space-y-3">
            {tracking.statusHistory.map((entry, index) => (
              <div key={index} className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  {index < tracking.statusHistory.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mt-1"></div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-4">
                  <p className="font-medium text-gray-900">
                    {statusConfig[entry.toStatus]?.label || entry.toStatus}
                  </p>

                  {entry.reason && (
                    <p className="text-sm text-gray-600 mt-1">{entry.reason}</p>
                  )}

                  {entry.notes && (
                    <p className="text-sm text-gray-500 mt-2 italic">{entry.notes}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(entry.changedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Address */}
      {tracking.shippingAddress && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Shipping To
          </h4>

          <div className="mt-3 space-y-1 text-sm text-gray-700">
            <p className="font-medium">{tracking.shippingAddress.fullName}</p>
            <p>{tracking.shippingAddress.addressLine1}</p>
            {tracking.shippingAddress.addressLine2 && (
              <p>{tracking.shippingAddress.addressLine2}</p>
            )}
            <p>
              {tracking.shippingAddress.city}, {tracking.shippingAddress.state}{' '}
              {tracking.shippingAddress.postalCode}
            </p>
            <p>{tracking.shippingAddress.country}</p>
            {tracking.shippingAddress.phone && (
              <p className="text-gray-600 mt-2">Phone: {tracking.shippingAddress.phone}</p>
            )}
          </div>
        </div>
      )}

      {/* Delivery Method Info */}
      {tracking.deliveryMethod && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Delivery Method
          </h4>
          <p className="text-sm text-blue-800 mt-2">{tracking.deliveryMethod.name}</p>
          {tracking.deliveryMethod.description && (
            <p className="text-xs text-blue-700 mt-1">{tracking.deliveryMethod.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
