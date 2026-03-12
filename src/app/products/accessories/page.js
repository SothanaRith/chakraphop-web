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
import { Watch, Bag } from 'lucide-react'

export const metadata = {
  title: "Athletic Accessories | Premium Gear & Equipment | SPORT",
  description: "Complete your athletic look with premium accessories. Bags, hats, socks, and more. Free shipping over $100.",
  keywords: "sports accessories, athletic gear, gym bags, sports hats"
}

async function AccessoriesProducts() {
  try {
    const response = await productService.getProducts({
      category: 'accessories',
      limit: 48
    })
    const products = response.data || []

    if (products.length === 0) {
      return (
        <EmptyState
          icon={Bag}
          title="No accessories found"
          description="We're currently updating our accessories collection. Check back soon for new items."
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
        title="Unable to load accessories"
        message="We're having trouble loading our accessories collection. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }
}

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Athletic Accessories"
        description="The details matter. Premium accessories designed to complete your performance gear with precision and style."
        breadcrumbs={['Home', 'Shop', "Accessories"]}
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
              <AccessoriesProducts />
            </Suspense>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
