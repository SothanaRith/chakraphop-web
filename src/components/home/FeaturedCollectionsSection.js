/**
 * FeaturedCollectionsSection - Editorial collection showcase
 * Displays 3-5 featured collections with storytelling approach
 */

'use client'

import SectionWrapper from './SectionWrapper'
import CollectionCard from './CollectionCard'

// Sample data - replace with API call
const FEATURED_COLLECTIONS = [
  {
    id: '1',
    title: 'Spring Performance',
    description: 'Engineered for speed and comfort. Our new spring line combines lightweight materials with advanced moisture management. Built for runners who demand more.',
    image: '/images/collection-spring.jpg',
    productCount: 24,
    href: '/products?collection=spring-performance',
  },
  {
    id: '2',
    title: 'Lifestyle Essentials',
    description: 'From gym to street. Essential pieces that work everywhere. Clean design, premium materials, and versatile color palettes for modern athletes.',
    image: '/images/collection-lifestyle.jpg',
    productCount: 18,
    href: '/products?collection=lifestyle-essentials',
  },
  {
    id: '3',
    title: 'Sustainable Series',
    description: 'Performance meets responsibility. Made from recycled ocean plastics and organic cotton. Prove that premium quality and sustainability go hand-in-hand.',
    image: '/images/collection-sustainable.jpg',
    productCount: 12,
    href: '/products?collection=sustainable-series',
  },
]

export default function FeaturedCollectionsSection() {
  return (
    <SectionWrapper id="featured-collections" bgColor="bg-white">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-body font-medium text-neutral-600 mb-3 uppercase tracking-widest">
            Collections
          </p>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-6">
            Curated Collections
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-xl">
            Each collection tells a story. Discover curated selections designed for performance, lifestyle, and purpose.
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-20">
          {FEATURED_COLLECTIONS.map((collection, idx) => (
            <CollectionCard
              key={collection.id}
              {...collection}
              index={idx}
              isLast={idx === FEATURED_COLLECTIONS.length - 1}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="pt-12 text-center border-t border-neutral-200">
          <a
            href="/collections"
            className="inline-flex items-center gap-2 text-body font-medium text-neutral-900 hover:text-accent-primary transition-colors"
          >
            View All Collections
            <span className="text-accent-primary">→</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
