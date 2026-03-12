import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { FEATURED_SECTIONS, CORE_SPORTS, MORE_SPORTS, SPORT_ICONS } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'
import Badge from '@/components/ui/Badge'

export const metadata = {
  title: 'Sports - Shop by Sport | SPORT',
  description: 'Explore our complete collection of performance gear organized by sport. Find everything you need for running, football, training, and more.',
}

export default function SportsHubPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/sports/hub-hero.jpg"
              alt="Sports Hub"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container-section">
              <div className="max-w-2xl text-white">
                <h1 className="text-display-lg font-bold mb-6 leading-tight">
                  Find Your Sport
                </h1>
                <p className="text-body-lg text-neutral-200 mb-8">
                  Performance gear designed, tested, and perfected by athletes. 
                  From running to training, football to basketball—we've got every sport covered.
                </p>
                <Link href="/sports/all" className="btn-primary">
                  Explore All Sports
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-neutral-50">
          <div className="container-section">
            <div className="text-center mb-12">
              <h2 className="text-heading-xl font-bold mb-4">Featured Collections</h2>
              <p className="text-body-lg text-neutral-600">
                Curated selections across all sports
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_SECTIONS.map(section => (
                <Link
                  key={section.id}
                  href={section.path}
                  className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-900"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
                  
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    {section.badge && (
                      <Badge variant="primary" className="mb-4 w-fit">
                        {section.badge}
                      </Badge>
                    )}
                    <h3 className="text-heading-lg font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">
                      {section.name}
                    </h3>
                    <p className="text-body text-neutral-200 mb-4">
                      {section.description}
                    </p>
                    <span className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                      Shop Now
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Core Sports */}
        <section className="py-20">
          <div className="container-section">
            <div className="text-center mb-12">
              <h2 className="text-heading-xl font-bold mb-4">Shop by Sport</h2>
              <p className="text-body-lg text-neutral-600">
                Find performance gear for your favorite activities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {CORE_SPORTS.map(sport => (
                <div key={sport.id} className="group">
                  {/* Sport Image */}
                  <Link href={sport.path} className="block relative h-96 rounded-2xl overflow-hidden mb-6 bg-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div className="absolute bottom-6 left-6 z-20">
                      <h3 className="text-heading-lg font-bold text-white group-hover:text-accent-primary transition-colors">
                        {sport.name}
                      </h3>
                    </div>
                  </Link>

                  {/* Categories */}
                  <ul className="space-y-3">
                    {sport.categories.map(category => (
                      <li key={category.id}>
                        <Link
                          href={category.path}
                          className="flex items-center justify-between text-body text-neutral-700 hover:text-accent-primary transition-colors"
                        >
                          <span>{category.name}</span>
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Sports */}
        <section className="py-20 bg-neutral-50">
          <div className="container-section">
            <div className="text-center mb-12">
              <h2 className="text-heading-xl font-bold mb-4">More Sports</h2>
              <p className="text-body-lg text-neutral-600">
                Explore additional sport categories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {MORE_SPORTS.filter(s => s.id !== 'all').map(sport => {
                const IconComponent = sport.icon ? SPORT_ICONS[sport.icon] : null
                return (
                  <Link
                    key={sport.id}
                    href={sport.path}
                    className="group flex flex-col items-center p-6 bg-white rounded-xl border border-neutral-200 hover:border-accent-primary hover:shadow-lg transition-all"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-neutral-100 rounded-full mb-4 group-hover:bg-accent-primary/10 transition-colors">
                      {IconComponent && <IconComponent className="w-8 h-8 text-neutral-600 group-hover:text-accent-primary transition-colors" />}
                    </div>
                    <h3 className="text-body font-semibold text-center group-hover:text-accent-primary transition-colors">
                      {sport.name}
                    </h3>
                  </Link>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Link href="/sports/all" className="btn-primary">
                View All Sports
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container-section text-center">
            <h2 className="text-heading-xl font-bold mb-6">
              Can't Find Your Sport?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              We're constantly expanding our collection. Check out our complete catalog or contact us for specific requests.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products" className="btn-primary">
                Shop All Products
              </Link>
              <Link href="/contact" className="btn-secondary-light">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  )
}
