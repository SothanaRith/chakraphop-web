import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ALL_SPORTS, FEATURED_SECTIONS, SPORT_ICONS, FEATURED_ICONS } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'
import Badge from '@/components/ui/Badge'

export const metadata = {
  title: 'All Sports - Complete Directory | SPORT',
  description: 'Browse our complete directory of sports. Find performance gear for every activity.',
}

export default function AllSportsPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen py-16">
        <div className="container-section">
          
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-display-md font-bold mb-4">All Sports</h1>
            <p className="text-body-lg text-neutral-600 max-w-3xl">
              Browse our complete directory of sports and find the perfect gear for your activity. 
              From performance footwear to technical apparel, we've got you covered.
            </p>
          </div>

          {/* Featured Collections */}
          <section className="mb-20">
            <h2 className="text-heading-xl font-bold mb-8">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_SECTIONS.map(section => {
                const IconComponent = section.icon ? FEATURED_ICONS[section.icon] : null
                return (
                  <Link
                    key={section.id}
                    href={section.path}
                    className="group p-8 bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-accent-primary hover:shadow-lg rounded-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg border border-neutral-200 group-hover:border-accent-primary transition-colors">
                        {IconComponent && <IconComponent className="w-6 h-6 text-accent-primary" />}
                      </div>
                      {section.badge && (
                        <Badge variant="primary" size="sm">{section.badge}</Badge>
                      )}
                    </div>
                    <h3 className="text-body-lg font-semibold mb-2 group-hover:text-accent-primary transition-colors">
                      {section.name}
                    </h3>
                    <p className="text-body text-neutral-600 mb-4">
                      {section.description}
                    </p>
                    <span className="flex items-center gap-2 text-body-sm font-medium text-accent-primary group-hover:gap-3 transition-all">
                      Explore
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* All Sports Directory */}
          <section>
            <h2 className="text-heading-xl font-bold mb-8">All Sports A-Z</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ALL_SPORTS.map(sport => {
                const IconComponent = sport.icon ? SPORT_ICONS[sport.icon] : null
                return (
                  <div
                    key={sport.id}
                    className="p-8 bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-neutral-200 flex-shrink-0">
                        {IconComponent && <IconComponent className="w-8 h-8 text-accent-primary" />}
                      </div>
                      
                      <div className="flex-1">
                        <Link href={sport.path} className="group">
                          <h3 className="text-body-lg font-semibold mb-2 group-hover:text-accent-primary transition-colors">
                            {sport.name}
                          </h3>
                        </Link>
                        <p className="text-body text-neutral-600 mb-4">
                        {sport.description}
                      </p>
                      
                      {/* Categories (if available) */}
                      {sport.categories && sport.categories.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {sport.categories.slice(1).map(category => ( // Skip 'All' category
                            <Link
                              key={category.id}
                              href={category.path}
                              className="text-body-sm text-neutral-700 hover:text-accent-primary transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={sport.path}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-neutral-200 hover:border-accent-primary hover:bg-accent-primary/5 transition-all flex-shrink-0"
                    >
                      <ChevronRight className="w-5 h-5 text-neutral-600 hover:text-accent-primary" />
                    </Link>
                  </div>
                </div>
              )
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-20 p-12 bg-neutral-900 text-white rounded-2xl text-center">
            <h2 className="text-heading-xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Our collection is constantly growing. Browse all products or get in touch with our team for specific requests.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products" className="btn-primary">
                Shop All Products
              </Link>
              <Link href="/contact" className="btn-secondary-light">
                Contact Support
              </Link>
            </div>
          </section>

        </div>
      </div>
    </PageWrapper>
  )
}
