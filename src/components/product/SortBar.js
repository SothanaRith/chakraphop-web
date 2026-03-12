'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

export default function SortBar({ totalProducts }) {
  const [sortBy, setSortBy] = useState('featured')

  return (
    <div className="flex items-center justify-between py-6 border-b border-neutral-200">
      <p className="text-body text-neutral-600">
        <span className="font-medium text-neutral-900">{totalProducts}</span> products
      </p>

      <div className="flex items-center gap-6">
        <button className="lg:hidden flex items-center gap-2 text-body font-medium hover:text-neutral-600 transition-colors">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-body-sm text-neutral-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-body font-medium bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}
