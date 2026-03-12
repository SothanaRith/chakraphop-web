/**
 * CommunityPreviewSection - Upcoming events and community highlights
 */

'use client'

import SectionWrapper from './SectionWrapper'
import EventCard from './EventCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Sample data - replace with API call
const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Spring Marathon Training',
    date: '2026-02-22',
    location: 'Portland, OR',
    type: 'In-Person',
    image: '/images/event-marathon.jpg',
    attendees: 240,
  },
  {
    id: '2',
    title: 'Athletic Tech Webinar',
    date: '2026-03-01',
    location: 'Virtual',
    type: 'Virtual',
    image: '/images/event-webinar.jpg',
    attendees: 1200,
  },
  {
    id: '3',
    title: 'Community Cleanup Run',
    date: '2026-03-08',
    location: 'San Francisco, CA',
    type: 'In-Person',
    image: '/images/event-cleanup.jpg',
    attendees: 180,
  },
]

export default function CommunityPreviewSection() {
  return (
    <SectionWrapper id="community" bgColor="bg-white">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-body font-medium text-neutral-600 mb-3 uppercase tracking-widest">
              Community
            </p>
            <h2 className="font-display text-display-md font-bold tracking-tight">
              Join the Movement
            </h2>
          </div>

          {/* View All Link */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-body font-medium text-neutral-900 hover:text-accent-primary transition-colors whitespace-nowrap"
          >
            <span>View All Events</span>
            <ArrowRight className="w-5 h-5 text-accent-primary" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {UPCOMING_EVENTS.map((event, idx) => (
            <EventCard
              key={event.id}
              {...event}
              index={idx}
              href={`/events/${event.id}`}
            />
          ))}
        </div>

        {/* Community CTA */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <p className="text-heading-md text-neutral-700 mb-6">
            Want to host an event or collaborate?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-900 text-body font-medium hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
