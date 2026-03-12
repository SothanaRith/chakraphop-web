import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import { Download, Mail } from 'lucide-react'

export const metadata = {
  title: "Press | SPORT",
  description: "Media coverage, press releases, brand assets, and press contact information for journalists and media outlets."
}

const pressReleases = [
  {
    date: 'February 2024',
    title: 'SPORT Launches Sustainable Footwear Line with 80% Recycled Materials',
    excerpt: 'New collection demonstrates commitment to environmental responsibility while maintaining premium performance standards.',
    link: '#'
  },
  {
    date: 'December 2023',
    title: 'SPORT Reaches 2.5 Million Athletes Globally, Announces Expansion Plans',
    excerpt: 'The performance brand celebrates milestone year with record growth and announces new regional offices.',
    link: '#'
  },
  {
    date: 'September 2023',
    title: 'SPORT Partners with Leading Universities for Athletic Research Initiative',
    excerpt: 'Multi-year collaboration aims to advance sports science and product development through rigorous testing protocols.',
    link: '#'
  },
  {
    date: 'June 2023',
    title: 'Olympic Athletes Choose SPORT for Paris 2024 Training & Competition',
    excerpt: 'Official partnership solidifies SPORT as premium choice for elite athletes worldwide.',
    link: '#'
  }
]

const mediaLogos = [
  { name: 'The Athletic', size: 'w-32' },
  { name: 'Runner\'s World', size: 'w-32' },
  { name: 'Wired', size: 'w-32' },
  { name: 'Forbes', size: 'w-32' },
  { name: 'Fast Company', size: 'w-32' },
  { name: 'TechCrunch', size: 'w-32' },
]

const brandAssets = [
  {
    title: 'Logo Suite',
    description: 'Primary, secondary, and mark-only logos in all formats. Includes color and monochrome versions.',
    files: 'Logo_Suite.zip (12 MB)'
  },
  {
    title: 'Brand Guidelines',
    description: 'Complete brand book including typography, color system, imagery style, and usage guidelines.',
    files: 'Brand_Guidelines.pdf (8 MB)'
  },
  {
    title: 'Product Photography',
    description: '200+ high-resolution product photos suitable for editorial use. All rights included.',
    files: 'Product_Photos_HiRes.zip (450 MB)'
  },
  {
    title: 'Executive Portraits',
    description: 'High-resolution headshots and portraits of leadership team for articles and features.',
    files: 'Executive_Portraits.zip (85 MB)'
  },
]

export default function PressPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Press"
        description="Media coverage, brand assets, and press contact information. We love working with journalists and creators."
        breadcrumbs={['Home', 'Company', 'Press']}
      />

      {/* Quick Contact */}
      <PageSection className="bg-white">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <div className="bg-accent-50 p-8 rounded-lg">
            <Mail className="w-6 h-6 mb-3" style={{ color: 'var(--color-accent-primary)' }} />
            <h3 className="text-heading-lg font-bold mb-2">Press Inquiries</h3>
            <p className="text-body text-neutral-600 mb-4">For media requests, interviews, and story ideas.</p>
            <a href="mailto:press@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
              press@sport.com
            </a>
          </div>
          <div className="bg-accent-50 p-8 rounded-lg">
            <Mail className="w-6 h-6 mb-3" style={{ color: 'var(--color-accent-primary)' }} />
            <h3 className="text-heading-lg font-bold mb-2">Media Assets</h3>
            <p className="text-body text-neutral-600 mb-4">Brand assets available below. Questions? Get in touch.</p>
            <a href="#assets" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
              View Assets →
            </a>
          </div>
        </div>
      </PageSection>

      {/* Recent Coverage */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-2">Featured In</h2>
          <p className="text-body text-neutral-600 mb-12">SPORT stories and insights from leading media outlets.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center mb-16">
            {mediaLogos.map((logo, idx) => (
              <div key={idx} className="h-16 flex items-center justify-center bg-white rounded-lg p-4">
                <span className="text-body font-medium text-neutral-600">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Press Releases */}
      <PageSection className="bg-white">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Latest Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, idx) => (
              <div key={idx} className="pb-6 border-b border-neutral-200 last:border-b-0">
                <span className="text-body-sm text-neutral-500 font-medium">{release.date}</span>
                <h3 className="text-heading-lg font-bold mt-2 mb-3">{release.title}</h3>
                <p className="text-body text-neutral-600 mb-4">{release.excerpt}</p>
                <a href={release.link} className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
                  Read Full Release →
                </a>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Media Assets */}
      <PageSection id="assets" className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Media Assets & Downloads</h2>
          <p className="text-body text-neutral-600 mb-12 max-w-2xl">
            All assets are provided for editorial use. Please credit SPORT when using brand materials. For commercial licensing inquiries, contact our press team.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {brandAssets.map((asset, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow">
                <Download className="w-6 h-6 mb-4 text-neutral-900" />
                <h3 className="text-heading-lg font-bold mb-2">{asset.title}</h3>
                <p className="text-body text-neutral-600 mb-6">{asset.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-neutral-500">{asset.files}</span>
                  <button className="px-6 py-3 border border-neutral-900 text-body font-medium hover:bg-neutral-900 hover:text-white transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Story Ideas */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Story Ideas</h2>
          <p className="text-heading-md text-neutral-600 leading-relaxed mb-8">
            Journalists and creators are always looking for fresh angles. Here are a few stories that might interest you:
          </p>
          <div className="space-y-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">The Future of Sustainable Fashion</h3>
              <p className="text-body text-neutral-600">
                How premium athletic brands are rethinking sustainability—moving beyond greenwashing to real impact. Featuring SPORT's circular economy initiative.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">Direct-to-Consumer Brands That Broke Through</h3>
              <p className="text-body text-neutral-600">
                Case study: How SPORT built a 2.5M-person community without massive ad spend. The role of quality, community, and authentic storytelling.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">Inside the Design Process of a Premium Athletic Brand</h3>
              <p className="text-body text-neutral-600">
                Behind-the-scenes look at how SPORT designs products. From athlete testing to manufacturing partnerships to the final product.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">Building a Team of Athletes for an Athletic Brand</h3>
              <p className="text-body text-neutral-600">
                How SPORT's commitment to hiring real athletes shapes company culture, product development, and brand authenticity.
              </p>
            </div>
          </div>
          <p className="text-body text-neutral-600 mt-8">
            Have a story idea? We'd love to collaborate. Reach out to press@sport.com
          </p>
        </div>
      </PageSection>

      {/* Leadership Team */}
      <PageSection className="bg-neutral-50">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Leadership Interviews Available</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">Sarah Chen, Founder & CEO</h3>
              <p className="text-body text-neutral-600 mb-4">
                Serial entrepreneur, trail runner, and visionary behind SPORT's mission to democratize premium athletic gear.
              </p>
              <a href="mailto:press@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
                Request Interview →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">Marcus Johnson, Chief Product Officer</h3>
              <p className="text-body text-neutral-600 mb-4">
                Former designer at Nike and Patagonia. Leads product strategy and innovation at SPORT.
              </p>
              <a href="mailto:press@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
                Request Interview →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-heading-lg font-bold mb-2">Dr. Lisa Park, Chief Sustainability Officer</h3>
              <p className="text-body text-neutral-600 mb-4">
                Environmental scientist and supply chain expert. Drives SPORT's sustainability initiatives and impact.
              </p>
              <a href="mailto:press@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
                Request Interview →
              </a>
            </div>
          </div>
        </div>
      </PageSection>

      {/* FAQ */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-heading-lg font-bold mb-2">What does SPORT stand for?</h3>
              <p className="text-body text-neutral-600">
                SPORT is a brand name representing our mission: performance, authentic community, resilience, and timeless design. We intentionally kept it simple.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-2">Who founded SPORT?</h3>
              <p className="text-body text-neutral-600">
                SPORT was founded in 2015 by Sarah Chen, a designer and athlete frustrated with the lack of truly premium athletic gear. It started in a garage in Portland.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-2">Where are SPORT products manufactured?</h3>
              <p className="text-body text-neutral-600">
                We partner with facilities across Vietnam, Indonesia, and India. All manufacturing partners are audited annually for fair labor practices and environmental compliance. We maintain long-term relationships with each partner.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-2">What's SPORT's competitive advantage?</h3>
              <p className="text-body text-neutral-600">
                Quality, authenticity, community, and direct-to-consumer relationships. We cut out middlemen, test products with real athletes, and build products to last—not to replace quickly.
              </p>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
