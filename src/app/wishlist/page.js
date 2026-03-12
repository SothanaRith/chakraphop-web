'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { wishlistService } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

export default function WishlistPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState('')
  const [isMovingAll, setIsMovingAll] = useState(false)
  const [error, setError] = useState('')

  const fetchWishlist = async () => {
    try {
      setError('')
      const response = await wishlistService.getWishlist()
      setItems(Array.isArray(response?.data) ? response.data : [])
    } catch (err) {
      setError(err.message || 'Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        setLoading(false)
      } else {
        fetchWishlist()
      }
    }
  }, [authLoading, isAuthenticated])

  const removeItem = async (productId) => {
    try {
      setActionId(`remove-${productId}`)
      await wishlistService.removeFromWishlist(productId)
      setItems((prev) => prev.filter((item) => item.productId !== productId))
    } catch (err) {
      setError(err.message || 'Failed to remove wishlist item')
    } finally {
      setActionId('')
    }
  }

  const moveItemToCart = async (productId) => {
    try {
      setActionId(`move-${productId}`)
      await wishlistService.moveToCart(productId)
      setItems((prev) => prev.filter((item) => item.productId !== productId))
    } catch (err) {
      setError(err.message || 'Failed to move item to cart')
    } finally {
      setActionId('')
    }
  }

  const moveAllToCart = async () => {
    if (!items.length) return

    try {
      setIsMovingAll(true)
      await Promise.all(items.map((item) => wishlistService.moveToCart(item.productId)))
      setItems([])
    } catch (err) {
      setError(err.message || 'Failed to move all items to cart')
    } finally {
      setIsMovingAll(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-white">
        <section className="container-section py-14">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Heart className="w-9 h-9 text-rose-500" />
              My Wishlist
            </h1>
            <p className="mt-2 text-slate-600">Save products for later and move them to your cart anytime.</p>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading wishlist...</p>
          ) : !isAuthenticated ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-slate-700">Please sign in to access your wishlist.</p>
              <Link href="/auth/login" className="inline-block mt-4 btn btn-primary rounded-xl px-6 py-3">
                Sign In
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <Heart className="w-14 h-14 text-slate-300 mx-auto" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Your wishlist is empty</h2>
              <p className="mt-2 text-slate-600">Browse our store and save products you love.</p>
              <Link href="/tech/store" className="inline-block mt-5 btn btn-primary rounded-xl px-6 py-3">
                Explore Accessories
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <p className="text-slate-700 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'} saved
                </p>
                <button
                  onClick={moveAllToCart}
                  disabled={isMovingAll}
                  className="btn btn-primary rounded-lg px-4 py-2 disabled:opacity-60"
                >
                  {isMovingAll ? 'Moving...' : 'Move All To Cart'}
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => {
                  const isOutOfStock = Number(item.stockQuantity || 0) <= 0
                  const price = Number(item.price || 0).toFixed(2)

                  return (
                    <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <Link href={`/tech/store/${item.productSlug}`} className="text-xl font-semibold text-slate-900 hover:text-cyan-700">
                            {item.productName}
                          </Link>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.brandName || 'Tech Forge'} · {item.categoryName || 'Accessories'}
                          </p>
                          <p className="mt-2 text-lg font-bold text-slate-900">${price}</p>
                          {isOutOfStock && (
                            <p className="mt-1 text-xs font-medium text-rose-700">Out of stock</p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => moveItemToCart(item.productId)}
                            disabled={isOutOfStock || actionId === `move-${item.productId}`}
                            className="btn btn-primary rounded-lg px-4 py-2 disabled:opacity-60 flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {actionId === `move-${item.productId}` ? 'Moving...' : 'Move To Cart'}
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            disabled={actionId === `remove-${item.productId}`}
                            className="rounded-lg border border-rose-300 px-4 py-2 text-rose-700 hover:bg-rose-50 disabled:opacity-60 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            {actionId === `remove-${item.productId}` ? 'Removing...' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
