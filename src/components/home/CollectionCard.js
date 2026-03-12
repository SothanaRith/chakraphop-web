/**
 * CollectionCard - Featured collection display
 * Shows collection image, story, and "Explore" CTA
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CollectionCard({
  id = '1',
  title = 'Collection Title',
  description = 'Collection description',
  image = '/images/collection-placeholder.jpg',
  productCount = 0,
  href = '/products',
  index = 0,
  isLast = false,
}) {
  const isEven = index % 2 === 0

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },
  }

  return (
    <motion.div
      className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
        !isLast ? 'pb-24 md:pb-32 border-b border-neutral-200' : ''
      }`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden rounded-lg ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.img
          src={image}
          alt={title}
          className="w-full h-96 md:h-[500px] object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.12, 0.4, 0.29, 0.95] }}
        />
      </div>

      {/* Content */}
      <div className={`space-y-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        {/* Label */}
        <p className="text-body-sm font-medium text-neutral-600 uppercase tracking-widest">
          Collection
        </p>

        {/* Title */}
        <h3 className="text-display-sm md:text-display-md font-bold tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-body-lg text-neutral-600 leading-relaxed max-w-lg">
          {description}
        </p>

        {/* Product Count */}
        {productCount > 0 && (
          <p className="text-body-sm text-neutral-500">
            {productCount} items in collection
          </p>
        )}

        {/* CTA */}
        <Link
          href={href}
          className="inline-flex items-center gap-3 text-body font-medium text-neutral-900 group"
        >
          <span>Explore Collection</span>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-5 h-5 text-accent-primary" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
