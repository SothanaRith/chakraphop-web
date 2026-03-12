/**
 * EventCard - Community event preview card
 */

'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EventCard({
  id = '1',
  title = 'Event Title',
  date = '2026-02-15',
  location = 'Portland, OR',
  type = 'In-Person', // 'In-Person' or 'Virtual'
  image = '/images/event-placeholder.jpg',
  attendees = 0,
  href = '/events',
  index = 0,
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      className="group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link href={href} className="block space-y-4">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg bg-neutral-100 h-48">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          {/* Type Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-body-sm font-medium text-neutral-900 rounded">
            {type}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-heading-md font-semibold text-neutral-900 group-hover:text-accent-primary transition-colors">
            {title}
          </h3>

          {/* Meta */}
          <div className="space-y-2 text-body-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            {attendees > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{attendees} attending</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-body font-medium text-accent-primary group-hover:gap-3 transition-all">
            <span>Learn More</span>
            <span>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
