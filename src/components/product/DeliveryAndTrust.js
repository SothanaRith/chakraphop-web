'use client'

import { useState } from 'react'
import { Truck, Shield, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react'

/**
 * DeliveryAndTrust Component
 * 
 * Displays delivery estimates, return policy, and trust indicators
 * Reduces purchase anxiety and increases confidence
 */
export default function DeliveryAndTrust({ 
  shippingEstimate, 
  returnPolicy,
  stockStatus = 'in-stock' 
}) {
  const [zipCode, setZipCode] = useState('')
  const [deliveryEstimate, setDeliveryEstimate] = useState(null)

  const checkDelivery = () => {
    // In production, call API with zipCode
    setDeliveryEstimate({
      standard: 'Feb 8-10',
      express: 'Feb 6'
    })
  }

  return (
    <div className="space-y-6">
      {/* Stock Status */}
      <div className="flex items-start gap-3">
        {stockStatus === 'in-stock' && (
          <>
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-body font-medium text-green-700">In Stock</p>
              <p className="text-body-sm text-neutral-600">Ready to ship</p>
            </div>
          </>
        )}
        {stockStatus === 'low-stock' && (
          <>
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-body font-medium text-amber-700">Low Stock</p>
              <p className="text-body-sm text-neutral-600">Order soon</p>
            </div>
          </>
        )}
        {stockStatus === 'out-of-stock' && (
          <>
            <AlertCircle className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-body font-medium text-neutral-700">Out of Stock</p>
              <p className="text-body-sm text-neutral-600">Notify when available</p>
            </div>
          </>
        )}
      </div>

      {/* Delivery Estimate Calculator */}
      <div className="p-4 bg-neutral-50 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Truck className="w-5 h-5 text-neutral-700" />
          <h3 className="text-body font-semibold">Delivery Estimate</h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
            maxLength={5}
          />
          <button
            onClick={checkDelivery}
            disabled={zipCode.length < 5}
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-body-sm font-medium"
          >
            Check
          </button>
        </div>
        {deliveryEstimate && (
          <div className="mt-4 space-y-2 text-body-sm animate-fade-in">
            <p className="flex justify-between">
              <span className="text-neutral-600">Standard (Free)</span>
              <span className="font-medium">{deliveryEstimate.standard}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-neutral-600">Express ($9.99)</span>
              <span className="font-medium">{deliveryEstimate.express}</span>
            </p>
          </div>
        )}
      </div>

      {/* Trust Badges - Compact */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-neutral-600 flex-shrink-0" />
          <div>
            <p className="text-body-sm font-medium">Secure Checkout</p>
            <p className="text-caption text-neutral-600">SSL encrypted payment</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-5 h-5 text-neutral-600 flex-shrink-0" />
          <div>
            <p className="text-body-sm font-medium">
              {returnPolicy?.days || 60}-Day Returns
            </p>
            <p className="text-caption text-neutral-600">Free returns on all orders</p>
          </div>
        </div>
      </div>
    </div>
  )
}
