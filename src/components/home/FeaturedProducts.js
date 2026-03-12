'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductCard from '../product/ProductCard'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  // Sample data - replace with real data from API
  const products = [
    {
      id: '1',
      name: 'Performance Training Jacket',
      price: 129,
      originalPrice: 159,
      image: '/images/product-1.jpg',
      category: 'Training',
      colors: ['#000000', '#1a1a1a', '#4a4a4a'],
      isNew: true,
    },
    {
      id: '2',
      name: 'Elite Running Shorts',
      price: 68,
      image: '/images/product-2.jpg',
      category: 'Running',
      colors: ['#000000', '#ffffff', '#e74c3c'],
      isNew: false,
    },
    {
      id: '3',
      name: 'Lightweight Training Tee',
      price: 45,
      image: '/images/product-3.jpg',
      category: 'Essentials',
      colors: ['#ffffff', '#000000', '#3498db'],
      isNew: true,
    },
    {
      id: '4',
      name: 'Pro Compression Leggings',
      price: 95,
      originalPrice: 120,
      image: '/images/product-4.jpg',
      category: 'Training',
      colors: ['#000000', '#4a4a4a'],
      isNew: false,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },
  }

  return (
    <section className="section-spacing bg-white">
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          className="flex items-end justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3, ease: [0.12, 0.4, 0.29, 0.95] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-display-sm md:text-display-md mb-4 text-balance">
              New Arrivals
            </h2>
            <p className="text-body-lg text-neutral-600">
              Discover our latest innovations. Designed for performance, crafted for style.
            </p>
          </div>
          <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
            <Link
              href="/products/new"
              className="hidden md:flex items-center gap-2 text-body font-medium hover:gap-4 transition-all duration-300 group"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Mobile View All */}
        <motion.div
          className="mt-12 md:hidden text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 text-body font-medium group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
