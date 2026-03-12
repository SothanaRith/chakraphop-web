/**
 * CampaignSection - Seasonal campaign or promotion highlight
 * High-impact banner with limited-time offer or announcement
 */

'use client'

import SectionWrapper from './SectionWrapper'
import Link from 'next/link'

export default function CampaignSection() {
  // Sample campaign data - replace with API call
  const campaign = {
    title: 'Spring Performance Series',
    description: 'Introducing our most advanced running collection. Engineered in collaboration with elite athletes.',
    cta: 'Discover Now',
    href: '/products?collection=spring-performance-series',
    hasCountdown: false, // Set to true if limited-time
    endDate: null, // ISO date if hasCountdown is true
  }

  return (
    <SectionWrapper
      id="campaign"
      bgColor="bg-neutral-900"
      className="text-center"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
          <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
          <span className="text-body-sm font-medium text-white/80">
            Limited Release
          </span>
        </div>

        {/* Campaign Title */}
        <h2 className="font-display text-display-lg md:text-[4rem] text-white font-bold leading-tight">
          {campaign.title}
        </h2>

        {/* Campaign Description */}
        <p className="text-heading-md text-white/90 leading-relaxed">
          {campaign.description}
        </p>

        {/* CTA Button */}
        <Link
          href={campaign.href}
          className="inline-block px-8 py-4 bg-accent-primary text-white font-medium transition-all hover:bg-accent-hover"
        >
          {campaign.cta}
        </Link>

        {/* Optional: Countdown Timer */}
        {campaign.hasCountdown && campaign.endDate && (
          <p className="text-body-sm text-white/70">
            Ends in 3 days
          </p>
        )}
      </div>
    </SectionWrapper>
  )
}
