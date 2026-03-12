/**
 * ClosingCTASection - Final call to action before footer
 * Calm, confident brand message with dual CTAs
 */

'use client'

import SectionWrapper from './SectionWrapper'
import Link from 'next/link'

export default function ClosingCTASection() {
  return (
    <SectionWrapper
      id="closing-cta"
      bgColor="bg-neutral-900"
      className="text-center"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Tagline */}
        <h2 className="font-display text-display-lg text-white font-bold leading-tight">
          Every athlete deserves
          <br />
          <span className="text-accent-primary">the best.</span>
        </h2>

        {/* Description */}
        <p className="text-heading-md text-white/90 leading-relaxed">
          SPORT is built for people who push limits. Whether you're training for a goal or discovering your potential, we're here to help you perform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {/* Primary CTA */}
          <Link
            href="/products"
            className="px-8 py-4 bg-accent-primary text-white font-medium transition-all hover:bg-accent-hover"
          >
            Browse All Products
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/brand"
            className="px-8 py-4 border border-white text-white font-medium transition-colors hover:bg-white hover:text-neutral-900"
          >
            Learn Our Story
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
