'use client'

/**
 * SportPageTemplate Component
 * Reusable template for all sport pages (landing, category, featured)
 * Handles API calls, loading states, and consistent layout
 */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Badge from '@/components/ui/Badge'

export default function SportPageTemplate({
  // Page metadata
  sport, // { id, name, slug, description, heroImage, categories }
  category, // Optional: { id, name, slug, description }
  featured, // Optional: { id, name, slug, description, badge }
  
  // Layout options
  layout = 'landing', // 'landing' | 'catalog' | 'featured'
  showHero = true,
  showCategoryNav = true,
  showFilters = false,
  
  // Content
  title,
  description,
  heroImage,
  heroHeight = 'medium', // 'small' | 'medium' | 'large'
  
  // Children
  children
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Determine page type
  const isCatalog = layout === 'catalog' || category
  const isFeatured = layout === 'featured' || featured
  const isLanding = layout === 'landing' && !category && !featured

  // Build breadcrumbs
  const breadcrumbs = buildBreadcrumbs({ sport, category, featured })

  // Build page title and description
  const pageTitle = title || getPageTitle({ sport, category, featured })
  const pageDescription = description || getPageDescription({ sport, category, featured })
  const pageHeroImage = heroImage || sport?.heroImage || '/images/sports/default-hero.jpg'

  useEffect(() => {
    fetchProducts()
  }, [sport, category, featured])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build API query
      const query = buildApiQuery({ sport, category, featured })
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'
      const response = await fetch(`${apiUrl}/products?${new URLSearchParams(query)}`)
      
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Hero height classes
  const heroHeightClasses = {
    small: 'h-48 lg:h-64',
    medium: 'h-64 lg:h-80',
    large: 'h-80 lg:h-96'
  }

  return (
    <div className="min-h-screen">
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="container-section py-4">
            <nav className="flex items-center gap-2 text-body-sm text-neutral-600">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="w-4 h-4" />}
                  {crumb.href ? (
                    <Link 
                      href={crumb.href}
                      className="hover:text-accent-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-neutral-900 font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {showHero && (
        <section className={`relative ${heroHeightClasses[heroHeight]} bg-neutral-900 overflow-hidden`}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={pageHeroImage}
              alt={pageTitle}
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container-section">
              <div className="max-w-2xl text-white">
                {/* Badge for Featured Pages */}
                {featured?.badge && (
                  <Badge variant="primary" className="mb-4">
                    {featured.badge}
                  </Badge>
                )}

                {/* Title */}
                <h1 className="text-display-lg font-bold mb-4 leading-tight">
                  {pageTitle}
                </h1>

                {/* Description */}
                {pageDescription && (
                  <p className="text-body-lg text-neutral-200 mb-8">
                    {pageDescription}
                  </p>
                )}

                {/* CTA for Landing Pages */}
                {isLanding && sport?.categories && (
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={sport.categories[1]?.path || '#'}
                      className="btn-primary"
                    >
                      Shop Shoes
                    </Link>
                    <Link
                      href={sport.categories[2]?.path || '#'}
                      className="btn-secondary-light"
                    >
                      Shop Clothing
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Navigation (for landing pages) */}
      {showCategoryNav && isLanding && sport?.categories && (
        <section className="bg-white border-b border-neutral-200">
          <div className="container-section py-8">
            <div className="flex flex-wrap gap-4">
              {sport.categories.map(cat => (
                <Link
                  key={cat.id}
                  href={cat.path}
                  className="flex-1 min-w-[200px] px-6 py-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors group"
                >
                  <h3 className="text-body-lg font-semibold mb-1 group-hover:text-accent-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-body-sm text-neutral-600">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container-section">
          
          {/* Page Header (for catalog pages) */}
          {(isCatalog || isFeatured) && (
            <div className="mb-12">
              <h1 className="text-heading-xl font-bold mb-4">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-body-lg text-neutral-600 max-w-3xl">
                  {pageDescription}
                </p>
              )}
            </div>
          )}

          {/* Custom Children Content (if provided) */}
          {children}

          {/* Products Loading State */}
          {loading && (
            <SkeletonLoader variant="product-grid" count={8} />
          )}

          {/* Products Error State */}
          {error && (
            <ErrorState 
              title="Unable to load products"
              message={error}
              onRetry={fetchProducts}
            />
          )}

          {/* Products Empty State */}
          {!loading && !error && products.length === 0 && (
            <EmptyState
              title={`No products found${category ? ' in this category' : ''}`}
              message="Check back soon for new arrivals or explore other categories"
              primaryButton={{
                label: 'View All Sports',
                href: '/sports/all'
              }}
              secondaryButton={sport ? {
                label: `Back to ${sport.name}`,
                href: sport.path
              } : undefined}
            />
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Sport Story Section (for landing pages) */}
      {isLanding && sport && (
        <section className="py-20 bg-neutral-50">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-heading-xl font-bold mb-6">
                Built for {sport.name}
              </h2>
              <p className="text-body-lg text-neutral-600 leading-relaxed">
                {sport.description}. Every piece is designed, tested, and perfected by athletes
                who demand excellence. From first step to finish line, we've got you covered.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={product.image || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge variant="primary">{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h3 className="text-body font-semibold mb-1 group-hover:text-accent-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-body-sm text-neutral-600 mb-2">
          {product.category}
        </p>
        <p className="text-body font-bold">
          ${product.price}
        </p>
      </div>
    </Link>
  )
}

// Helper: Build breadcrumbs
function buildBreadcrumbs({ sport, category, featured }) {
  const crumbs = [{ label: 'Home', href: '/' }]
  
  if (featured) {
    crumbs.push({ label: 'Sports', href: '/sports' })
    crumbs.push({ label: featured.name })
    return crumbs
  }

  if (sport) {
    crumbs.push({ label: 'Sports', href: '/sports' })
    crumbs.push({ label: sport.name, href: category ? sport.path : undefined })
    if (category) {
      crumbs.push({ label: category.name })
    }
  }

  return crumbs
}

// Helper: Get page title
function getPageTitle({ sport, category, featured }) {
  if (featured) return featured.name
  if (category) return `${sport?.name || ''} ${category.name}`.trim()
  if (sport) return sport.name
  return 'Sports'
}

// Helper: Get page description
function getPageDescription({ sport, category, featured }) {
  if (featured) return featured.description
  if (category) return category.description
  if (sport) return sport.description
  return 'Explore our complete sport collection'
}

// Helper: Build API query
function buildApiQuery({ sport, category, featured }) {
  const query = {}
  
  if (featured) {
    query.featured = featured.slug
  } else {
    if (sport) query.sport = sport.slug
    if (category) query.category = category.slug
  }
  
  return query
}
