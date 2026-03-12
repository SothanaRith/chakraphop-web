import { Suspense } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import ProductFilters from '@/components/product/ProductFilters'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { productService } from '@/lib/api/products'
import { Heart, Sparkles } from 'lucide-react'

export const metadata = {
  title: "Women's Athletic Wear | Premium Performance Gear | SPORT",
  description: "Discover our women's collection of premium athletic wear. Engineered for performance, designed for you. Free shipping over $100.",
  keywords: "women's athletic wear, women's activewear, sports clothing, training gear"
}

async function WomenProducts() {
  try {
    const response = await productService.getProducts({
      category: 'women',
      limit: 48
    })
    const products = response.data || []

    if (products.length === 0) {
      return (
        <EmptyState
          icon={Sparkles}
          title="No products found"
          description="We're currently updating our women's collection. Check back soon for new arrivals."
          cta="Browse All Products"
          href="/products"
        />
      )
    }

    return (
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return (
      <ErrorState
        title="Unable to load products"
        message="We're having trouble loading the women's collection. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }
}

export default function WomenPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Women's Collection"
        description="Engineered for athletes who lead. Performance-driven design meets uncompromising comfort and style."
        breadcrumbs={['Home', 'Shop', "Women"]}
      />

      <PageSection className="bg-white">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters - Desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <h3 className="text-heading-sm font-medium mb-6">Refine Results</h3>
              <ProductFilters />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<SkeletonLoader type="product-grid" count={6} />}>
              <WomenProducts />
            </Suspense>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
