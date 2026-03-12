import PageWrapper from '@/components/ui/PageWrapper'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductCard from '@/components/product/ProductCard'
import Badge from '@/components/ui/Badge'
import { Truck, Shield, RotateCcw, Award } from 'lucide-react'

export const metadata = {
  title: 'Performance Training Jacket | Premium Athletic Wear | SPORT',
  description: 'Premium performance fabric with moisture-wicking technology. Engineered for high-intensity training. Free shipping & 30-day returns.',
}

export default function ProductDetailPage({ params }) {
  // Sample data - replace with real data from API based on params.id
  const product = {
    id: '1',
    name: 'Performance Training Jacket',
    price: 129,
    originalPrice: 159,
    category: 'Training',
    images: [
      '/images/product-detail-1.jpg',
      '/images/product-detail-2.jpg',
      '/images/product-detail-3.jpg',
      '/images/product-detail-4.jpg',
    ],
    colors: [
      { hex: '#000000', name: 'Black' },
      { hex: '#1a1a1a', name: 'Charcoal' },
      { hex: '#4a4a4a', name: 'Gray' },
    ],
    description: 'Engineered for high-intensity training with premium performance fabric and moisture-wicking technology.',
    isNew: true,
  }

  // Related products
  const relatedProducts = [
    {
      id: '2',
      name: 'Elite Running Shorts',
      price: 68,
      image: '/images/product-2.jpg',
      category: 'Running',
      colors: ['#000000', '#ffffff', '#e74c3c'],
    },
    {
      id: '3',
      name: 'Lightweight Training Tee',
      price: 45,
      image: '/images/product-3.jpg',
      category: 'Essentials',
      colors: ['#ffffff', '#000000', '#3498db'],
    },
    {
      id: '4',
      name: 'Pro Compression Leggings',
      price: 95,
      originalPrice: 120,
      image: '/images/product-4.jpg',
      category: 'Training',
      colors: ['#000000', '#4a4a4a'],
    },
    {
      id: '5',
      name: 'Sport Performance Hoodie',
      price: 98,
      image: '/images/product-5.jpg',
      category: 'Lifestyle',
      colors: ['#000000', '#808080', '#ffffff'],
    },
  ]

  return (
    <PageWrapper>
      <div className="container-section">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-body-sm text-neutral-600">
            <li><a href="/" className="hover:text-neutral-900">Home</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-neutral-900">Products</a></li>
            <li>/</li>
            <li><a href={`/products/${product.category.toLowerCase()}`} className="hover:text-neutral-900">{product.category}</a></li>
            <li>/</li>
            <li className="text-neutral-900">{product.name}</li>
          </ol>
        </nav>

        {/* Product Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <ProductGallery images={product.images} />
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Trust Badges */}
        <section className="bg-neutral-50 rounded-2xl p-8 lg:p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="text-body font-medium mb-1">Free Shipping</h3>
                <p className="text-body-sm text-neutral-600">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="text-body font-medium mb-1">Easy Returns</h3>
                <p className="text-body-sm text-neutral-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="text-body font-medium mb-1">Secure Checkout</h3>
                <p className="text-body-sm text-neutral-600">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="text-body font-medium mb-1">Premium Quality</h3>
                <p className="text-body-sm text-neutral-600">Guaranteed authentic</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t border-neutral-200 pt-20">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" size="sm">Curated For You</Badge>
            </div>
            <h2 className="text-heading-xl md:text-display-sm mb-4">
              Complete the Look
            </h2>
            <p className="text-body-lg text-neutral-600">
              Pair it with these complementary pieces for a complete athletic wardrobe
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}