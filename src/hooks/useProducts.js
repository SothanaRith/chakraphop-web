'use client'

import { useState, useEffect } from 'react'

export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [JSON.stringify(params)])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const { productService } = await import('@/lib/api')
      const data = await productService.getProducts(params)
      setProducts(data.products || data)
      setPagination(data.pagination || null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, pagination, refetch: fetchProducts }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const { productService } = await import('@/lib/api')
      const data = await productService.getProduct(id)
      setProduct(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { product, loading, error, refetch: fetchProduct }
}
