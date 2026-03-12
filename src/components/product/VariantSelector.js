'use client'

import { useState } from 'react'
import { Ruler, AlertCircle } from 'lucide-react'

/**
 * VariantSelector Component
 * 
 * Handles size, color, and variant selection with:
 * - Clear visual states (selected, disabled, available)
 * - Stock validation
 * - Error prevention
 * - Inline guidance
 */
export default function VariantSelector({ 
  product, 
  selectedVariants, 
  onVariantChange,
  showErrors = false 
}) {
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  // Check if size is available based on color selection
  const isSizeAvailable = (size) => {
    if (!selectedVariants.color) return true
    const variant = product.variants?.find(
      v => v.color === selectedVariants.color && v.size === size
    )
    return variant && variant.stock > 0
  }

  // Check if color is available based on size selection
  const isColorAvailable = (color) => {
    if (!selectedVariants.size) return true
    const variant = product.variants?.find(
      v => v.size === selectedVariants.size && v.color === color
    )
    return variant && variant.stock > 0
  }

  // Get stock level for current selection
  const getCurrentStock = () => {
    if (!selectedVariants.color || !selectedVariants.size) return null
    const variant = product.variants?.find(
      v => v.color === selectedVariants.color && v.size === selectedVariants.size
    )
    return variant?.stock || 0
  }

  const stockLevel = getCurrentStock()

  return (
    <div className="space-y-8">
      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-body font-semibold">
            Color: {selectedVariants.color ? (
              <span className="font-normal text-neutral-600">
                {product.colors.find(c => c.id === selectedVariants.color)?.name}
              </span>
            ) : (
              <span className="font-normal text-neutral-400">Select a color</span>
            )}
          </label>
          {showErrors && !selectedVariants.color && (
            <span className="text-caption text-accent-primary flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Required
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => {
            const available = isColorAvailable(color.id)
            const selected = selectedVariants.color === color.id
            
            return (
              <button
                key={color.id}
                onClick={() => available && onVariantChange('color', color.id)}
                disabled={!available}
                className={`
                  relative w-14 h-14 rounded-full transition-all duration-200 focus-ring
                  ${selected ? 'scale-110' : 'hover:scale-105'}
                  ${!available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{
                  backgroundColor: color.hex,
                  boxShadow: selected
                    ? '0 0 0 3px var(--color-accent-primary), 0 0 0 5px #ffffff'
                    : undefined,
                }}
                aria-label={`${color.name}${!available ? ' (Out of stock)' : ''}`}
                title={color.name}
              >
                {!available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-neutral-900 rotate-45" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-body font-semibold">
            Size: {selectedVariants.size ? (
              <span className="font-normal text-neutral-600">{selectedVariants.size}</span>
            ) : (
              <span className="font-normal text-neutral-400">Select a size</span>
            )}
          </label>
          <div className="flex items-center gap-4">
            {showErrors && !selectedVariants.size && (
              <span className="text-caption text-accent-primary flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Required
              </span>
            )}
            <button 
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1 focus-ring rounded"
            >
              <Ruler className="w-4 h-4" />
              Size Guide
            </button>
          </div>
        </div>

        {/* Size Guide Hint */}
        {product.sizeGuide && (
          <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
            <p className="text-body-sm text-neutral-700">
              <span className="font-medium">Fit:</span> {product.sizeGuide.fit || 'True to size'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {product.sizes.map((size) => {
            const available = isSizeAvailable(size)
            const selected = selectedVariants.size === size
            
            return (
              <button
                key={size}
                onClick={() => available && onVariantChange('size', size)}
                disabled={!available}
                className={`
                  relative py-4 text-body font-medium border-2 transition-all duration-200 focus-ring
                  ${selected 
                    ? 'border-accent-primary bg-accent-primary/5 text-accent-primary' 
                    : available
                      ? 'border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
                  }
                `}
                aria-label={`Size ${size}${!available ? ' (Out of stock)' : ''}`}
              >
                {size}
                {!available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-neutral-300 rotate-45" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Stock Indicator */}
        {stockLevel !== null && stockLevel < 5 && stockLevel > 0 && (
          <p className="mt-3 text-body-sm text-amber-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Only {stockLevel} left in stock
          </p>
        )}
        {stockLevel === 0 && selectedVariants.size && selectedVariants.color && (
          <p className="mt-3 text-body-sm text-accent-primary flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            This combination is currently out of stock
          </p>
        )}
      </div>

      {/* Size Guide Modal/Expandable */}
      {showSizeGuide && product.sizeGuide && (
        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body-lg font-semibold">Size Guide</h3>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="text-neutral-600 hover:text-neutral-900 text-body-sm"
            >
              Close
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-body-sm">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="text-left py-2 pr-4">Size</th>
                  <th className="text-left py-2 pr-4">Chest (in)</th>
                  <th className="text-left py-2 pr-4">Waist (in)</th>
                  <th className="text-left py-2">Length (in)</th>
                </tr>
              </thead>
              <tbody>
                {product.sizeGuide.measurements?.map((measurement) => (
                  <tr key={measurement.size} className="border-b border-neutral-200">
                    <td className="py-3 pr-4 font-medium">{measurement.size}</td>
                    <td className="py-3 pr-4">{measurement.chest}</td>
                    <td className="py-3 pr-4">{measurement.waist}</td>
                    <td className="py-3">{measurement.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {product.sizeGuide.notes && (
            <p className="mt-4 text-body-sm text-neutral-600">
              {product.sizeGuide.notes}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
