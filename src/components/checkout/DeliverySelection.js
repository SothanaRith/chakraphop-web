// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DELIVERY SELECTION COMPONENT - CHECKOUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Truck, Clock, DollarSign } from 'lucide-react';

export default function DeliverySelection({
  addressId,
  orderSubtotal,
  onDeliverySelected,
  disabled = false,
  loading = false
}) {
  const [methods, setMethods] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available delivery methods when address or subtotal changes
  useEffect(() => {
    if (!addressId || !orderSubtotal) {
      setMethods([]);
      setSelected(null);
      return;
    }

    const fetchDeliveryMethods = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/delivery/methods?addressId=${addressId}&subtotal=${orderSubtotal * 100}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to load delivery methods');
        }

        const data = await response.json();
        setMethods(data.data || []);

        // Auto-select first method if only one available
        if (data.data?.length === 1) {
          setSelected(data.data[0].id);
          onDeliverySelected?.(data.data[0]);
        }
      } catch (err) {
        setError(err.message);
        setMethods([]);
        setSelected(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliveryMethods();
  }, [addressId, orderSubtotal, onDeliverySelected]);

  // Notify parent when selection changes
  useEffect(() => {
    if (selected && methods.length > 0) {
      const selectedMethod = methods.find(m => m.id === selected);
      if (selectedMethod) {
        onDeliverySelected?.(selectedMethod);
      }
    }
  }, [selected, methods, onDeliverySelected]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-900">Delivery Not Available</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (methods.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-600">No delivery methods available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <Truck className="w-5 h-5" />
        Select Delivery Method
      </h3>

      <div className="space-y-2">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition ${
              selected === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="radio"
              name="delivery-method"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              disabled={disabled || loading}
              className="mt-1 w-4 h-4 text-blue-600"
            />

            <div className="ml-3 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  {method.description && (
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm">
                {/* Estimated Days */}
                <div className="flex items-center gap-1 text-gray-700">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{method.estimatedDays} business days</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1 text-gray-700">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>${method.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Estimated Delivery Date */}
              {method.estimatedDeliveryDate && (
                <div className="mt-2 text-xs text-gray-500">
                  Estimated arrival:{' '}
                  <span className="font-medium text-gray-700">
                    {new Date(method.estimatedDeliveryDate.latest).toLocaleDateString(
                      'en-US',
                      { weekday: 'short', month: 'short', day: 'numeric' }
                    )}
                  </span>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      {methods.length === 1 && (
        <p className="text-xs text-gray-500 mt-2">
          Only one delivery method available for your location
        </p>
      )}
    </div>
  );
}
