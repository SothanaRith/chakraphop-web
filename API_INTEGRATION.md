# API Integration & Full Stack Architecture

Complete guide for integrating the Elite Sport frontend with the backend REST API.

---

## 📁 Updated Frontend Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router Pages
│   │   ├── layout.js                 # Root layout with providers
│   │   ├── page.js                   # Homepage
│   │   ├── auth/
│   │   │   ├── login/page.js         # Login page
│   │   │   ├── register/page.js      # Registration page
│   │   │   ├── forgot-password/page.js
│   │   │   ├── reset-password/page.js
│   │   │   └── verify-otp/page.js
│   │   ├── products/
│   │   │   ├── page.js               # Product listing (API integrated)
│   │   │   ├── [id]/page.js          # Product detail (API integrated)
│   │   │   └── category/[slug]/page.js
│   │   ├── cart/
│   │   │   └── page.js               # Shopping cart
│   │   ├── checkout/
│   │   │   └── page.js               # Multi-step checkout
│   │   ├── account/
│   │   │   ├── page.js               # Account overview
│   │   │   ├── orders/
│   │   │   │   ├── page.js           # Order history
│   │   │   │   └── [id]/page.js      # Order detail
│   │   │   ├── addresses/page.js     # Address management
│   │   │   ├── wishlist/page.js      # Wishlist
│   │   │   └── settings/page.js      # Profile settings
│   │   └── admin/
│   │       ├── page.js               # Dashboard
│   │       ├── products/page.js      # Product management
│   │       ├── inventory/page.js     # Inventory management
│   │       ├── orders/page.js        # Order management
│   │       └── users/page.js         # User management
│   │
│   ├── components/
│   │   ├── layout/                   # Layout components
│   │   ├── home/                     # Homepage sections
│   │   ├── product/                  # Product components
│   │   ├── cart/                     # Cart components
│   │   ├── checkout/                 # Checkout components
│   │   ├── account/                  # Account components
│   │   ├── admin/                    # Admin components
│   │   └── ui/                       # UI primitives
│   │
│   ├── contexts/
│   │   ├── AuthContext.js            # Authentication state
│   │   └── CartContext.js            # Cart state
│   │
│   ├── hooks/
│   │   ├── useProducts.js            # Product data fetching
│   │   ├── useOrders.js              # Order data fetching
│   │   └── useRequireAuth.js         # Route protection
│   │
│   └── lib/
│       ├── api/                      # API service layer
│       │   ├── client.js             # Axios instance with interceptors
│       │   ├── auth.js               # Auth endpoints
│       │   ├── products.js           # Product endpoints
│       │   ├── cart.js               # Cart endpoints
│       │   ├── orders.js             # Order endpoints
│       │   ├── users.js              # User endpoints
│       │   ├── inventory.js          # Inventory endpoints
│       │   └── index.js              # Export all services
│       ├── config.js                 # App configuration
│       └── utils.js                  # Utility functions
```

---

## 🔌 API Service Layer

### Architecture Principles

1. **Centralized API Client**: Single axios instance with global interceptors
2. **Service-Based Organization**: Separate files per domain (auth, products, etc.)
3. **Automatic Token Management**: Interceptors handle auth tokens
4. **Error Normalization**: Consistent error format across all endpoints
5. **Type Safety**: Clear parameter expectations

### API Client (`lib/api/client.js`)

**Features:**
- Base URL configuration
- Automatic token injection
- Response normalization
- Global error handling
- 401 → Redirect to login
- Network error handling

### Service Files

**Auth Service** (`lib/api/auth.js`)
- register, login, logout
- OTP send/verify
- Forgot/reset password
- Profile management
- Token refresh

**Product Service** (`lib/api/products.js`)
- Get products (with filters)
- Get single product
- Search products
- Category filtering
- Featured/new arrivals
- Reviews
- Admin: CRUD operations

**Cart Service** (`lib/api/cart.js`)
- Get cart
- Add/update/remove items
- Clear cart
- Apply/remove discount

**Order Service** (`lib/api/orders.js`)
- Get user orders
- Get single order
- Create order
- Cancel order
- Track order
- Admin: All orders, update status

**User Service** (`lib/api/users.js`)
- Profile management
- Password change
- Address CRUD
- Wishlist operations
- Admin: User management

**Inventory Service** (`lib/api/inventory.js`)
- Check availability
- Admin: Inventory management
- Low stock alerts

---

## 🎯 State Management

### Authentication Context

**Location**: `contexts/AuthContext.js`

**State:**
- `user` - Current user object
- `loading` - Initial auth check
- `isAuthenticated` - Boolean auth status

**Methods:**
- `login(credentials)` - Email/password login
- `register(userData)` - User registration
- `logout()` - Clear session
- `updateUser(userData)` - Update user in state

**Usage:**
```javascript
const { user, isAuthenticated, login, logout } = useAuth()
```

### Cart Context

**Location**: `contexts/CartContext.js`

**State:**
- `cart` - Cart object with items
- `loading` - Cart fetch status
- `itemCount` - Total items in cart

**Methods:**
- `fetchCart()` - Reload cart from API
- `addToCart(productId, quantity, variantId)`
- `updateQuantity(itemId, quantity)`
- `removeItem(itemId)`
- `clearCart()`
- `applyDiscount(code)`
- `removeDiscount()`

**Usage:**
```javascript
const { cart, itemCount, addToCart } = useCart()
```

---

## 🔐 Authentication Flow

### Login Flow

1. User submits email/password
2. Call `authService.login(credentials)`
3. Store token in localStorage
4. Store user in AuthContext
5. Redirect to homepage or intended page

### Register Flow

1. User fills registration form
2. Client-side validation (password strength, match)
3. Call `authService.register(userData)`
4. Store token and user
5. Redirect to homepage

### Protected Routes

**Hook**: `useRequireAuth(requireAdmin = false)`

**Usage:**
```javascript
export default function AccountPage() {
  const { user, loading } = useRequireAuth()
  
  if (loading) return <LoadingSpinner />
  
  return <AccountDashboard user={user} />
}
```

**Admin Routes:**
```javascript
export default function AdminDashboard() {
  const { user, loading } = useRequireAuth(true) // Requires admin
  
  // Only accessible to admins
}
```

### Token Refresh

Handled automatically by API client:
- 401 response → Clear tokens → Redirect to login
- Optional: Implement refresh token logic in interceptor

---

## 📄 Page Implementations

### 1. Product Listing Page

**Path**: `app/products/page.js`

**API Integration:**
```javascript
const { products, loading, error } = useProducts({
  page: currentPage,
  limit: 12,
  category: selectedCategory,
  minPrice: priceRange[0],
  maxPrice: priceRange[1],
  sort: sortBy,
})
```

**Features:**
- Server-side pagination
- Filter by category, price, size, color
- Sort options (price, name, newest)
- Loading states
- Empty state
- Error handling

### 2. Product Detail Page

**Path**: `app/products/[id]/page.js`

**API Integration:**
```javascript
const { product, loading, error } = useProduct(params.id)
```

**Features:**
- Fetch product by ID
- Display variants (size, color)
- Check inventory availability
- Add to cart with variant selection
- Related products
- Product reviews

### 3. Shopping Cart

**Path**: `app/cart/page.js`

**Context Integration:**
```javascript
const { cart, updateQuantity, removeItem } = useCart()
```

**Features:**
- Display cart items
- Update quantities (optimistic UI)
- Remove items
- Apply discount codes
- Calculate totals
- Free shipping threshold indicator

### 4. Checkout Page

**Path**: `app/checkout/page.js`

**Multi-Step Flow:**
1. **Shipping Address** - Select/add address
2. **Shipping Method** - Choose delivery speed
3. **Payment** - Enter payment details
4. **Review** - Confirm order

**API Calls:**
```javascript
// Step 1: Get user addresses
const addresses = await userService.getAddresses()

// Step 4: Create order
const order = await orderService.createOrder({
  items: cart.items,
  shippingAddressId: selectedAddress.id,
  shippingMethod: selectedMethod,
  paymentMethod: 'stripe',
})

// Redirect to order confirmation
router.push(`/account/orders/${order.id}`)
```

### 5. Account Dashboard

**Path**: `app/account/page.js`

**Protected Route:**
```javascript
const { user } = useRequireAuth()
```

**Features:**
- User profile overview
- Recent orders
- Saved addresses
- Wishlist preview
- Quick actions

### 6. Order History

**Path**: `app/account/orders/page.js`

**API Integration:**
```javascript
const { orders, loading, pagination } = useOrders({
  page: currentPage,
  limit: 10,
  status: filterStatus,
})
```

**Features:**
- Paginated order list
- Filter by status
- Order status badges
- View details link
- Track order link

### 7. Order Detail

**Path**: `app/account/orders/[id]/page.js`

**API Integration:**
```javascript
const { order, loading } = useOrder(params.id)
```

**Features:**
- Order information
- Items ordered
- Shipping address
- Payment method
- Order status timeline
- Cancel order (if applicable)
- Track shipment

### 8. Wishlist Page

**Path**: `app/account/wishlist/page.js`

**API Integration:**
```javascript
const [wishlist, setWishlist] = useState([])

useEffect(() => {
  const fetchWishlist = async () => {
    const data = await userService.getWishlist()
    setWishlist(data)
  }
  fetchWishlist()
}, [])
```

**Features:**
- Display wishlist products
- Quick add to cart
- Remove from wishlist
- Check stock status
- Empty state

### 9. Admin Dashboard

**Path**: `app/admin/page.js`

**Protected**: Admin only

**API Integration:**
```javascript
const { user } = useRequireAuth(true)

// Fetch stats
const [stats, setStats] = useState(null)

useEffect(() => {
  const fetchStats = async () => {
    const data = await Promise.all([
      productService.getProducts({ limit: 5 }),
      orderService.getAllOrders({ limit: 5 }),
      inventoryService.getLowStockAlerts(),
    ])
    setStats(data)
  }
  fetchStats()
}, [])
```

**Features:**
- Overview statistics
- Recent orders
- Low stock alerts
- Quick actions
- Revenue charts

### 10. Admin Product Management

**Path**: `app/admin/products/page.js`

**API Integration:**
```javascript
const { products, loading, refetch } = useProducts({ admin: true })

const handleDelete = async (id) => {
  await productService.deleteProduct(id)
  refetch()
}
```

**Features:**
- Product list with pagination
- Search products
- Create new product
- Edit product
- Delete product
- Bulk actions

---

## 🚀 Data Flow Patterns

### Optimistic UI Updates

**Use Case**: Cart quantity changes

```javascript
const updateQuantity = async (itemId, newQuantity) => {
  // 1. Update UI immediately
  setCart(prevCart => ({
    ...prevCart,
    items: prevCart.items.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
  }))
  
  // 2. Call API in background
  try {
    const updatedCart = await cartService.updateCartItem(itemId, newQuantity)
    setCart(updatedCart)
  } catch (error) {
    // 3. Revert on error
    fetchCart()
    toast.error('Failed to update quantity')
  }
}
```

### Server-Side Rendering (SSR)

**Use Case**: Product detail page for SEO

```javascript
// app/products/[id]/page.js
export async function generateMetadata({ params }) {
  const product = await productService.getProduct(params.id)
  
  return {
    title: `${product.name} - Elite Sport`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }) {
  const product = await productService.getProduct(params.id)
  
  return <ProductDetail product={product} />
}
```

### Client-Side Fetching

**Use Case**: User-specific data (cart, orders)

```javascript
'use client'

export default function CartPage() {
  const { cart, loading } = useCart()
  
  if (loading) return <LoadingState />
  
  return <CartView cart={cart} />
}
```

---

## ⚠️ Common Integration Pitfalls & Solutions

### 1. Token Expiration

**Problem**: Token expires during session

**Solution**: Implement automatic token refresh

```javascript
// In API interceptor
apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      
      try {
        const { token } = await authService.refreshToken()
        localStorage.setItem('token', token)
        error.config.headers.Authorization = `Bearer ${token}`
        return apiClient(error.config)
      } catch (refreshError) {
        // Refresh failed, logout
        logout()
      }
    }
    return Promise.reject(error)
  }
)
```

### 2. Race Conditions

**Problem**: Multiple simultaneous cart updates

**Solution**: Debounce or queue updates

```javascript
import { debounce } from '@/lib/utils'

const debouncedUpdate = debounce(async (itemId, quantity) => {
  await cartService.updateCartItem(itemId, quantity)
}, 500)
```

### 3. Stale Data

**Problem**: Cart data out of sync with backend

**Solution**: Refetch on focus/mount

```javascript
useEffect(() => {
  fetchCart()
  
  // Refetch when tab becomes visible
  const handleFocus = () => fetchCart()
  window.addEventListener('focus', handleFocus)
  
  return () => window.removeEventListener('focus', handleFocus)
}, [])
```

### 4. Form Validation

**Problem**: Backend validation errors not shown

**Solution**: Map backend errors to form fields

```javascript
try {
  await authService.register(formData)
} catch (error) {
  if (error.errors) {
    // Backend returns field-specific errors
    error.errors.forEach(err => {
      setFieldError(err.field, err.message)
    })
  } else {
    setGeneralError(error.message)
  }
}
```

### 5. Image Loading

**Problem**: Missing product images break layout

**Solution**: Placeholder images and error handling

```javascript
<img
  src={product.image || '/images/placeholder.jpg'}
  alt={product.name}
  onError={(e) => {
    e.target.src = '/images/placeholder.jpg'
  }}
/>
```

### 6. Inventory Checks

**Problem**: User adds out-of-stock item

**Solution**: Check availability before adding to cart

```javascript
const handleAddToCart = async () => {
  const availability = await inventoryService.checkAvailability(
    product.id,
    selectedVariant?.id
  )
  
  if (!availability.inStock) {
    toast.error('This item is out of stock')
    return
  }
  
  await addToCart(product.id, quantity, selectedVariant?.id)
}
```

### 7. Hydration Errors

**Problem**: Mismatch between server and client rendering

**Solution**: Use dynamic imports for client-only components

```javascript
import dynamic from 'next/dynamic'

const CartIcon = dynamic(() => import('@/components/CartIcon'), {
  ssr: false, // Don't render on server
})
```

---

## 🎯 UX Best Practices

### Loading States

**Always show feedback:**
- Skeleton screens for content
- Spinners for actions
- Disabled buttons during submission
- Progress indicators for multi-step flows

### Error Handling

**User-friendly errors:**
- Clear error messages
- Actionable recovery options
- Contact support for critical errors
- Log errors for debugging

### Empty States

**Guide users:**
- Clear explanation of why empty
- Primary action to populate
- Illustration or icon
- Helpful suggestions

### Success Feedback

**Confirm actions:**
- Toast notifications
- Success messages
- Redirect with confirmation
- Update UI immediately

---

## 📊 Performance Optimization

### 1. API Caching

Cache frequently accessed data:

```javascript
const productCache = new Map()

export async function getProduct(id) {
  if (productCache.has(id)) {
    return productCache.get(id)
  }
  
  const product = await productService.getProduct(id)
  productCache.set(id, product)
  
  return product
}
```

### 2. Lazy Loading

Load heavy components on demand:

```javascript
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingSpinner />,
})
```

### 3. Image Optimization

Use Next.js Image component:

```javascript
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={500}
  loading="lazy"
/>
```

### 4. API Request Batching

Combine multiple requests:

```javascript
const [products, categories, featured] = await Promise.all([
  productService.getProducts(),
  productService.getCategories(),
  productService.getFeaturedProducts(),
])
```

---

## 🔒 Security Considerations

1. **Never store sensitive data in localStorage** (only tokens)
2. **Validate all user inputs** client-side and server-side
3. **Use HTTPS only** for API calls
4. **Implement rate limiting** for sensitive actions
5. **Sanitize user-generated content** (reviews, comments)
6. **Use CSRF tokens** for state-changing requests
7. **Implement proper CORS** on backend
8. **Audit dependencies** regularly

---

## 🧪 Testing Strategy

### Unit Tests

Test individual functions:
- API service methods
- Utility functions
- Hooks logic

### Integration Tests

Test component + API:
- Product card with add to cart
- Login form with auth
- Checkout flow

### E2E Tests

Test complete user flows:
- Browse → Add to cart → Checkout → Order
- Register → Login → Order history
- Admin product management

---

**Implementation Status**: ✅ API Layer Complete | 🚧 Pages In Progress | 📋 Documentation Complete
