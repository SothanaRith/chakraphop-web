'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

export function FormSuccess({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2, ease: [0.12, 0.4, 0.29, 0.95] }}
        className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <motion.div
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
        </motion.div>
        <span className="text-body text-green-900">{message}</span>
      </motion.div>
    </AnimatePresence>
  )
}

export function FormError({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2, ease: [0.12, 0.4, 0.29, 0.95] }}
        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <motion.div
          animate={{ x: [-5, 5, -5, 0] }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
        </motion.div>
        <span className="text-body text-red-900">{message}</span>
      </motion.div>
    </AnimatePresence>
  )
}

export function FormInfo({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.12, 0.4, 0.29, 0.95] }}
        className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg"
      >
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <span className="text-body text-blue-900">{message}</span>
      </motion.div>
    </AnimatePresence>
  )
}

export function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
      className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-900 rounded-full"
    />
  )
}

export function SkeletonLoader({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
          className="h-12 bg-neutral-200 rounded-lg"
        />
      ))}
    </div>
  )
}
