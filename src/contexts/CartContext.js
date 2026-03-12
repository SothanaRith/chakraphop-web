'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { cartService } from '@/lib/api'
import { useAuth } from './AuthContext'

const CartContext = createContext({})

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    } else {
      // Load cart from localStorage for guests
      const savedCart = localStorage.getItem('guestCart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [isAuthenticated])

  useEffect(() => {
    // Calculate item count
    if (cart?.items) {
      const count = cart.items.reduce((sum, item) => sum + item.quantity, 0)
      setItemCount(count)
    } else {
      setItemCount(0)
    }
  }, [cart])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const data = await cartService.getCart()
      setCart(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1, variantId = null) => {
    try {
      const data = await cartService.addToCart(productId, quantity, variantId)
      setCart(data)
      return data
    } catch (error) {
      throw error
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      const data = await cartService.updateCartItem(itemId, quantity)
      setCart(data)
      return data
    } catch (error) {
      throw error
    }
  }

  const removeItem = async (itemId) => {
    try {
      const data = await cartService.removeFromCart(itemId)
      setCart(data)
      return data
    } catch (error) {
      throw error
    }
  }

  const clearCart = async () => {
    try {
      await cartService.clearCart()
      setCart(null)
    } catch (error) {
      throw error
    }
  }

  const applyDiscount = async (code) => {
    try {
      const data = await cartService.applyDiscount(code)
      setCart(data)
      return data
    } catch (error) {
      throw error
    }
  }

  const removeDiscount = async () => {
    try {
      const data = await cartService.removeDiscount()
      setCart(data)
      return data
    } catch (error) {
      throw error
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
