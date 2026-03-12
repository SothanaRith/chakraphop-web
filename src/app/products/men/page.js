import { Suspense } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import ProductFilters from '@/components/product/ProductFilters'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import MenProductsClient from './MenProductsClient'

export const metadata = {
  title: "Men's Athletic Wear | Premium Performance Gear | SPORT",
  description: "Explore our men's collection of premium athletic wear. Engineered for performance, designed for style. Free shipping over $100.",
  keywords: "men's athletic wear, men's activewear, sports clothing, training gear"
}

export default function MenPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Men's Collection"
        description="Built for athletes who demand more. Premium fabrics, precision engineering, uncompromising performance."
        breadcrumbs={['Home', 'Shop', "Men"]}
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
              <MenProductsClient />
            </Suspense>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
