'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { accessorySetService } from '@/lib/api'

export default function DeskAccessorySetDetailPage() {
  const params = useParams()
  const [setDetail, setSetDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const response = await accessorySetService.getSetBySlug(params.slug)
        setSetDetail(response?.data || null)
      } catch (error) {
        console.error('Failed to load set detail', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.slug) {
      fetchSet()
    }
  }, [params])

  const estimatedTotal = useMemo(() => {
    if (!setDetail?.items?.length) return 0

    return setDetail.items.reduce((sum, item) => {
      const unitPrice = Number(item.variantPrice ?? item.basePrice ?? 0)
      return sum + unitPrice * Number(item.quantity || 1)
    }, 0)
  }, [setDetail])

  return (
    <>
      <Navigation />
      <main className="pt-28 min-h-screen bg-white">
        <section className="container-section py-14">
          {loading ? (
            <p className="text-slate-500">Loading set...</p>
          ) : !setDetail ? (
            <p className="text-slate-500">Set not found.</p>
          ) : (
            <div>
              <Link href="/tech/store" className="text-sm text-cyan-700 hover:text-cyan-800">
                Back to Store
              </Link>

              <p className="mt-5 text-xs uppercase tracking-wide text-cyan-700">Desk Accessory Set</p>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">{setDetail.name}</h1>
              <p className="mt-4 max-w-3xl text-slate-600">{setDetail.description || 'Curated desk setup bundle.'}</p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                {setDetail.coverImageUrl ? (
                  <img src={setDetail.coverImageUrl} alt={setDetail.name} className="h-64 w-full object-cover md:h-80" />
                ) : (
                  <div className="h-64 w-full bg-gradient-to-br from-slate-100 to-slate-200 md:h-80" />
                )}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Items</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{setDetail.items?.length || 0}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Bundle Price</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {setDetail.bundlePrice ? `$${Number(setDetail.bundlePrice).toFixed(2)}` : 'Custom'}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Estimated Individual Total</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">${estimatedTotal.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 px-6 py-4">
                  <h2 className="text-xl font-semibold text-slate-900">Included Items</h2>
                </div>
                <div className="divide-y divide-slate-200">
                  {(setDetail.items || []).map((item) => (
                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{item.productName}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          Qty {item.quantity}
                          {item.variantSku ? ` | SKU ${item.variantSku}` : ''}
                          {item.note ? ` | ${item.note}` : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          ${Number(item.variantPrice ?? item.basePrice ?? 0).toFixed(2)}
                        </p>
                        <Link href={`/tech/store/${item.productSlug}`} className="text-sm text-cyan-700 hover:text-cyan-800">
                          View Product
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
