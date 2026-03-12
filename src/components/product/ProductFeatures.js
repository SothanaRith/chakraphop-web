'use client'

import { Check, Zap, Shield, Droplet, Wind, Sun } from 'lucide-react'

/**
 * ProductFeatures Component
 * 
 * Displays performance features and benefits in a scannable format
 * Focuses on sport-specific value propositions
 */
export default function ProductFeatures({ features, sportContext }) {
  // Icon mapping for common feature types
  const iconMap = {
    'moisture-wicking': Droplet,
    'breathable': Wind,
    'protection': Shield,
    'performance': Zap,
    'uv-protection': Sun,
    'default': Check
  }

  const getIcon = (type) => {
    const Icon = iconMap[type] || iconMap.default
    return Icon
  }

  if (!features || features.length === 0) return null

  return (
    <section className="container-section">
      <div className="mb-12">
        <h2 className="text-heading-xl md:text-display-sm mb-4">
          Performance Features
        </h2>
        <p className="text-body-lg text-neutral-600">
          Engineered for {sportContext || 'peak performance'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = getIcon(feature.type)
          
          return (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-accent-primary" />
              </div>
              <div>
                <h3 className="text-body-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-body text-neutral-700">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
