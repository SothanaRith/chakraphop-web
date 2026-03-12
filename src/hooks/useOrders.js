'use client'

import { useState, useEffect } from 'react'
import { orderService } from '@/lib/api'

export function useOrders(params = {}) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [JSON.stringify(params)])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await orderService.getOrders(params)
      setOrders(data.orders || data)
      setPagination(data.pagination || null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { orders, loading, error, pagination, refetch: fetchOrders }
}

export function useOrder(id) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchOrder()
    }
  }, [id])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await orderService.getOrder(id)
      setOrder(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { order, loading, error, refetch: fetchOrder }
}
