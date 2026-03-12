'use client'

import { motion } from 'framer-motion'
import { SlideDown, SlideUp } from '@/lib/motion/components'

export default function PageHeader({ 
  title, 
  description, 
  backgroundImage,
  breadcrumbs 
}) {
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <SlideDown delay={0} duration={0.2}>
          <div className="container-fluid mb-8">
            <div className="flex items-center gap-2 text-caption text-neutral-500">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span>/</span>}
                  <span>{crumb}</span>
                </div>
              ))}
            </div>
          </div>
        </SlideDown>
      )}

      {/* Hero Section */}
      <div className="container-fluid">
        <div className="max-w-3xl">
          {/* Title */}
          <SlideUp delay={0.1} distance={20}>
            <h1 className="font-display text-display-lg md:text-display-xl font-bold tracking-tight mb-6">
              {title}
            </h1>
          </SlideUp>

          {/* Description */}
          {description && (
            <SlideUp delay={0.15} distance={20}>
              <p className="text-heading-md text-neutral-600 leading-relaxed max-w-2xl">
                {description}
              </p>
            </SlideUp>
          )}
        </div>
      </div>
    </div>
  )
}
