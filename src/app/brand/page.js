import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'

export const metadata = {
  title: "Our Brand | SPORT",
  description: "Discover the story, values, and philosophy behind SPORT. We're building the future of athletic excellence."
}

export default function BrandPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="The SPORT Story"
        description="We're not just a brand. We're a movement built on performance, authenticity, and the belief that great athletic gear should be accessible to everyone."
        breadcrumbs={['Home', 'Company', 'Brand']}
      />

      {/* The Beginning */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">The Beginning</h2>
          <div className="space-y-6 text-heading-md text-neutral-600 leading-relaxed">
            <p>
              In 2015, our founder was a trail runner in Portland. She loved her sport with a passion that went beyond casual weekends. But after years of searching, she couldn't find a brand that understood what she needed.
            </p>
            <p>
              High-end athletic brands prioritized prestige over performance. Fast-fashion retailers made cheap gear that fell apart. There was nothing in between—no brand that treated athletes with respect while maintaining truly premium quality.
            </p>
            <p>
              So she decided to build one.
            </p>
            <p>
              What started in a garage in Portland, with prototypes tested on local trails and feedback from real athletes, has grown into SPORT. Not because we had the most money or the best marketing. But because we listened. We iterated. We refused to compromise.
            </p>
          </div>
        </div>
      </PageSection>

      {/* Core Values */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Our Values</h2>
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-xl font-bold mb-4">Performance First</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Every product we make is tested by real athletes. Looks matter, but function is everything. We design for runners, cyclists, climbers, and everyone in between—and we test relentlessly to ensure our gear earns its place in your kit.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-xl font-bold mb-4">Radical Honesty</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                We tell you the truth about our products. If something's not perfect, we say so. If we make a mistake, we own it. We believe that trust is built through transparency, not marketing spin.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-xl font-bold mb-4">Sustainable Impact</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                We're committed to making products responsibly. That means ethical manufacturing, sustainable materials, and a supply chain we're proud of. We don't use sustainability as a marketing angle—it's built into everything we do.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-xl font-bold mb-4">Community Over Competition</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                We believe athletes are stronger together. We build products for connection, not competition between brands. Your community is more important than our market share.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-heading-xl font-bold mb-4">Relentless Excellence</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                We're never satisfied with "good enough." Every detail matters. From the stitching on our products to the experience on our website, we sweat the small stuff because athletes deserve nothing less.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Our Promise */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Our Promise to You</h2>
          <div className="space-y-6 text-heading-md text-neutral-600 leading-relaxed">
            <p>
              When you buy from SPORT, you're not just buying a product. You're investing in your performance, your journey, and your community.
            </p>
            <p>
              We promise to:
            </p>
            <ul className="space-y-4 ml-4 border-l-2 border-accent-500 pl-6">
              <li>Make products that are genuinely better than the alternative</li>
              <li>Be transparent about our practices, materials, and impact</li>
              <li>Support your athletic journey through every season</li>
              <li>Protect the planet we all train on</li>
              <li>Build a community where athletes belong</li>
            </ul>
            <p>
              These aren't marketing promises. They're commitments that guide every decision we make.
            </p>
          </div>
        </div>
      </PageSection>

      {/* By the Numbers */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12 text-center">SPORT By the Numbers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-display-md font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>2.5M</div>
              <p className="text-body text-neutral-600">Athletes served globally</p>
            </div>
            <div className="text-center">
              <div className="text-display-md font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>50+</div>
              <p className="text-body text-neutral-600">Countries and regions</p>
            </div>
            <div className="text-center">
              <div className="text-display-md font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>98%</div>
              <p className="text-body text-neutral-600">Customer satisfaction rate</p>
            </div>
            <div className="text-center">
              <div className="text-display-md font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>500+</div>
              <p className="text-body text-neutral-600">Team members worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-display-md font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>100%</div>
              <p className="text-body text-neutral-600">Ethical manufacturing</p>
            </div>
            <div className="text-center">
              <div className="text-display-md font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>9</div>
              <p className="text-body text-neutral-600">Years in the making</p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Our Team */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Built by Athletes, for Athletes</h2>
          <p className="text-heading-md text-neutral-600 leading-relaxed mb-6">
            Our team isn't just a collection of talented people. We're runners, climbers, cyclists, and swimmers. We test our products on mountain trails, in racing conditions, and during everyday training.
          </p>
          <p className="text-heading-md text-neutral-600 leading-relaxed mb-6">
            That direct experience shapes every decision we make. We understand the athlete's perspective because we live it.
          </p>
          <p className="text-heading-md text-neutral-600 leading-relaxed">
            Interested in joining us? We're always looking for talented, passionate people who want to build the future of athletic excellence.
          </p>
          <a href="/careers" className="inline-block mt-6 px-8 py-4 text-body font-medium text-white transition-all" style={{ backgroundColor: 'var(--color-accent-primary)' }}>
            Explore Careers →
          </a>
        </div>
      </PageSection>

      {/* Brand Philosophy */}
      <PageSection className="bg-neutral-50">
        <div className="max-w-4xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Design Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-heading-xl font-bold mb-4">Minimalist by Design</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                We believe in the power of simplicity. No unnecessary features. No visual clutter. Just clean, functional design that gets out of your way so you can focus on your performance.
              </p>
            </div>
            <div>
              <h3 className="text-heading-xl font-bold mb-4">Premium, Not Pretentious</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                High quality doesn't have to mean high price. We focus on what matters: materials, construction, and performance. Luxury is the product, not the packaging.
              </p>
            </div>
            <div>
              <h3 className="text-heading-xl font-bold mb-4">Built to Last</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                We make gear that stays with you for seasons. Every stitch, seam, and material is chosen for durability. We believe in products worth keeping.
              </p>
            </div>
            <div>
              <h3 className="text-heading-xl font-bold mb-4">Timeless Aesthetic</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Trends fade. We design for longevity. Our products look as good in five years as they do today because we focus on proportion, fit, and classic design.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Contact */}
      <PageSection className="bg-white">
        <div className="max-w-3xl bg-neutral-50 p-12 rounded-lg text-center">
          <h3 className="text-heading-xl font-bold mb-4">Want to Partner with SPORT?</h3>
          <p className="text-body text-neutral-600 mb-8">
            We're interested in collaborations, sponsorships, and partnerships that align with our values.
          </p>
          <a href="mailto:partnerships@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
            Get in Touch →
          </a>
        </div>
      </PageSection>
    </main>
  )
}
