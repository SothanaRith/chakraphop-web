import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import HoverButton from '@/components/ui/HoverButton'
import { MapPin, Briefcase, Users } from 'lucide-react'

export const metadata = {
  title: "Careers at SPORT | Join Our Team",
  description: "Build the future of athletic excellence. Explore careers at SPORT and join a team of passionate, innovative people."
}

const positions = [
  {
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Portland, OR',
    type: 'Full-time',
    description: 'Lead design direction for our new footwear line. You\'ll work cross-functionally with product, engineering, and marketing to create products that inspire athletes.'
  },
  {
    title: 'Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build scalable backend and frontend systems for our e-commerce platform. Work with React, Node.js, and cloud infrastructure.'
  },
  {
    title: 'Brand Strategist',
    department: 'Marketing',
    location: 'Portland, OR',
    type: 'Full-time',
    description: 'Shape SPORT\'s brand voice and positioning. Collaborate with creative, social, and partnerships teams to tell our story.'
  },
  {
    title: 'Supply Chain Manager',
    department: 'Operations',
    location: 'Portland, OR',
    type: 'Full-time',
    description: 'Optimize our global supply chain. Work with manufacturers, logistics partners, and our fulfillment team to ensure quality and efficiency.'
  },
  {
    title: 'Community Manager',
    department: 'Community',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and nurture our global athlete community. Create content, moderate conversations, and organize events across social platforms.'
  },
  {
    title: 'Sustainability Specialist',
    department: 'Sustainability',
    location: 'Portland, OR',
    type: 'Full-time',
    description: 'Lead our sustainability initiatives. Work on material sourcing, carbon footprint reduction, and certifications.'
  }
]

const benefits = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Collaborative Culture',
    description: 'Work alongside talented, passionate people who love what they do.'
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Competitive Compensation',
    description: 'Competitive salary, equity options, and comprehensive benefits.'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Flexible Work',
    description: 'Remote options, flexible schedules, and work-life balance.'
  },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Join the SPORT Team"
        description="We're building the future of athletic excellence. If you're passionate about sports, design, technology, or community, we want to hear from you."
        breadcrumbs={['Home', 'Company', 'Careers']}
      />

      {/* Why SPORT */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-6">Why Join SPORT?</h2>
          <p className="text-heading-md text-neutral-600 leading-relaxed mb-6">
            At SPORT, we believe that the best companies are built by people who genuinely care. We're not just selling athletic gear—we're empowering athletes, building community, and pushing the boundaries of what's possible.
          </p>
          <p className="text-heading-md text-neutral-600 leading-relaxed">
            Every person on our team has a voice. Your ideas matter. Your work matters. And the impact you make extends far beyond quarterly metrics.
          </p>
        </div>
      </PageSection>

      {/* Culture & Values */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12 text-center">Our Culture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-lg font-semibold mb-4">Performance First</h3>
              <p className="text-body text-neutral-600">
                We ship fast, iterate often, and always prioritize what matters most. Execution is everything.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-lg font-semibold mb-4">Radical Honesty</h3>
              <p className="text-body text-neutral-600">
                We believe in transparent communication. Feedback is a gift, and we embrace it from every direction.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-lg font-semibold mb-4">Athlete First</h3>
              <p className="text-body text-neutral-600">
                Everything we do is in service of the athlete. We build products and experiences that earn trust.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Benefits */}
      <PageSection className="bg-white">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-neutral-900 flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-heading-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-body text-neutral-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-accent-50 rounded-lg">
            <h4 className="text-heading-lg font-semibold mb-4">+ More</h4>
            <ul className="space-y-3 text-body text-neutral-700">
              <li>• 4 weeks paid time off annually</li>
              <li>• Full health, dental, and vision coverage</li>
              <li>• 401(k) matching</li>
              <li>• Free SPORT gear and discounts</li>
              <li>• Professional development budget</li>
              <li>• Parental leave (12 weeks)</li>
            </ul>
          </div>
        </div>
      </PageSection>

      {/* Open Positions */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Open Positions</h2>
          <div className="space-y-6">
            {positions.map((position, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-heading-lg font-semibold mb-1">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-body-sm text-neutral-600">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                </div>
                <p className="text-body text-neutral-700 mb-6">{position.description}</p>
                <button className="px-6 py-3 border border-neutral-900 text-body font-medium hover:bg-neutral-900 hover:text-white transition-colors">
                  View Position
                </button>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-4">Don't see a fit?</h2>
          <p className="text-heading-md text-neutral-600 mb-8 leading-relaxed">
            We're always looking for talented, passionate people. Send us your resume and tell us why you'd be a great fit for the SPORT team.
          </p>
          <HoverButton href="mailto:careers@sport.com">
            Send Your Resume
          </HoverButton>
        </div>
      </PageSection>
    </main>
  )
}
