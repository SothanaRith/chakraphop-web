'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { productService } from '@/lib/api/products'
import { Dumbbell } from 'lucide-react'

export default function MenProductsClient() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getProducts({
          category: 'men',
          limit: 48
        })
        setProducts(response.data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <SkeletonLoader type="product-grid" count={6} />
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load products"
        message="We're having trouble loading the men's collection. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Dumbbell}
        title="No products found"
        description="We're currently updating our men's collection. Check back soon for new arrivals."
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
}
