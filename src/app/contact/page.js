'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import Input from '@/components/ui/Input'
import LoadingButton from '@/components/ui/LoadingButton'
import Badge from '@/components/ui/Badge'
import { supportService } from '@/lib/api/support'
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await supportService.submitContactForm(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title="We're Here to Help"
        description="Have a question or need assistance? Our support team is ready to help you get the most out of your athletic journey."
        breadcrumbs={['Home', 'Support', 'Contact']}
      />

      <PageSection className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="mb-8">
              <Badge variant="outline" size="sm" className="mb-4">Get in Touch</Badge>
              <h3 className="text-heading-xl font-semibold mb-3">Contact Information</h3>
              <p className="text-body text-neutral-600">
                Choose the best way to reach us. We're available across multiple channels.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-5 p-5 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="text-body-lg font-semibold mb-1">Email</h4>
                  <p className="text-body text-neutral-900 mb-1">support@sport.com</p>
                  <p className="text-body-sm text-neutral-500">We'll respond within 2-4 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-body font-medium mb-1">Phone</h4>
                  <p className="text-body text-neutral-600">1-800-SPORT-01</p>
                  <p className="text-caption text-neutral-500 mt-1">Monday–Friday, 9 AM – 6 PM EST</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-body font-medium mb-1">Headquarters</h4>
                  <p className="text-body text-neutral-600">
                    123 Athletic Ave<br />
                    Portland, OR 97204
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-body font-medium mb-1">Hours</h4>
                  <p className="text-body text-neutral-600">
                    Mon–Fri: 9 AM – 6 PM EST<br />
                    Sat–Sun: 10 AM – 4 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-heading-lg font-medium mb-8">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-body font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-body font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-body font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-body font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="6"
                  className="input w-full resize-none"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded text-body-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded text-body-sm text-green-700">
                  Thank you for your message! We'll be in touch soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary mt-6"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
