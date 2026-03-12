import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import Badge from '@/components/ui/Badge'
import { Users, Target, Heart, Globe, TrendingUp, Award } from 'lucide-react'

export const metadata = {
  title: "Our Story | About SPORT",
  description: "Discover SPORT's mission to empower athletes with premium gear. Learn about our values, journey, and commitment to excellence.",
  keywords: "about SPORT, athletic wear company, sports apparel mission, brand values"
}

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Performance First',
      description: 'Everything we do is designed with athletes in mind. Quality, durability, and functionality come before trends.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'We believe in the power of community. Our brand is built on authentic connections with athletes worldwide.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Sustainability',
      description: 'We\'re committed to environmental responsibility. Every product is made with sustainability in mind.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We push boundaries and challenge conventions. Constant innovation drives everything we create.'
    }
  ]

  const milestones = [
    { year: 2015, event: 'SPORT founded with a simple mission: premium athletic gear for everyone' },
    { year: 2017, event: 'Reached 100,000 active customers across North America' },
    { year: 2019, event: 'Launched sustainable product line using recycled materials' },
    { year: 2021, event: 'Opened flagship store in Portland, Oregon' },
    { year: 2023, event: 'Expanded to 50+ countries worldwide' },
    { year: 2024, event: 'Reached $100M annual revenue' }
  ]

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Built for Athletes, By Athletes"
        description="We're on a mission to empower every athlete with gear that performs as hard as they do. Premium quality, honest pricing, authentic community."
        breadcrumbs={['Home', 'Company', 'About']}
      />

      {/* Mission */}
      <PageSection className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" size="md" className="mb-6">Our Mission</Badge>
          <h2 className="font-display text-display-md md:text-display-lg font-bold tracking-tight mb-8">
            Great gear shouldn't break the bank
          </h2>
          <p className="text-heading-md text-neutral-600 leading-relaxed mb-6">
            At SPORT, we believe that world-class athletic gear should be accessible to everyone—from weekend warriors to professional competitors. No compromises, no inflated prices, just premium performance.
          </p>
          <p className="text-heading-md text-neutral-600 leading-relaxed">
            Every product we create is designed to inspire confidence, support peak performance, and build authentic community.
          </p>
        </div>
      </PageSection>

      {/* Values */}
      <PageSection className="bg-neutral-50">
        <div>
          <div className="text-center mb-16">
            <Badge variant="outline" size="md" className="mb-6">What Drives Us</Badge>
            <h2 className="font-display text-display-md md:text-display-lg font-bold tracking-tight mb-4">
              Our Core Values
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every product we create
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6 text-neutral-900">{value.icon}</div>
                <h3 className="text-heading-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-body-lg text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Story */}
      <PageSection className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" size="md" className="mb-6">How We Started</Badge>
            <h2 className="font-display text-display-md md:text-display-lg font-bold tracking-tight">
              The SPORT Story
            </h2>
          </div>
          <div className="space-y-8 text-body-lg text-neutral-600 leading-relaxed">
            <p>
              SPORT was born in 2015 when our founder, an avid trail runner and designer, couldn't find athletic gear that balanced premium quality with honest pricing. Every brand was either insanely expensive or insanely mediocre.
            </p>
            <p>
              After months of research, trips to manufacturers, and countless design iterations, SPORT's first collection launched with just 12 intentional products. Small batch, high quality, honest about what great athletic gear should be.
            </p>
            <p>
              What started in a Portland garage has grown into a global brand trusted by millions of athletes. But our core philosophy remains unchanged: every product must earn the trust of real athletes through uncompromising quality.
            </p>
          </div>
        </div>
      </PageSection>

      {/* Timeline */}
      <PageSection className="bg-neutral-50">
        <div>
          <div className="text-center mb-16">
            <Badge variant="outline" size="md" className="mb-6">Our Journey</Badge>
            <h2 className="font-display text-display-md md:text-display-lg font-bold tracking-tight mb-4">
              Key Milestones
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              From a Portland garage to a global athletic brand
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-32">
                  <div className="inline-block px-4 py-2 bg-accent-primary text-white text-heading-md font-bold rounded-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="pb-8 flex-1 border-l-2 border-neutral-300 pl-8 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accent-primary border-4 border-white"></div>
                  <p className="text-body-lg text-neutral-700 leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection className="bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-display-md md:text-display-lg font-bold tracking-tight mb-6">
            Join the Community
          </h2>
          <p className="text-heading-md text-neutral-300 max-w-2xl mx-auto mb-10">
            Discover why millions of athletes choose SPORT for their performance needs. Experience the difference premium quality makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-4 text-body-lg font-medium">
              Shop Collection
            </a>
            <a href="/events" className="btn btn-ghost border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-4 text-body-lg font-medium">
              Explore Events
            </a>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
