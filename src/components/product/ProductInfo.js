'use client'

import { useState } from 'react'
import { ShoppingBag, Heart, Ruler, ChevronDown } from 'lucide-react'

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [expandedSection, setExpandedSection] = useState('details')

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  
  const details = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <ul className="space-y-2 text-body text-neutral-700">
          <li>• Premium performance fabric</li>
          <li>• Moisture-wicking technology</li>
          <li>• Breathable mesh panels</li>
          <li>• Ergonomic fit for maximum mobility</li>
          <li>• Durable construction</li>
        </ul>
      ),
    },
    {
      id: 'fit',
      title: 'Fit & Care',
      content: (
        <div className="space-y-3 text-body text-neutral-700">
          <p>This item runs true to size. For a relaxed fit, consider sizing up.</p>
          <p className="font-medium mt-4">Care Instructions:</p>
          <ul className="space-y-1">
            <li>• Machine wash cold</li>
            <li>• Tumble dry low</li>
            <li>• Do not bleach</li>
            <li>• Iron low if needed</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-3 text-body text-neutral-700">
          <p>Free standard shipping on orders over $75. Express shipping available.</p>
          <p>Free returns within 60 days. Items must be unworn with tags attached.</p>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div>
        <p className="text-body-sm text-neutral-500 uppercase tracking-wide mb-2">
          {product.category}
        </p>
        <h1 className="text-heading-xl md:text-display-sm mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-heading-lg font-semibold">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-body text-neutral-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-body font-medium">
            Color: <span className="text-neutral-600">{selectedColor.name}</span>
          </label>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-full transition-all duration-200 focus-ring ${
                selectedColor.hex === color.hex
                  ? 'scale-110'
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: color.hex,
                boxShadow:
                  selectedColor.hex === color.hex
                    ? '0 0 0 2px var(--color-accent-primary), 0 0 0 4px #ffffff'
                    : undefined,
              }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-body font-medium">Select Size</label>
          <button className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-body font-medium border-2 transition-all duration-200 focus-ring ${
                selectedSize === size
                  ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-muted)] text-[var(--color-accent-hover)]'
                  : 'border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="text-body font-medium block mb-4">Quantity</label>
        <div className="inline-flex border-2 border-neutral-300">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 h-12 text-center border-x-2 border-neutral-300 focus:outline-none"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="btn btn-primary w-full text-body-lg">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
        <button className="btn btn-ghost w-full text-body-lg">
          <Heart className="w-5 h-5 mr-2" />
          Add to Wishlist
        </button>
      </div>

      {/* Product Details Accordion */}
      <div className="pt-8 border-t border-neutral-200 space-y-4">
        {details.map((section) => (
          <div key={section.id} className="border-b border-neutral-200 last:border-b-0">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="text-body font-medium">{section.title}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === section.id && (
              <div className="pb-6 animate-fade-in">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
