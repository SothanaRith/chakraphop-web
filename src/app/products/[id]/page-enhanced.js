'use client'

import { useEffect, useState } from 'react'
import PageWrapper from '@/components/ui/PageWrapper'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfoEnhanced from '@/components/product/ProductInfoEnhanced'
import ProductFeatures from '@/components/product/ProductFeatures'
import ProductSpecifications from '@/components/product/ProductSpecifications'
import SportContext from '@/components/product/SportContext'
import ProductCard from '@/components/product/ProductCard'
import Badge from '@/components/ui/Badge'
import ErrorState from '@/components/ui/ErrorState'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

/**
 * FLAGSHIP PRODUCT DETAIL PAGE
 * 
 * Conversion-focused PDP with:
 * - Premium gallery with zoom
 * - Intelligent variant selection
 * - Strong trust indicators
 * - Performance-focused content
 * - Sport-specific context
 * - Related product recommendations
 */

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProductData()
  }, [params.id])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      
      // TODO: Replace with actual API calls
      // const productRes = await fetch(`/api/products/${params.id}`)
      // const productData = await productRes.json()
      // setProduct(productData)
      
      // const relatedRes = await fetch(`/api/products/${params.id}/related`)
      // const relatedData = await relatedRes.json()
      // setRelatedProducts(relatedData)

      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setProduct({
        id: params.id,
        name: 'Performance Training Jacket',
        tagline: 'Engineered for high-intensity training with premium performance fabric',
        category: 'Training',
        sport: 'Training',
        price: 129,
        originalPrice: 159,
        rating: 4.8,
        reviewCount: 342,
        isNew: true,
        isBestseller: true,
        
        // Images
        images: [
          '/images/product-detail-1.jpg',
          '/images/product-detail-2.jpg',
          '/images/product-detail-3.jpg',
          '/images/product-detail-4.jpg',
        ],
        
        // Variants
        colors: [
          { id: 'black', hex: '#000000', name: 'Black' },
          { id: 'charcoal', hex: '#1a1a1a', name: 'Charcoal' },
          { id: 'gray', hex: '#4a4a4a', name: 'Gray' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        variants: [
          // Black variants
          { color: 'black', size: 'XS', stock: 3 },
          { color: 'black', size: 'S', stock: 12 },
          { color: 'black', size: 'M', stock: 24 },
          { color: 'black', size: 'L', stock: 18 },
          { color: 'black', size: 'XL', stock: 8 },
          { color: 'black', size: 'XXL', stock: 0 },
          // Charcoal variants
          { color: 'charcoal', size: 'XS', stock: 5 },
          { color: 'charcoal', size: 'S', stock: 15 },
          { color: 'charcoal', size: 'M', stock: 20 },
          { color: 'charcoal', size: 'L', stock: 12 },
          { color: 'charcoal', size: 'XL', stock: 6 },
          { color: 'charcoal', size: 'XXL', stock: 2 },
          // Gray variants
          { color: 'gray', size: 'XS', stock: 8 },
          { color: 'gray', size: 'S', stock: 22 },
          { color: 'gray', size: 'M', stock: 30 },
          { color: 'gray', size: 'L', stock: 25 },
          { color: 'gray', size: 'XL', stock: 10 },
          { color: 'gray', size: 'XXL', stock: 4 },
        ],
        
        // Size Guide
        sizeGuide: {
          fit: 'True to size with athletic fit',
          notes: 'Model is 6\'2" and wears size L',
          measurements: [
            { size: 'XS', chest: '34-36', waist: '28-30', length: '26' },
            { size: 'S', chest: '36-38', waist: '30-32', length: '27' },
            { size: 'M', chest: '38-40', waist: '32-34', length: '28' },
            { size: 'L', chest: '40-42', waist: '34-36', length: '29' },
            { size: 'XL', chest: '42-44', waist: '36-38', length: '30' },
            { size: 'XXL', chest: '44-46', waist: '38-40', length: '31' },
          ],
        },
        
        // Features
        features: [
          {
            type: 'moisture-wicking',
            title: 'Advanced Moisture Management',
            description: 'Dri-FIT technology pulls sweat away from your skin for faster evaporation, keeping you dry and comfortable.'
          },
          {
            type: 'breathable',
            title: 'Strategic Ventilation',
            description: 'Mesh panels in high-heat zones ensure optimal airflow during intense workouts.'
          },
          {
            type: 'performance',
            title: 'Ergonomic Design',
            description: 'Articulated sleeves and stretch fabric provide full range of motion without restriction.'
          },
          {
            type: 'protection',
            title: 'Durable Construction',
            description: 'Reinforced seams and abrasion-resistant fabric withstand the toughest training sessions.'
          },
        ],
        
        // Specifications
        specifications: {
          materials: '88% Polyester, 12% Spandex',
          fit: 'Athletic fit - close to body with room for movement',
          weight: '8.5 oz (240g)',
          origin: 'Vietnam',
          care: [
            'Machine wash cold with like colors',
            'Tumble dry low',
            'Do not bleach',
            'Do not iron decorations',
            'Remove immediately after washing'
          ],
        },
        
        // Sport Context
        sportContext: {
          sport: 'Training',
          designedFor: 'High-Intensity Training',
          badges: [
            { icon: 'trending', text: 'Top Performer' },
            { icon: 'users', text: 'Athlete Approved' },
          ],
        },
        
        // Shipping & Returns
        shippingEstimate: 'Feb 8-10, 2026',
        returnPolicy: {
          days: 60,
          description: 'Free returns on all orders',
        },
      })

      setRelatedProducts([
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
      ])

      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch product:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  const handleAddToCart = async (cartItem) => {
    // TODO: Implement cart context
    console.log('Adding to cart:', cartItem)
    // Example: await addToCart(cartItem)
  }

  const handleAddToWishlist = async (product) => {
    // TODO: Implement wishlist context
    console.log('Adding to wishlist:', product)
    // Example: await addToWishlist(product)
  }

  // Loading State
  if (loading) {
    return (
      <PageWrapper>
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <SkeletonLoader variant="product-gallery" />
            <SkeletonLoader variant="product-info" />
          </div>
        </div>
      </PageWrapper>
    )
  }

  // Error State
  if (error || !product) {
    return (
      <PageWrapper>
        <div className="container-section">
          <ErrorState
            title="Product Not Found"
            description="We couldn't find the product you're looking for. It may have been removed or is temporarily unavailable."
            primaryButton={{
              text: 'Browse All Products',
              href: '/products'
            }}
            secondaryButton={{
              text: 'Go Home',
              href: '/'
            }}
          />
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container-section">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-body-sm text-neutral-600">
            <li><a href="/" className="hover:text-neutral-900 transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-neutral-900 transition-colors">Products</a></li>
            <li>/</li>
            <li><a href={`/sports/${product.sport?.toLowerCase()}`} className="hover:text-neutral-900 transition-colors">{product.sport}</a></li>
            <li>/</li>
            <li className="text-neutral-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Main Content: Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
          <ProductGallery 
            images={product.images} 
            productName={product.name}
          />
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ProductInfoEnhanced
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Performance Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-32">
            <ProductFeatures
              features={product.features}
              sportContext={product.sportContext?.designedFor || product.sport}
            />
          </div>
        )}

        {/* Product Specifications */}
        {product.specifications && (
          <div className="mb-32">
            <ProductSpecifications specifications={product.specifications} />
          </div>
        )}

        {/* Sport Context */}
        {product.sportContext && (
          <div className="mb-32">
            <SportContext
              sport={product.sportContext.sport}
              category={product.category}
              designedFor={product.sportContext.designedFor}
              badges={product.sportContext.badges}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
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
        )}
      </div>
    </PageWrapper>
  )
}
