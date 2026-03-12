'use client'

import Link from 'next/link'

export default function StorySection() {
  return (
    <section className="section-spacing bg-neutral-900 text-white overflow-hidden">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5]">
              <img
                src="/images/story-image.jpg"
                alt="Athletic performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-px bg-white/50" />
              <span className="text-body-sm text-white/70 uppercase tracking-widest font-medium">
                Our Story
              </span>
            </div>

            <h2 className="text-display-sm md:text-display-md mb-6 text-balance">
              Performance Without Compromise
            </h2>

            <div className="space-y-6 text-body-lg text-white/80 mb-10">
              <p>
                We believe exceptional performance shouldn't come at the cost of style or sustainability. 
                Every product we create is designed to push boundaries while respecting our planet.
              </p>
              <p>
                From the track to the street, our gear is engineered with innovative materials and 
                thoughtful design that moves with you, adapts to you, and performs when it matters most.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center text-white font-medium text-body group"
            >
              <span className="border-b-2 border-white pb-1 group-hover:pb-2 transition-all duration-300">
                Discover Our Mission
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
