'use client'

import { useState } from 'react'
import { ShoppingBag, Heart, Star, TrendingUp } from 'lucide-react'
import VariantSelector from './VariantSelector'
import DeliveryAndTrust from './DeliveryAndTrust'

/**
 * ProductInfo Component (UPGRADED)
 * 
 * Core purchase decision interface with:
 * - Clear product identity and pricing
 * - Variant selection with validation
 * - Strong CTA with error prevention
 * - Trust indicators
 * - Wishlist functionality
 */
export default function ProductInfo({ product, onAddToCart, onAddToWishlist }) {
  const [selectedVariants, setSelectedVariants] = useState({
    color: null,
    size: null,
  })
  const [quantity, setQuantity] = useState(1)
  const [showErrors, setShowErrors] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleVariantChange = (type, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }))
    setShowErrors(false) // Clear errors when user makes selection
  }

  const canAddToCart = () => {
    return selectedVariants.color && selectedVariants.size && quantity > 0
  }

  const handleAddToCart = async () => {
    if (!canAddToCart()) {
      setShowErrors(true)
      return
    }

    setIsAdding(true)
    try {
      // Call API or context to add to cart
      if (onAddToCart) {
        await onAddToCart({
          product,
          variants: selectedVariants,
          quantity
        })
      }
      // Show success feedback (could use toast notification)
      console.log('Added to cart:', { product, selectedVariants, quantity })
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product)
    }
  }

  // Calculate stock status
  const getStockStatus = () => {
    if (!product.variants) return 'in-stock'
    
    const currentVariant = product.variants.find(
      v => v.color === selectedVariants.color && v.size === selectedVariants.size
    )
    
    if (!currentVariant) return 'in-stock'
    if (currentVariant.stock === 0) return 'out-of-stock'
    if (currentVariant.stock < 5) return 'low-stock'
    return 'in-stock'
  }

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div>
        {/* Category & Badges */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-body-sm text-neutral-500 uppercase tracking-wide">
            {product.category}
          </span>
          {product.isNew && (
            <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-caption font-medium uppercase tracking-wide rounded">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-1 bg-neutral-900 text-white text-caption font-medium uppercase tracking-wide rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Bestseller
            </span>
          )}
        </div>

        {/* Product Name */}
        <h1 className="text-heading-xl md:text-display-sm mb-3">
          {product.name}
        </h1>

        {/* Short Description / Tagline */}
        {product.tagline && (
          <p className="text-body-lg text-neutral-600 mb-4">
            {product.tagline}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-neutral-900 text-neutral-900'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-body text-neutral-600">
              {product.rating} ({product.reviewCount || 0} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-display-sm font-semibold">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-body-lg text-neutral-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-body-sm font-semibold rounded">
                Save ${product.originalPrice - product.price}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200" />

      {/* Variant Selection */}
      <VariantSelector
        product={product}
        selectedVariants={selectedVariants}
        onVariantChange={handleVariantChange}
        showErrors={showErrors}
      />

      {/* Quantity */}
      <div>
        <label className="text-body font-semibold block mb-4">Quantity</label>
        <div className="inline-flex border-2 border-neutral-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors text-body-lg font-medium"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 h-12 text-center border-x-2 border-neutral-300 focus:outline-none text-body font-medium"
            aria-label="Quantity"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors text-body-lg font-medium"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Primary CTA Zone */}
      <div className="space-y-3 pt-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding || getStockStatus() === 'out-of-stock'}
          className={`btn w-full text-body-lg h-14 ${
            canAddToCart() && getStockStatus() !== 'out-of-stock'
              ? 'btn-primary'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          {isAdding ? 'Adding...' : getStockStatus() === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <button
          onClick={handleWishlist}
          className="btn btn-ghost w-full text-body-lg h-14"
        >
          <Heart className="w-5 h-5 mr-2" />
          Add to Wishlist
        </button>

        {/* Error message if validation fails */}
        {showErrors && !canAddToCart() && (
          <p className="text-body-sm text-accent-primary text-center animate-fade-in">
            Please select {!selectedVariants.color ? 'a color' : ''} 
            {!selectedVariants.color && !selectedVariants.size ? ' and ' : ''}
            {!selectedVariants.size ? 'a size' : ''}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200" />

      {/* Delivery & Trust */}
      <DeliveryAndTrust
        shippingEstimate={product.shippingEstimate}
        returnPolicy={product.returnPolicy}
        stockStatus={getStockStatus()}
      />
    </div>
  )
}
