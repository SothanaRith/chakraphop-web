'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { accessorySetService, productService } from '@/lib/api'

const categoryOptions = ['All', 'Keyboards', 'Laptop Stands', 'Desk Mats', 'Cable Organizers', 'Monitor Lights', 'Desk Setup']

export default function TechStorePage() {
  const [products, setProducts] = useState([])
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, setsResponse] = await Promise.all([
          productService.getProducts({ limit: 50, status: 'ACTIVE' }),
          accessorySetService.getSets({ status: 'ACTIVE' }),
        ])

        setProducts(productsResponse?.data?.products || [])
        setSets(setsResponse?.data || [])
      } catch (error) {
        console.error('Failed to load storefront data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        search.trim().length === 0 ||
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())

      const categoryName = product.category?.name || ''
      const matchCategory =
        selectedCategory === 'All' || categoryName.toLowerCase().includes(selectedCategory.toLowerCase())

      return matchSearch && matchCategory
    })
  }, [products, search, selectedCategory])

  return (
    <>
      <Navigation />
      <main className="pt-28 bg-white min-h-screen">
        <section className="container-section py-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Desktop Accessories Store</h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Upgrade your workspace with modern accessories for productivity, comfort, and a clean desk aesthetic.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search keyboards, monitor lights, desk mats..."
              className="input rounded-xl border-slate-300"
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="input rounded-xl border-slate-300"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="mt-12 text-slate-500">Loading accessories...</p>
          ) : (
            <>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Desk Accessory Sets</h2>
                    <p className="mt-1 text-slate-600">
                      Curated bundles to build a clean, productive setup faster.
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">{sets.length} bundles</p>
                </div>

                {sets.length === 0 ? (
                  <p className="mt-5 text-sm text-slate-500">No active sets available yet.</p>
                ) : (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sets.map((set) => (
                      <Link
                        key={set.id}
                        href={`/tech/store/sets/${set.slug}`}
                        className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          {set.coverImageUrl ? (
                            <img
                              src={set.coverImageUrl}
                              alt={set.name}
                              className="h-36 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div className="h-36 w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                          )}
                        </div>
                        <p className="text-xs uppercase tracking-wide text-cyan-700">Bundle</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-cyan-700">{set.name}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                          {set.description || 'A curated desk setup bundle for developers.'}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-slate-500">{Number(set.itemCount || 0)} items</span>
                          <span className="text-lg font-bold text-slate-900">
                            {set.bundlePrice ? `$${Number(set.bundlePrice).toFixed(2)}` : 'Custom pricing'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-8 text-sm text-slate-500">{filteredProducts.length} products found</p>
              <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/tech/store/${product.slug}`}
                    className="group border border-slate-200 rounded-2xl bg-slate-50/60 p-5 hover:bg-white hover:shadow-md transition"
                  >
                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" />
                    <p className="mt-4 text-xs uppercase tracking-wide text-cyan-700">
                      {product.category?.name || 'Accessories'}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-cyan-700">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-slate-600 line-clamp-2">
                      {product.shortDescription || product.description || 'Premium desk setup accessory'}
                    </p>
                    <p className="mt-4 text-xl font-bold text-slate-900">${Number(product.basePrice || 0).toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
