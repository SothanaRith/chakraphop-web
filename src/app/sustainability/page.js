import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import { Leaf, Zap, Droplet, Heart } from 'lucide-react'

export const metadata = {
  title: "Sustainability | SPORT",
  description: "Our commitment to environmental responsibility and transparent, ethical manufacturing practices."
}

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Sustainability"
        description="We believe that premium athletic gear and environmental responsibility aren't mutually exclusive. They're essential."
        breadcrumbs={['Home', 'Company', 'Sustainability']}
      />

      {/* Our Commitment */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Our Commitment</h2>
          <div className="space-y-6 text-heading-md text-neutral-600 leading-relaxed">
            <p>
              At SPORT, sustainability isn't an afterthought or a marketing initiative. It's woven into every decision we make—from material sourcing to manufacturing to packaging.
            </p>
            <p>
              We're not perfect. But we're committed to transparency about where we are, where we want to be, and the concrete steps we're taking to get there.
            </p>
            <p>
              Our goal is simple: make the most sustainable athletic gear possible without compromising on performance or quality. That's the challenge. That's what drives us.
            </p>
          </div>
        </div>
      </PageSection>

      {/* Core Pillars */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Our Pillars</h2>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg flex gap-6">
              <div className="text-neutral-900 flex-shrink-0 mt-2">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-heading-xl font-bold mb-4">Responsible Materials</h3>
                <p className="text-body text-neutral-600 leading-relaxed mb-4">
                  We prioritize sustainable fabrics and materials. Our current lineup includes:
                </p>
                <ul className="space-y-2 text-body text-neutral-600">
                  <li>• Organic cotton (GOTS certified)</li>
                  <li>• Recycled polyester from post-consumer waste</li>
                  <li>• Bio-based nylon from castor bean oil</li>
                  <li>• Natural rubber soles (FSC certified)</li>
                </ul>
                <p className="text-body text-neutral-600 mt-4">
                  By 2026, 100% of our products will use sustainable or recycled materials.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg flex gap-6">
              <div className="text-neutral-900 flex-shrink-0 mt-2">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-heading-xl font-bold mb-4">Ethical Manufacturing</h3>
                <p className="text-body text-neutral-600 leading-relaxed mb-4">
                  Every SPORT product is made in facilities that meet rigorous standards:
                </p>
                <ul className="space-y-2 text-body text-neutral-600">
                  <li>• Fair wages and safe working conditions (audited annually)</li>
                  <li>• Zero child labor or forced labor</li>
                  <li>• Renewable energy used in 70% of our manufacturing</li>
                  <li>• Water-conscious production processes</li>
                </ul>
                <p className="text-body text-neutral-600 mt-4">
                  We work directly with 15 manufacturing partners across 8 countries, building long-term relationships based on mutual respect and shared values.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg flex gap-6">
              <div className="text-neutral-900 flex-shrink-0 mt-2">
                <Droplet className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-heading-xl font-bold mb-4">Environmental Impact</h3>
                <p className="text-body text-neutral-600 leading-relaxed mb-4">
                  Our initiatives to reduce our carbon footprint:
                </p>
                <ul className="space-y-2 text-body text-neutral-600">
                  <li>• Carbon-neutral shipping on all orders</li>
                  <li>• Recyclable, plastic-free packaging</li>
                  <li>• 40% reduction in water usage since 2019</li>
                  <li>• Closed-loop dyeing processes (70% waste reduction)</li>
                </ul>
                <p className="text-body text-neutral-600 mt-4">
                  We've invested in renewable energy credits to offset 100% of our operational emissions through 2025.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg flex gap-6">
              <div className="text-neutral-900 flex-shrink-0 mt-2">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-heading-xl font-bold mb-4">Product Longevity</h3>
                <p className="text-body text-neutral-600 leading-relaxed">
                  The most sustainable product is one that lasts. We design for durability, offer repair services for all products, and make it easy to recycle or responsibly dispose of worn-out gear through our SPORT Renewal program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* By The Numbers */}
      <PageSection className="bg-white">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-neutral-50 rounded-lg">
              <div className="text-heading-xl font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>50M</div>
              <p className="text-body text-neutral-600 mb-4">Plastic bottles diverted from oceans (recycled into products)</p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-lg">
              <div className="text-heading-xl font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>10K</div>
              <p className="text-body text-neutral-600 mb-4">Hectares of forest protected through our sourcing partnerships</p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-lg">
              <div className="text-heading-xl font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>1.2M</div>
              <p className="text-body text-neutral-600 mb-4">Gallons of water saved through improved production</p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-lg">
              <div className="text-heading-xl font-bold mb-2" style={{ color: 'var(--color-accent-primary)' }}>500</div>
              <p className="text-body text-neutral-600 mb-4">Workers uplifted through fair wages and benefits</p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* 2025-2030 Goals */}
      <PageSection className="bg-neutral-50">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">2025–2030 Goals</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-heading-lg font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-body font-bold">1</span>
                Materials
              </h3>
              <p className="text-body text-neutral-600 ml-12">
                100% sustainable or recycled materials in all products by end of 2026.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-body font-bold">2</span>
                Carbon Neutrality
              </h3>
              <p className="text-body text-neutral-600 ml-12">
                Achieve carbon neutrality across our full supply chain by 2027. (Currently at 60%.)
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-body font-bold">3</span>
                Transparency
              </h3>
              <p className="text-body text-neutral-600 ml-12">
                Publish a full supply chain map showing every manufacturer and supplier. Publicly report our progress quarterly.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-body font-bold">4</span>
                Circular Economy
              </h3>
              <p className="text-body text-neutral-600 ml-12">
                Build a take-back program where customers can return worn-out SPORT gear for recycling or refurbishment. 50% of returned items will re-enter circulation.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-body font-bold">5</span>
                Community Impact
              </h3>
              <p className="text-body text-neutral-600 ml-12">
                Donate 2% of profits to environmental and athletic community organizations. Train and empower 1,000 athletes as sustainability advocates.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Transparency */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">We're Still Learning</h2>
          <div className="space-y-6 text-heading-md text-neutral-600 leading-relaxed">
            <p>
              Sustainability is a journey, not a destination. We make mistakes. We discover better ways of doing things. And we adapt.
            </p>
            <p>
              That's why we publish an annual sustainability report detailing our progress, challenges, and setbacks. We believe transparency builds trust more than perfection ever could.
            </p>
            <p>
              What are we struggling with? Water usage in certain manufacturing regions. Finding sustainable alternatives to some synthetic materials without sacrificing performance. Building scalable circular economy systems.
            </p>
            <p>
              We're working on all of it. And we're committed to sharing what we learn along the way.
            </p>
          </div>
          <a href="/press" className="inline-block mt-8 px-8 py-4 border border-neutral-900 text-body font-medium hover:bg-neutral-900 hover:text-white transition-colors">
            Read Our Latest Report
          </a>
        </div>
      </PageSection>

      {/* Questions */}
      <PageSection className="bg-neutral-50">
        <div className="max-w-3xl bg-white p-12 rounded-lg">
          <h3 className="text-heading-xl font-bold mb-4">Have questions about our sustainability practices?</h3>
          <p className="text-body text-neutral-600 mb-6">
            We love talking about this. Reach out to our sustainability team.
          </p>
          <a href="mailto:sustainability@sport.com" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
            Contact Us →
          </a>
        </div>
      </PageSection>
    </main>
  )
}
