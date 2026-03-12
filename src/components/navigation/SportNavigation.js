'use client'

/**
 * SportNavigation Component
 * Desktop mega-menu and mobile accordion navigation for sport categories
 * Single source of truth for sport navigation UI
 */

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { SPORT_NAVIGATION } from '@/config/sports.config'
import Badge from '@/components/ui/Badge'

export default function SportNavigation({ isMobile = false, onNavigate }) {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  if (isMobile) {
    return <MobileSportNav openSections={openSections} toggleSection={toggleSection} onNavigate={onNavigate} />
  }

  return <DesktopSportNav />
}

// Desktop Mega Menu
function DesktopSportNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button className="flex items-center gap-2 px-4 py-2 text-body font-medium hover:text-accent-primary transition-colors">
        Sport
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-screen max-w-6xl bg-white border-t border-neutral-200 shadow-2xl z-50 mt-0">
          <div className="container-section py-12">
            <div className="grid grid-cols-4 gap-12">
              
              {/* Column 1: Featured Sections */}
              <div>
                <h3 className="text-body-sm font-semibold text-neutral-400 uppercase tracking-wide mb-4">
                  🔥 Featured
                </h3>
                <ul className="space-y-3">
                  {SPORT_NAVIGATION.featured.map(section => (
                    <li key={section.id}>
                      <Link 
                        href={section.path}
                        className="group flex items-center justify-between hover:text-accent-primary transition-colors"
                      >
                        <span className="text-body font-medium">{section.name}</span>
                        {section.badge && (
                          <Badge variant="primary" size="sm">{section.badge}</Badge>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Running & Football */}
              <div className="space-y-8">
                {/* Running */}
                <div>
                  <Link 
                    href="/sports/running"
                    className="text-body-sm font-semibold text-neutral-400 uppercase tracking-wide mb-4 hover:text-accent-primary transition-colors flex items-center gap-2"
                  >
                    🏃 Running
                  </Link>
                  <ul className="space-y-2">
                    {SPORT_NAVIGATION.core[0].categories.map(category => (
                      <li key={category.id}>
                        <Link 
                          href={category.path}
                          className="text-body text-neutral-700 hover:text-accent-primary transition-colors block"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Football */}
                <div>
                  <Link 
                    href="/sports/football"
                    className="text-body-sm font-semibold text-neutral-400 uppercase tracking-wide mb-4 hover:text-accent-primary transition-colors flex items-center gap-2"
                  >
                    ⚽ Football
                  </Link>
                  <ul className="space-y-2">
                    {SPORT_NAVIGATION.core[1].categories.map(category => (
                      <li key={category.id}>
                        <Link 
                          href={category.path}
                          className="text-body text-neutral-700 hover:text-accent-primary transition-colors block"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Training & Gym */}
              <div>
                <Link 
                  href="/sports/training"
                  className="text-body-sm font-semibold text-neutral-400 uppercase tracking-wide mb-4 hover:text-accent-primary transition-colors flex items-center gap-2"
                >
                  🏋️ Training & Gym
                </Link>
                <ul className="space-y-2">
                  {SPORT_NAVIGATION.core[2].categories.map(category => (
                    <li key={category.id}>
                      <Link 
                        href={category.path}
                        className="text-body text-neutral-700 hover:text-accent-primary transition-colors block"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: More Sports */}
              <div>
                <h3 className="text-body-sm font-semibold text-neutral-400 uppercase tracking-wide mb-4">
                  ➕ More Sports
                </h3>
                <ul className="space-y-2">
                  {SPORT_NAVIGATION.more.map(sport => (
                    <li key={sport.id}>
                      <Link 
                        href={sport.path}
                        className="text-body text-neutral-700 hover:text-accent-primary transition-colors block"
                      >
                        {sport.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="mt-10 pt-8 border-t border-neutral-200">
              <Link 
                href="/sports/all"
                className="inline-flex items-center gap-2 text-body-lg font-medium text-accent-primary hover:gap-3 transition-all"
              >
                Explore All Sports
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile Accordion Navigation
function MobileSportNav({ openSections, toggleSection, onNavigate }) {
  return (
    <div className="py-4">
      {/* Featured Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('featured')}
          className="w-full flex items-center justify-between py-3 text-body-lg font-semibold"
        >
          <span>🔥 Featured</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${openSections.featured ? 'rotate-180' : ''}`} />
        </button>
        {openSections.featured && (
          <ul className="ml-4 mt-2 space-y-3">
            {SPORT_NAVIGATION.featured.map(section => (
              <li key={section.id}>
                <Link 
                  href={section.path}
                  onClick={onNavigate}
                  className="flex items-center justify-between py-2 text-body text-neutral-700"
                >
                  <span>{section.name}</span>
                  {section.badge && (
                    <Badge variant="primary" size="sm">{section.badge}</Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Core Sports */}
      {SPORT_NAVIGATION.core.map(sport => (
        <div key={sport.id} className="mb-4">
          <button
            onClick={() => toggleSection(sport.id)}
            className="w-full flex items-center justify-between py-3 text-body-lg font-semibold"
          >
            <span>{sport.name}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections[sport.id] ? 'rotate-180' : ''}`} />
          </button>
          {openSections[sport.id] && (
            <ul className="ml-4 mt-2 space-y-3">
              {sport.categories.map(category => (
                <li key={category.id}>
                  <Link 
                    href={category.path}
                    onClick={onNavigate}
                    className="block py-2 text-body text-neutral-700"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* More Sports */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('more')}
          className="w-full flex items-center justify-between py-3 text-body-lg font-semibold"
        >
          <span>➕ More Sports</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${openSections.more ? 'rotate-180' : ''}`} />
        </button>
        {openSections.more && (
          <ul className="ml-4 mt-2 space-y-3">
            {SPORT_NAVIGATION.more.map(sport => (
              <li key={sport.id}>
                <Link 
                  href={sport.path}
                  onClick={onNavigate}
                  className="block py-2 text-body text-neutral-700"
                >
                  {sport.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <Link 
          href="/sports/all"
          onClick={onNavigate}
          className="flex items-center gap-2 text-body-lg font-medium text-accent-primary"
        >
          Explore All Sports
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
