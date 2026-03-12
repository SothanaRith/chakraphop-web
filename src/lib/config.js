// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Cart
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART: '/cart/update',
  REMOVE_FROM_CART: '/cart/remove',
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  CREATE_ORDER: '/orders/create',
  
  // User
  USER_PROFILE: '/user/profile',
  USER_ORDERS: '/user/orders',
  WISHLIST: '/user/wishlist',
}

// App Config
export const APP_CONFIG = {
  SITE_NAME: 'Elite Sport',
  SITE_TAGLINE: 'Premium Athletic Wear',
  FREE_SHIPPING_THRESHOLD: 75,
  RETURN_POLICY_DAYS: 60,
}
