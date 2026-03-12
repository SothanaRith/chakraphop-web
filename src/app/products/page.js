import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import FilterPanel from '@/components/product/FilterPanel'
import SortBar from '@/components/product/SortBar'
import ProductCard from '@/components/product/ProductCard'
import Container from '@/components/ui/Container'
import { Sparkles, TrendingUp, Award } from 'lucide-react'

export const metadata = {
  title: 'Premium Athletic Wear | SPORT Collection',
  description: 'Explore our complete collection of premium athletic wear. Designed for performance, crafted for style. Free shipping on orders over $100.',
  keywords: 'athletic wear, sports clothing, premium activewear, training gear, running apparel',
}

export default function ProductsPage() {
  // Sample data - replace with real data from API
  const products = [
    {
      id: '1',
      name: 'Performance Training Jacket',
      price: 129,
      originalPrice: 159,
      image: '/images/product-1.jpg',
      category: 'Training',
      colors: ['#000000', '#1a1a1a', '#4a4a4a'],
      isNew: true,
    },
    {
      id: '2',
      name: 'Elite Running Shorts',
      price: 68,
      image: '/images/product-2.jpg',
      category: 'Running',
      colors: ['#000000', '#ffffff', '#e74c3c'],
      isNew: false,
    },
    {
      id: '3',
      name: 'Lightweight Training Tee',
      price: 45,
      image: '/images/product-3.jpg',
      category: 'Essentials',
      colors: ['#ffffff', '#000000', '#3498db'],
      isNew: true,
    },
    {
      id: '4',
      name: 'Pro Compression Leggings',
      price: 95,
      originalPrice: 120,
      image: '/images/product-4.jpg',
      category: 'Training',
      colors: ['#000000', '#4a4a4a'],
      isNew: false,
    },
    {
      id: '5',
      name: 'Sport Performance Hoodie',
      price: 98,
      image: '/images/product-5.jpg',
      category: 'Lifestyle',
      colors: ['#000000', '#808080', '#ffffff'],
      isNew: true,
    },
    {
      id: '6',
      name: 'Tech Running Cap',
      price: 32,
      image: '/images/product-6.jpg',
      category: 'Accessories',
      colors: ['#000000', '#ffffff'],
      isNew: false,
    },
    {
      id: '7',
      name: 'Training Tank Top',
      price: 38,
      image: '/images/product-7.jpg',
      category: 'Training',
      colors: ['#ffffff', '#000000', '#808080'],
      isNew: false,
    },
    {
      id: '8',
      name: 'Performance Joggers',
      price: 85,
      originalPrice: 110,
      image: '/images/product-8.jpg',
      category: 'Lifestyle',
      colors: ['#000000', '#1a1a1a'],
      isNew: true,
    },
  ]

  return (
    <>
      <Navigation />
      <main className="pt-32">
        <Container variant="section">
          {/* Enhanced Page Header */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-primary" />
              <span className="text-body-sm font-medium text-accent-primary">
                Premium Collection
              </span>
            </div>
            <h1 className="text-display-sm md:text-display-md lg:text-display-lg mb-6">
              Performance Meets Style
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mb-8">
              Every piece is engineered for athletes who demand excellence. 
              Premium fabrics, precision fit, uncompromising quality.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-body-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neutral-400" />
                <span className="text-neutral-700">Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-neutral-400" />
                <span className="text-neutral-700">30-day returns</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <FilterPanel />
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <SortBar totalProducts={products.length} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mt-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-16 text-center">
                <button className="btn btn-secondary">
                  Load More Products
                </button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
