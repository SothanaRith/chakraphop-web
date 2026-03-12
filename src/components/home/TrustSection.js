/**
 * TrustSection - Social proof and credibility signals
 * Shows ratings, reviews, press mentions, trust badges
 */

'use client'

import SectionWrapper from './SectionWrapper'
import { Star } from 'lucide-react'

export default function TrustSection() {
  const stats = [
    {
      value: '4.8/5',
      label: 'Average Rating',
      detail: '2,400+ reviews',
    },
    {
      value: '500K+',
      label: 'Trusted Athletes',
      detail: 'Across 50+ countries',
    },
    {
      value: '98%',
      label: 'Would Recommend',
      detail: 'From recent surveys',
    },
  ]

  const pressLogos = [
    { name: 'The Athletic', logo: '/logos/the-athletic.svg' },
    { name: 'Sports Illustrated', logo: '/logos/sports-illustrated.svg' },
    { name: 'Runner\'s World', logo: '/logos/runners-world.svg' },
    { name: 'Outside Magazine', logo: '/logos/outside-magazine.svg' },
  ]

  const trustBadges = [
    { title: 'Carbon Neutral Shipping', icon: '🌱' },
    { title: 'LGBTQ+ Friendly', icon: '🏳️‍🌈' },
    { title: 'Fair Trade Materials', icon: '✓' },
    { title: '30-Day Returns', icon: '↩️' },
  ]

  return (
    <SectionWrapper id="trust" bgColor="bg-neutral-50">
      <div className="space-y-24">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent-primary text-accent-primary"
                  />
                ))}
              </div>
              <p className="text-display-sm font-bold text-neutral-900 mb-2">
                {stat.value}
              </p>
              <p className="text-body font-medium text-neutral-700 mb-1">
                {stat.label}
              </p>
              <p className="text-body-sm text-neutral-600">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Press Mentions */}
        <div className="py-12 border-y border-neutral-200">
          <p className="text-body-sm font-medium text-neutral-600 uppercase tracking-widest mb-8 text-center">
            Featured In
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {pressLogos.map((press, idx) => (
              <div key={idx} className="flex items-center justify-center">
                <img
                  src={press.logo}
                  alt={press.name}
                  className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div>
          <p className="text-body font-medium text-neutral-700 mb-8 text-center">
            What We Stand For
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="text-center p-4 bg-white rounded-lg">
                <p className="text-2xl mb-2">{badge.icon}</p>
                <p className="text-body-sm font-medium text-neutral-700">
                  {badge.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
