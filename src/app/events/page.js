'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import { MapPin, Calendar, Clock, Users } from 'lucide-react'

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const upcomingEvents = [
    {
      id: 1,
      title: 'SPORT Trail Run Series: Pacific Northwest',
      date: 'March 15, 2025',
      time: '7:00 AM - 11:00 AM',
      location: 'Forest Park, Portland, OR',
      description: 'Join us for a guided 5K and 10K trail run through scenic forest trails. All levels welcome. Free SPORT gear for participants.',
      attendees: 245,
      image: '/images/events/trail-run.jpg'
    },
    {
      id: 2,
      title: 'Spring Collection Launch Party',
      date: 'April 2, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'SPORT Portland Flagship Store',
      description: 'Celebrate the launch of our spring collection. Meet our design team, try on products, and enjoy drinks and snacks.',
      attendees: 350,
      image: '/images/events/launch-party.jpg'
    },
    {
      id: 3,
      title: 'Women\'s Strength & Performance Workshop',
      date: 'April 12, 2025',
      time: '10:00 AM - 12:30 PM',
      location: 'Portland Community Center',
      description: 'Expert-led workshop on strength training for female athletes. Featuring pro athlete Amy Martinez. Limited to 100 participants.',
      attendees: 87,
      image: '/images/events/workshop.jpg'
    },
    {
      id: 4,
      title: 'SPORT Community Meet-Up: NYC',
      date: 'May 10, 2025',
      time: '5:00 PM - 7:00 PM',
      location: 'Central Park, New York, NY',
      description: 'Monthly community gathering for SPORT athletes. Run, walk, or socialize. Casual 3-mile route available.',
      attendees: 156,
      image: '/images/events/meetup.jpg'
    },
    {
      id: 5,
      title: 'Sustainability Spotlight: Behind the Scenes',
      date: 'May 20, 2025',
      time: '7:00 PM - 8:30 PM',
      location: 'Virtual (Zoom)',
      description: 'Join our sustainability team for an in-depth look at SPORT\'s manufacturing process and environmental initiatives.',
      attendees: 420,
      image: '/images/events/sustainability.jpg'
    },
    {
      id: 6,
      title: 'Summer Training Camp',
      date: 'June 1-3, 2025',
      time: 'Full Day',
      location: 'Mount Hood, Oregon',
      description: 'Weekend intensive training camp for serious athletes. Coaching, meals, and accommodation included. Applications required.',
      attendees: 45,
      image: '/images/events/camp.jpg'
    }
  ]

  const pastEvents = [
    {
      id: 101,
      title: 'Winter Running Challenge 2024',
      date: 'December 1, 2024 - January 31, 2025',
      location: 'Virtual',
      description: 'Global challenge tracking miles throughout winter. 2,340 participants across 45 countries.',
      attendees: 2340
    },
    {
      id: 102,
      title: 'Holiday Pop-Up Markets',
      date: 'December 1-24, 2024',
      location: 'Multiple Cities',
      description: 'Seasonal markets in Portland, Seattle, San Francisco, LA, and NYC. Direct-to-consumer sales and community events.',
      attendees: 1200
    },
    {
      id: 103,
      title: 'Black Friday Community Celebration',
      date: 'November 29, 2024',
      location: 'SPORT Portland Flagship Store',
      description: 'Community-focused celebration featuring local musicians, food vendors, and exclusive discounts.',
      attendees: 580
    },
    {
      id: 104,
      title: 'Fall Marathon Training Series',
      date: 'September - October 2024',
      location: 'Virtual & In-Person (Multiple Cities)',
      description: '8-week training program for athletes preparing for fall marathons. Expert coaching and community support.',
      attendees: 340
    }
  ]

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Events"
        description="Join the SPORT community at events across the globe. Whether online or in-person, we gather to celebrate athletes, test products, and build lasting connections."
        breadcrumbs={['Home', 'Company', 'Events']}
      />

      {/* Event Tabs */}
      <PageSection className="bg-white">
        <div className="max-w-4xl">
          <div className="flex gap-4 mb-12 border-b-2 border-neutral-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 px-2 text-body font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-b-2 -mb-[calc(0.5rem+2px)]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              style={activeTab === 'upcoming' ? { borderBottomColor: 'var(--color-accent-primary)' } : {}}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-4 px-2 text-body font-medium transition-colors ${
                activeTab === 'past'
                  ? 'border-b-2 -mb-[calc(0.5rem+2px)]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              style={activeTab === 'past' ? { borderBottomColor: 'var(--color-accent-primary)' } : {}}
            >
              Past Events
            </button>
          </div>

          {/* Upcoming Events */}
          {activeTab === 'upcoming' && (
            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-neutral-100 h-48 flex items-center justify-center text-neutral-400">
                    Event Image
                  </div>
                  <div className="p-8">
                    <h3 className="text-heading-xl font-bold mb-6">{event.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6 text-body text-neutral-600">
                      <div className="flex gap-3">
                        <Calendar className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-neutral-900 mb-1">Date</p>
                          <p>{event.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-neutral-900 mb-1">Time</p>
                          <p>{event.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-neutral-900 mb-1">Location</p>
                          <p>{event.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Users className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-neutral-900 mb-1">Attending</p>
                          <p>{event.attendees} athletes</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex gap-4">
                      <button
                        className="px-8 py-4 text-body font-medium text-white transition-all"
                        style={{ backgroundColor: 'var(--color-accent-primary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)'}
                      >
                        RSVP
                      </button>
                      <button className="px-8 py-4 border border-neutral-900 text-body font-medium hover:bg-neutral-900 hover:text-white transition-colors">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Events */}
          {activeTab === 'past' && (
            <div className="space-y-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="border border-neutral-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-heading-lg font-bold mb-3">{event.title}</h3>
                  <div className="flex flex-wrap gap-6 mb-4 text-body text-neutral-600">
                    <div className="flex gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex gap-2">
                      <Users className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{event.attendees} attended</span>
                    </div>
                  </div>
                  <p className="text-body text-neutral-600">{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageSection>

      {/* Attend in Person vs Virtual */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">How to Participate</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-4">In-Person Events</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                Join us for runs, training sessions, product launches, and community gatherings in cities around the world. Sign up on this page to receive invitations and updates.
              </p>
              <ul className="space-y-3 text-body text-neutral-600 mb-6">
                <li>✓ Free to attend (some limited capacity)</li>
                <li>✓ Meet other SPORT athletes</li>
                <li>✓ Exclusive gear for attendees</li>
                <li>✓ Expert coaching & workshops</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-4">Virtual Events</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                Can't make it in person? Join us online. We host webinars, training sessions, and community hangouts via Zoom and other platforms.
              </p>
              <ul className="space-y-3 text-body text-neutral-600 mb-6">
                <li>✓ Accessible from anywhere</li>
                <li>✓ Flexible scheduling</li>
                <li>✓ Expert talks & Q&A</li>
                <li>✓ Global community access</li>
              </ul>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Newsletter */}
      <PageSection className="bg-white">
        <div className="max-w-2xl mx-auto text-center bg-neutral-50 p-12 rounded-lg">
          <h3 className="text-heading-xl font-bold mb-4">Never Miss an Event</h3>
          <p className="text-body text-neutral-600 mb-8">
            Subscribe to our events newsletter for first access to exclusive gatherings, early-bird pricing, and insider updates.
          </p>
          <form className="flex gap-4 mb-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-white border border-neutral-300 rounded text-body focus:outline-none"
              style={{
                focusBorderColor: 'var(--color-accent-primary)',
                focusBoxShadow: '0 0 0 1px var(--color-accent-primary)'
              }}
            />
            <button
              type="submit"
              className="px-8 py-4 text-body font-medium text-white transition-all"
              style={{ backgroundColor: 'var(--color-accent-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)'}
            >
              Subscribe
            </button>
          </form>
          <p className="text-body-sm text-neutral-500">
            No spam. Just real events, inspiring stories, and genuine community updates.
          </p>
        </div>
      </PageSection>

      {/* Host an Event */}
      <PageSection className="bg-neutral-50">
        <div className="max-w-3xl bg-white p-12 rounded-lg">
          <h3 className="text-heading-xl font-bold mb-4">Want to Host a SPORT Event?</h3>
          <p className="text-body text-neutral-600 mb-6">
            If you're part of a local running club, fitness studio, or community organization, let's collaborate on an event. We provide gear, expertise, and support.
          </p>
          <a href="mailto:events@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
            Contact Our Events Team →
          </a>
        </div>
      </PageSection>
    </main>
  )
}
