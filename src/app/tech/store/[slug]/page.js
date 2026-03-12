'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { productService, wishlistService } from '@/lib/api'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

export default function TechProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlistBusy, setWishlistBusy] = useState(false)

  const toProductList = (response) => {
    const data = response?.data
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.products)) return data.products
    if (Array.isArray(data?.items)) return data.items
    return []
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await productService.getProduct(params.slug)
        const productData = productResponse?.data
        setProduct(productData)

        if (!productData?.id) {
          setRecommendedProducts([])
          setRecentProducts([])
          return
        }

        const allProductsResponse = await productService.getProducts({ limit: 60, status: 'ACTIVE' })

        const allProducts = toProductList(allProductsResponse)
        const categoryName = productData.category?.name?.toLowerCase()

        const recommended = allProducts
          .filter((item) => {
            if (!item?.id || item.id === productData.id) return false
            if (!categoryName) return true
            return item.category?.name?.toLowerCase() === categoryName
          })
          .slice(0, 4)

        const recent = [...allProducts]
          .sort((a, b) => {
            const aTime = new Date(a?.createdAt || 0).getTime()
            const bTime = new Date(b?.createdAt || 0).getTime()
            return bTime - aTime
          })
          .filter((item) => item?.id && item.id !== productData.id)
          .slice(0, 4)

        setRecommendedProducts(recommended)
        setRecentProducts(recent)

        if (isAuthenticated) {
          try {
            const statusResponse = await wishlistService.isInWishlist(productData.id)
            setIsWishlisted(Boolean(statusResponse?.data?.inWishlist))
          } catch (wishlistError) {
            setIsWishlisted(false)
          }
        } else {
          setIsWishlisted(false)
        }
      } catch (error) {
        console.error('Failed to load product detail', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.slug) {
      fetchProduct()
    }
  }, [params, isAuthenticated])

  const toggleWishlist = async () => {
    if (!product?.id) return

    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    try {
      setWishlistBusy(true)

      if (isWishlisted) {
        await wishlistService.removeFromWishlist(product.id)
        setIsWishlisted(false)
      } else {
        await wishlistService.addToWishlist(product.id)
        setIsWishlisted(true)
      }
    } catch (error) {
      console.error('Wishlist update failed', error)
    } finally {
      setWishlistBusy(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return

    try {
      setIsAdding(true)
      const defaultVariant = product.variants?.find((variant) => variant.isDefault) || product.variants?.[0]
      await addToCart(product.id, 1, defaultVariant?.id || null)
    } catch (error) {
      console.error('Add to cart failed', error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-white">
        <section className="container-section py-14">
          {loading ? (
            <p className="text-slate-500">Loading product...</p>
          ) : !product ? (
            <p className="text-slate-500">Product not found.</p>
          ) : (
            <div className="space-y-14">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 aspect-square" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-cyan-700">{product.category?.name || 'Accessories'}</p>
                  <h1 className="mt-2 text-4xl font-bold text-slate-900">{product.name}</h1>
                  <p className="mt-4 text-slate-600">{product.description || product.shortDescription}</p>
                  <p className="mt-6 text-3xl font-bold text-slate-900">${Number(product.basePrice || 0).toFixed(2)}</p>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="mt-8 btn btn-primary rounded-xl px-7 py-3"
                  >
                    {isAdding ? 'Adding...' : 'Add To Cart'}
                  </button>

                  <button
                    onClick={toggleWishlist}
                    disabled={wishlistBusy}
                    className="mt-3 rounded-xl border border-slate-300 px-7 py-3 text-slate-700 hover:bg-slate-50 disabled:opacity-60 inline-flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {wishlistBusy ? 'Updating...' : isWishlisted ? 'Remove From Wishlist' : 'Add To Wishlist'}
                  </button>

                  <div className="mt-10 border-t border-slate-200 pt-6">
                    <h2 className="text-lg font-semibold text-slate-900">Product specs</h2>
                    <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                      <li>SKU: {product.variants?.[0]?.sku || 'N/A'}</li>
                      <li>Stock: {product.variants?.[0]?.stockQuantity ?? 'N/A'}</li>
                      <li>Brand: {product.brand?.name || 'Tech Forge'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <ProductListSection title="Recommended Products" products={recommendedProducts} />
              <ProductListSection title="Recent Products" products={recentProducts} />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

function ProductListSection({ title, products }) {
  if (!products?.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/tech/store/${item.slug}`}
            className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow"
          >
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200" />
            <p className="mt-3 text-xs uppercase tracking-wide text-cyan-700">{item.category?.name || 'Accessories'}</p>
            <p className="mt-1 font-semibold text-slate-900 group-hover:text-cyan-700 line-clamp-2">{item.name}</p>
            <p className="mt-3 text-lg font-bold text-slate-900">${Number(item.basePrice || 0).toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
