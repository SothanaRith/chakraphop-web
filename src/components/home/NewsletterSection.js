/**
 * NewsletterSection - Email signup and community engagement
 */

'use client'

import { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setEmail('')
      setIsLoading(false)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/sport', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/sport', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/sport', label: 'Facebook' },
  ]

  return (
    <SectionWrapper id="newsletter" bgColor="bg-neutral-50">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Heading */}
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-4">
            Stay Updated
          </h2>
          <p className="text-heading-md text-neutral-600">
            Get early access to new drops, insider updates, and exclusive athlete stories.
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 bg-white border border-neutral-300 text-body placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className="px-8 py-4 bg-accent-primary text-white font-medium transition-all hover:bg-accent-hover disabled:bg-neutral-400"
            >
              {isLoading ? 'Subscribing...' : isSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>
          {isSubmitted && (
            <p className="text-body-sm text-accent-primary font-medium">
              ✓ Check your email for confirmation
            </p>
          )}
        </form>

        {/* Social Links */}
        <div className="pt-8 border-t border-neutral-200">
          <p className="text-body-sm text-neutral-600 mb-6">
            Or follow us on social
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <a
                  key={idx}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white text-neutral-900 hover:bg-accent-primary hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
