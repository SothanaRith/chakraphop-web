'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ProductFilters({ 
  categories = [],
  onFilterChange,
  onSortChange 
}) {
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: false,
    size: false
  })
  const [selectedSize, setSelectedSize] = useState(null)

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="border-b border-neutral-200 pb-6">
        <button
          onClick={() => toggleFilter('category')}
          className="w-full flex items-center justify-between mb-4 hover:text-neutral-600 transition-colors"
        >
          <h3 className="text-heading-sm font-medium">Category</h3>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expandedFilters.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedFilters.category && (
          <div className="space-y-3">
            {['All', 'New Arrivals', 'Best Sellers', 'Sale'].map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  onChange={(e) => onFilterChange?.('category', cat, e.target.checked)}
                  className="peer w-4 h-4 rounded border-neutral-300 accent-[var(--color-accent-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                />
                <span className="text-body text-neutral-600 transition-colors peer-checked:text-[var(--color-accent-hover)]">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-neutral-200 pb-6">
        <button
          onClick={() => toggleFilter('price')}
          className="w-full flex items-center justify-between mb-4 hover:text-neutral-600 transition-colors"
        >
          <h3 className="text-heading-sm font-medium">Price</h3>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedFilters.price && (
          <div className="space-y-3">
            {['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map(range => (
              <label key={range} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  onChange={(e) => onFilterChange?.('price', range, e.target.checked)}
                  className="peer w-4 h-4 rounded border-neutral-300 accent-[var(--color-accent-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                />
                <span className="text-body text-neutral-600 transition-colors peer-checked:text-[var(--color-accent-hover)]">
                  {range}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div>
        <button
          onClick={() => toggleFilter('size')}
          className="w-full flex items-center justify-between mb-4 hover:text-neutral-600 transition-colors"
        >
          <h3 className="text-heading-sm font-medium">Size</h3>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expandedFilters.size ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedFilters.size && (
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <button
                key={size}
                onClick={() => {
                  const nextSize = selectedSize === size ? null : size
                  setSelectedSize(nextSize)
                  onFilterChange?.('size', size, nextSize !== null)
                }}
                className={`px-4 py-2 border rounded text-body transition-colors focus-ring ${
                  selectedSize === size
                    ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-hover)] bg-[var(--color-accent-muted)]'
                    : 'border-neutral-300 hover:border-neutral-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
