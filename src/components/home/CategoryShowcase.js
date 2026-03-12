'use client'

import Link from 'next/link'

export default function CategoryShowcase() {
  const categories = [
    {
      id: 'training',
      title: 'Training',
      description: 'Engineered for high-intensity workouts',
      image: '/images/category-training.jpg',
      href: '/products/training',
    },
    {
      id: 'running',
      title: 'Running',
      description: 'Built for speed and endurance',
      image: '/images/category-running.jpg',
      href: '/products/running',
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      description: 'Style meets everyday comfort',
      image: '/images/category-lifestyle.jpg',
      href: '/products/lifestyle',
    },
  ]

  return (
    <section className="section-spacing bg-neutral-50">
      <div className="container-section">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-display-sm md:text-display-md mb-6 text-balance">
            Find Your Focus
          </h2>
          <p className="text-body-lg text-neutral-600">
            Whether you're training for competition or moving through your day, 
            we have the gear to match your ambition.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-neutral-900">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-heading-xl md:text-display-sm text-white font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-body text-white/80 mb-6">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center text-white font-medium">
                    <span className="border-b-2 border-white pb-1 group-hover:pb-2 transition-all duration-300">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
