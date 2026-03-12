'use client'

import { Package, TrendingUp, Users, Sparkles } from 'lucide-react'

/**
 * SportContext Component
 * 
 * Provides sport-specific context and reinforces product purpose
 * Helps users understand if product fits their needs
 */
export default function SportContext({ sport, category, designedFor, badges }) {
  if (!sport) return null

  return (
    <section className="container-section">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 lg:p-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Context */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Package className="w-4 h-4" />
              <span className="text-caption font-medium uppercase tracking-wide">
                {sport}
              </span>
            </div>
            
            <h2 className="text-heading-xl md:text-display-sm mb-4">
              Designed for {designedFor || sport}
            </h2>
            
            <p className="text-body-lg text-white/80 mb-6">
              {category ? `This ${category} is ` : 'This product is '}
              engineered specifically for {sport.toLowerCase()} athletes who demand 
              performance, durability, and comfort in every movement.
            </p>

            {/* Key Badges */}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                  >
                    {badge.icon === 'trending' && <TrendingUp className="w-4 h-4" />}
                    {badge.icon === 'users' && <Users className="w-4 h-4" />}
                    {badge.icon === 'sparkles' && <Sparkles className="w-4 h-4" />}
                    <span className="text-body-sm font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Visual or Additional Context */}
          <div className="hidden lg:block">
            <div className="aspect-square rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="text-center p-8">
                <Package className="w-16 h-16 mx-auto mb-4 text-white/40" />
                <p className="text-body text-white/60">
                  Sport-specific design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
