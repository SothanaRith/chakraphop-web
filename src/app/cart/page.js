'use client'

import Link from 'next/link'
import PageWrapper from '@/components/ui/PageWrapper'
import EmptyState from '@/components/ui/EmptyState'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Badge from '@/components/ui/Badge'
import { useCart } from '@/contexts/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, Lock, Truck, Award } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem } = useCart()

  if (loading) {
    return (
      <PageWrapper>
        <div className="container-section py-20">
          <h1 className="text-display-sm mb-12">Shopping Cart</h1>
          <SkeletonLoader variant="cart-item" count={3} />
        </div>
      </PageWrapper>
    )
  }

  const isEmpty = !cart?.items || cart.items.length === 0

  return (
    <PageWrapper>
      <div className="container-section py-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-display-sm md:text-display-md mb-2">Shopping Cart</h1>
          <p className="text-body text-neutral-600">
            {!isEmpty && `${cart.items.length} ${cart.items.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {isEmpty ? (
          <div className="bg-white rounded-lg">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Start adding items to build your perfect athletic wardrobe"
              primaryButton={{
                label: "Browse Products",
                href: "/products"
              }}
              secondaryButton={{
                label: "View New Arrivals",
                href: "/products/new"
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-6 flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-neutral-100 rounded flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-body font-medium hover:text-neutral-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-body-sm text-neutral-500 mt-1">
                          {item.variant && `Size: ${item.variant.size} | Color: ${item.variant.color}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-50 rounded-l"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 h-10 flex items-center justify-center border-x border-neutral-300 text-body font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors rounded-r"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-body font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-body-sm text-neutral-500">
                            {formatPrice(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-8 h-fit sticky top-32">
              <h2 className="text-heading-lg font-medium mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between text-body">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {cart.shippingCost === 0 ? (
                      <Badge variant="success" size="sm">Free</Badge>
                    ) : (
                      formatPrice(cart.shippingCost)
                    )}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-body text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-{formatPrice(cart.discount)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between text-heading-md font-semibold mb-8">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full mb-3 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Secure Checkout
              </Link>
              <Link href="/products" className="btn-secondary w-full">
                Continue Shopping
              </Link>

              {/* Free Shipping Progress */}
              {cart.subtotal < 75 && (
                <div className="mt-6 p-4 bg-accent-primary/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-accent-primary" />
                    <p className="text-body-sm font-medium text-neutral-900">
                      Almost there!
                    </p>
                  </div>
                  <p className="text-body-sm text-neutral-700">
                    Add <span className="font-semibold text-accent-primary">{formatPrice(75 - cart.subtotal)}</span> more for free shipping
                  </p>
                  <div className="mt-3 w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-accent-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((cart.subtotal / 75) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-2 text-body-sm text-neutral-600">
                  <Lock className="w-4 h-4" />
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-neutral-600">
                  <Award className="w-4 h-4" />
                  <span>30-day return guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}