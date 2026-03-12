'use client'

import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $75',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '60-day return policy',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Protected transactions',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help',
    },
  ]

  return (
    <section className="section-spacing-sm bg-white border-y border-neutral-200">
      <div className="container-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-50 rounded-full mb-4">
                <feature.icon className="w-7 h-7 text-neutral-900" />
              </div>
              <h3 className="text-heading-sm font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-body-sm text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
