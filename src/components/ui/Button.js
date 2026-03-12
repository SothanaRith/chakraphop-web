'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  animate = true,
  className,
  ...props 
}) {
  const baseStyles = 'btn focus-ring'
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }

  const sizes = {
    sm: 'px-6 py-3 text-body-sm',
    md: 'px-8 py-4 text-body',
    lg: 'px-10 py-5 text-body-lg',
  }

  const finalClassName = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  )

  if (!animate) {
    return (
      <button className={finalClassName} {...props}>
        {children}
      </button>
    )
  }

  return (
    <motion.button
      className={finalClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.15,
        ease: [0.12, 0.4, 0.29, 0.95],
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
