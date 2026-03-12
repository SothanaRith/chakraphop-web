'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import Input from '@/components/ui/Input'
import LoadingButton from '@/components/ui/LoadingButton'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { orderService } from '@/lib/api/orders'
import { MapPin, Calendar, Package, CheckCircle, Truck, Clock, Search } from 'lucide-react'

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [email, setEmail] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setSearched(true)

    try {
      const response = await orderService.trackOrder({
        trackingNumber,
        email
      })
      setOrderData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to find order. Please check your details and try again.')
      setOrderData(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-neutral-100 text-neutral-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    return colors[status] || colors.pending
  }

  const getStatusIcon = (status) => {
    if (status === 'delivered') return <CheckCircle className="w-5 h-5" />
    if (status === 'shipped') return <Package className="w-5 h-5" />
    if (status === 'processing') return <Package className="w-5 h-5" />
    return <Calendar className="w-5 h-5" />
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Track Your Shipment"
        description="Enter your order details to get real-time updates on your package location and estimated delivery."
        breadcrumbs={['Home', 'Support', 'Track Order']}
      />

      <PageSection className="bg-white">
        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <form onSubmit={handleTrackOrder} className="mb-12 pb-12 border-b border-neutral-200 bg-white rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-heading-lg font-semibold mb-2">Find Your Order</h3>
              <p className="text-body text-neutral-600">
                Enter your order number and email to view tracking details
              </p>
            </div>
            
            <div className="space-y-5">
              <Input
                id="trackingNumber"
                type="text"
                label="Order Number"
                icon={Package}
                placeholder="e.g., ORD-20240101-12345"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                hint="Found in your order confirmation email"
                required
              />

              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                hint="Email used when placing the order"
                error={error}
                required
              />

              <LoadingButton
                type="submit"
                loading={loading}
                className="w-full mt-6"
              >
                <Search className="w-4 h-4 mr-2" />
                Track Order
              </LoadingButton>
            </div>
          </form>

          {/* Results */}
          {searched && !error && orderData && (
            <div className="space-y-10">
              {/* Order Summary */}
              <div className="bg-neutral-50 p-8 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-heading-xl font-semibold">Order Details</h3>
                  <Badge 
                    variant={orderData.status === 'delivered' ? 'success' : orderData.status === 'shipped' ? 'primary' : 'default'}
                    size="md"
                  >
                    <span className="flex items-center gap-1.5">
                      {getStatusIcon(orderData.status)}
                      {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                    </span>
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-body-sm text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Package className="w-4 h-4" />
                      Order Number
                    </p>
                    <p className="text-body-lg font-semibold">{orderData.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-body-sm text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Order Date
                    </p>
                    <p className="text-body-lg font-semibold">
                      {new Date(orderData.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-body-sm text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Estimated Delivery
                    </p>
                    <p className="text-body-lg font-semibold">
                      {orderData.estimatedDelivery ? new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Calculating...'}
                    </p>
                  </div>
                  {orderData.trackingUrl && (
                    <div>
                      <p className="text-body-sm text-neutral-500 mb-2">Carrier Tracking</p>
                      <a href={orderData.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-body-lg font-semibold text-accent-primary hover:underline">
                        View on Carrier Site →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              {orderData.timeline && (
                <div>
                  <h3 className="text-heading-md font-medium mb-6">Shipment Timeline</h3>
                  <div className="space-y-4">
                    {orderData.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.completed ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
                          }`}>
                            {getStatusIcon(event.status)}
                          </div>
                          {idx !== orderData.timeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-neutral-200 mt-2"></div>
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-body font-medium">{event.title}</p>
                          <p className="text-caption text-neutral-500">{event.description}</p>
                          <p className="text-caption text-neutral-500 mt-1">
                            {new Date(event.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              {orderData.shippingAddress && (
                <div>
                  <h3 className="text-heading-md font-medium mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </h3>
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <p className="text-body">
                      {orderData.shippingAddress.street}<br />
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}<br />
                      {orderData.shippingAddress.country}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {searched && !error && !orderData && (
            <div className="text-center py-12">
              <p className="text-heading-md text-neutral-600">No matching order found.</p>
            </div>
          )}
        </div>
      </PageSection>
    </main>
  )
}
