'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    colors = [],
    isNew = false,
  } = product

  const hasDiscount = originalPrice && originalPrice > price

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.2,
        ease: [0.12, 0.4, 0.29, 0.95],
      }}
    >
      <Link href={`/products/${id}`} className="block">
        {/* Image Container */}
        <motion.div
          className="relative aspect-product bg-neutral-100 overflow-hidden mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          {isNew && (
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 text-caption font-medium"
              style={{
                backgroundColor: 'var(--color-accent-muted)',
                color: 'var(--color-accent-hover)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              NEW
            </motion.div>
          )}
          
          {hasDiscount && (
            <motion.div
              className="absolute top-4 right-4 text-white px-3 py-1 text-caption font-medium"
              style={{ backgroundColor: 'var(--color-accent-primary)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              SALE
            </motion.div>
          )}

          {/* Quick Add - Appears on Hover */}
          <motion.div
            className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            whileHover={{ y: 0 }}
            initial={{ y: '100%' }}
          >
            <button className="w-full bg-white/95 backdrop-blur-sm py-4 flex items-center justify-center gap-2 font-medium hover:bg-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              Quick Add
            </button>
          </motion.div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-caption text-neutral-500 uppercase tracking-wide mb-1">
                {category}
              </p>
              <h3 className="text-body font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                {name}
              </h3>
            </div>
          </div>

          {/* Colors */}
          {colors.length > 0 && (
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {colors.map((color, index) => (
                <motion.button
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-neutral-200 hover:border-neutral-900 transition-colors focus-ring"
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${index + 1}`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </motion.div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-body font-semibold text-neutral-900">
              ${price}
            </span>
            {hasDiscount && (
              <span className="text-body-sm text-neutral-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
