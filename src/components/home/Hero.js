'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const scrollVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center bg-neutral-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 to-neutral-900/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.12, 0.4, 0.29, 0.95] }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="container-section relative z-20 pt-32 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            variants={itemVariants}
          >
            <motion.div
              className="w-12 h-px bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <span className="text-body-sm text-white/90 uppercase tracking-widest font-medium">
              Spring 2026 Collection
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-display-lg md:text-[6rem] lg:text-[7rem] text-white font-bold leading-none mb-8 text-balance"
            variants={itemVariants}
          >
            Built for
            <br />
            Performance.
            <br />
            <span className="text-white/70">Made for Life.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-body-lg md:text-heading-sm text-white/90 mb-12 max-w-2xl text-balance"
            variants={itemVariants}
          >
            Experience the perfect fusion of cutting-edge technology and timeless design. 
            Engineered for athletes, designed for everyone.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/products"
                className="btn btn-primary bg-white text-neutral-900 hover:bg-neutral-100 group inline-flex"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.button
              className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-neutral-900 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Film
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          variants={scrollVariants}
          animate="animate"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
