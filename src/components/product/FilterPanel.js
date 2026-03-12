'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FilterPanel() {
  const [expandedSections, setExpandedSections] = useState(['category', 'price'])

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { label: 'Training', count: 45 },
        { label: 'Running', count: 32 },
        { label: 'Lifestyle', count: 28 },
        { label: 'Accessories', count: 18 },
      ],
    },
    {
      id: 'price',
      name: 'Price Range',
      options: [
        { label: 'Under $50', count: 23 },
        { label: '$50 - $100', count: 45 },
        { label: '$100 - $150', count: 32 },
        { label: 'Over $150', count: 18 },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { label: 'XS', count: 28 },
        { label: 'S', count: 42 },
        { label: 'M', count: 48 },
        { label: 'L', count: 45 },
        { label: 'XL', count: 38 },
        { label: 'XXL', count: 24 },
      ],
    },
    {
      id: 'color',
      name: 'Color',
      options: [
        { label: 'Black', color: '#000000', count: 56 },
        { label: 'White', color: '#FFFFFF', count: 48 },
        { label: 'Gray', color: '#808080', count: 32 },
        { label: 'Blue', color: '#3498DB', count: 24 },
        { label: 'Red', color: '#E74C3C', count: 18 },
      ],
    },
  ]

  return (
    <aside className="space-y-8">
      {/* Active Filters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading-sm font-semibold">Filters</h3>
          <button className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Sections */}
      {filters.map((filter) => (
        <div key={filter.id} className="border-t border-neutral-200 pt-6">
          <button
            onClick={() => toggleSection(filter.id)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <span className="text-body font-medium">{filter.name}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedSections.includes(filter.id) ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.includes(filter.id) && (
            <div className="space-y-3 animate-fade-in">
              {filter.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="peer w-4 h-4 rounded border-neutral-300 accent-[var(--color-accent-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 cursor-pointer"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    {option.color && (
                      <div
                        className="w-5 h-5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                    <span className="text-body-sm text-neutral-700 transition-colors peer-checked:text-[var(--color-accent-hover)] group-hover:text-neutral-900">
                      {option.label}
                    </span>
                  </div>
                  <span className="text-caption text-neutral-500">
                    ({option.count})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}
