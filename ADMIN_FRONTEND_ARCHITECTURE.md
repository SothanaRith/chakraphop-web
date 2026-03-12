# ADMIN FRONTEND - ARCHITECTURE & API INTEGRATION

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Flow

```
┌─────────────┐
│  Browser    │
└──────┬──────┘
       │
       │ 1. User accesses /admin/auth/login
       │ 2. AdminAuthContext manages state
       │ 3. adminAuthService.login() called
       ↓
┌──────────────────────────────┐
│ AdminAuthContext              │
│ - Manages user state          │
│ - Stores JWT in localStorage  │
│ - Provides auth hooks         │
│ - Has role/permission checks  │
└──────┬───────────────────────┘
       │
       │ Protected routes check this
       ↓
┌──────────────────────────────┐
│ AdminProtectedRoute           │
│ - Redirects if not auth       │
│ - Checks user role            │
│ - Redirects if no permission  │
└──────┬───────────────────────┘
       │
       │ Renders if auth passes
       ↓
┌──────────────────────────────┐
│ AdminLayout                   │
│ - Sidebar navigation          │
│ - Top bar with user menu      │
│ - Page content area           │
└──────┬───────────────────────┘
       │
       │ Page uses Admin API Services
       ↓
┌──────────────────────────────┐
│ Admin API Services            │
│ - adminInventoryService       │
│ - adminOrdersService          │
│ - adminProductsService        │
│ - adminUsersService           │
│ - etc...                      │
└──────┬───────────────────────┘
       │
       │ All requests through
       │ adminApiClient (axios)
       ↓
┌──────────────────────────────┐
│ Admin API Client              │
│ - Auto-adds JWT token         │
│ - Handles errors globally     │
│ - Interceptors for auth       │
└──────┬───────────────────────┘
       │
       │ HTTP requests to backend
       ↓
┌──────────────────────────────┐
│ Backend Admin API             │
│ (/api/v1/admin/*)            │
│ - Protected by auth checks    │
│ - Role-based permissions      │
│ - Audit logging               │
└──────────────────────────────┘
```

---

## 🔑 KEY CONCEPTS

### 1. Authentication Context

**File**: `src/contexts/AdminAuthContext.js`

```javascript
const { 
  user,                    // Current admin user object
  loading,                 // Is auth check in progress?
  isAuthenticated,         // Boolean auth status
  error,                   // Last auth error
  login,                   // Async login function
  logout,                  // Async logout function
  hasRole,                 // Check if user has role
  canPerform,              // Check if user can perform action
  updateUser               // Update user info
} = useAdminAuth()
```

### 2. Protected Routes

**File**: `src/components/admin/AdminProtectedRoute.js`

- Wraps admin pages
- Checks `isAuthenticated`
- Checks `requiredRole` if specified
- Shows loading state during auth check
- Redirects to login if not authenticated
- Shows access denied if role insufficient

### 3. Role-Based Access Control

**Three roles defined**:

```javascript
SUPER_ADMIN
├── All permissions
├── User management
├── Refunds
└── Audit logs

ADMIN
├── Dashboard
├── Orders (view + update status)
├── Inventory (adjust)
├── Products (edit)
└── Audit logs

STAFF
├── Dashboard
├── Orders (view only)
├── Inventory (view only)
├── Products (view only)
└── Notes (create)
```

### 4. API Client Architecture

**File**: `src/lib/api/admin/client.js`

```javascript
const adminApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/admin',
  timeout: 30000
})

// Request interceptor: Adds JWT token
// Response interceptor: Handles errors globally
// 401 → Redirect to login
// 403 → Log permission error
// Other errors → Return formatted error object
```

---

## 📡 API SERVICE STRUCTURE

Each module has dedicated service file:

### adminAuthService
```javascript
login(credentials)          // POST /auth/admin/login
logout()                    // POST /auth/admin/logout
getProfile()                // GET /auth/admin/profile
verifySession()             // GET /auth/admin/verify
```

### adminInventoryService
```javascript
getStockList(params)        // GET /admin/inventory/stock
getLowStock(params)         // GET /admin/inventory/low-stock
getMovements(params)        // GET /admin/inventory/movements
adjustStock(data)           // POST /admin/inventory/adjust-stock
approveAdjustment(id, data) // POST /admin/inventory/adjust-stock/:id/approve
rejectAdjustment(id, data)  // POST /admin/inventory/adjust-stock/:id/reject
bulkImport(data)            // POST /admin/inventory/bulk-import
getSettings()               // GET /admin/inventory/settings
updateSettings(data)        // PUT /admin/inventory/settings
```

### adminOrdersService
```javascript
getOrders(params)           // GET /admin/orders
getOrder(id)                // GET /admin/orders/:id
updateOrderStatus(id, data) // PUT /admin/orders/:id/status
cancelOrder(id, data)       // POST /admin/orders/:id/cancel
refundOrder(id, data)       // POST /admin/orders/:id/refund (SUPER_ADMIN only)
addNote(id, data)           // POST /admin/orders/:id/notes
getNotes(id, params)        // GET /admin/orders/:id/notes
createManualOrder(data)     // POST /admin/orders/manual/create
```

### adminProductsService
```javascript
getProducts(params)         // GET /admin/products
getProduct(id)              // GET /admin/products/:id
createProduct(data)         // POST /admin/products
updateProduct(id, data)     // PUT /admin/products/:id
deleteProduct(id)           // DELETE /admin/products/:id
publishProduct(id)          // POST /admin/products/:id/publish
archiveProduct(id)          // POST /admin/products/:id/archive
bulkUpdatePrices(data)      // PUT /admin/products/bulk/prices
bulkUpdateStatus(data)      // PUT /admin/products/bulk/status
```

### adminUsersService
```javascript
getUsers(params)            // GET /admin/users
getUser(id)                 // GET /admin/users/:id
createUser(data)            // POST /admin/users
updateUser(id, data)        // PUT /admin/users/:id
activateUser(id)            // POST /admin/users/:id/activate
deactivateUser(id)          // POST /admin/users/:id/deactivate
updateUserRole(id, data)    // PUT /admin/users/:id/role
getUserActivity(id, params) // GET /admin/users/:id/activity
getRoles()                  // GET /admin/roles
resetUserPassword(id, data) // POST /admin/users/:id/reset-password
```

### adminDashboardService
```javascript
getMetrics(params)          // GET /admin/dashboard/metrics
getAlerts(params)           // GET /admin/dashboard/alerts
getRecentOrders(params)     // GET /admin/dashboard/recent-orders
getSalesOverview(params)    // GET /admin/dashboard/sales
getTopProducts(params)      // GET /admin/dashboard/top-products
```

### adminAuditService
```javascript
getActionLogs(params)       // GET /admin/audit/actions
getErrorLogs(params)        // GET /admin/audit/errors
getRefundLogs(params)       // GET /admin/audit/refunds
getStockLogs(params)        // GET /admin/audit/stock-adjustments
getSystemStatus()           // GET /admin/system/status
```

---

## 🔄 TYPICAL REQUEST/RESPONSE FLOW

### Example: Adjust Stock

```javascript
// 1. Frontend prepares request
const adjustmentData = {
  variantId: "var_abc123",
  adjustment: -5,
  reason: "DAMAGE",
  notes: "Physical damage found during count",
  requiresApproval: true
}

// 2. Send through service
try {
  const result = await adminInventoryService.adjustStock(adjustmentData)
  
  // 3. Backend returns
  // {
  //   status: "success",
  //   data: {
  //     adjustmentId: "adj_xyz789",
  //     status: "PENDING",
  //     message: "Adjustment pending approval"
  //   }
  // }
  
  console.log("Adjustment ID:", result.data.adjustmentId)
  setSuccess("Stock adjustment submitted for approval")
  
} catch (err) {
  // 4. Error handling
  // {
  //   message: "Invalid adjustment amount",
  //   status: 422,
  //   errors: [
  //     { field: "adjustment", message: "Cannot reduce below 0" }
  //   ]
  // }
  
  setError(err.message)
  console.log("Validation errors:", err.errors)
}
```

---

## 🔐 SECURITY PATTERNS

### 1. Protected Component

```javascript
export function AdminProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, loading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    // Check auth on mount
    if (!loading && !isAuthenticated) {
      router.push('/admin/auth/login')
    }
    
    // Check role
    if (!loading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push('/admin/access-denied')
    }
  }, [isAuthenticated, loading, requiredRole, user, router])

  if (!isAuthenticated) return null
  return children
}
```

### 2. Role Guard Component

```javascript
export function RoleGuard({ children, requiredRole = null, requiredPermission = null }) {
  const { user, hasRole, canPerform } = useAdminAuth()

  if (!user) return null
  
  if (requiredRole && !hasRole(requiredRole)) return null
  if (requiredPermission && !canPerform(requiredPermission)) return null
  
  return children
}

// Usage: Hide delete button for non-admins
<RoleGuard requiredRole="ADMIN">
  <button onClick={handleDelete}>Delete</button>
</RoleGuard>
```

### 3. API Error Handling

```javascript
// All errors from admin API follow this format:
{
  message: "User-friendly error message",
  status: 422,  // HTTP status
  errors: [     // Validation errors
    { field: "email", message: "Email already exists" }
  ],
  data: null    // Any partial data from API
}

// Frontend handles:
try {
  const result = await apiCall()
} catch (err) {
  if (err.status === 422) {
    // Validation error - show field-level errors
    err.errors.forEach(e => setFieldError(e.field, e.message))
  } else if (err.status === 403) {
    // Permission denied
    setError("You don't have permission to do this")
  } else if (err.status === 401) {
    // Token expired - auto-redirect by interceptor
  } else {
    // Generic error
    setError(err.message)
  }
}
```

---

## 🎯 COMPONENT INTEGRATION PATTERNS

### Pattern 1: List Page with Actions

```javascript
export default function ListPage() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setError('')
      const data = await adminService.getItems()
      setItems(data.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminService.deleteItem(id)
      setSuccess('Item deleted')
      loadItems() // Refresh list
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      {error && <ErrorAlert message={error} />}
      <DataTable columns={columns} data={items} isLoading={isLoading} />
    </div>
  )
}
```

### Pattern 2: Modal Form with Confirmation

```javascript
function ItemModal({ isOpen, item, onClose, onSuccess }) {
  const [formData, setFormData] = useState(item || {})
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true)
      await adminService.updateItem(item.id, formData)
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <button type="submit">Save</button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Confirm Changes"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
```

---

## 🧩 REUSABLE COMPONENTS

### DataTable

```javascript
<DataTable
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button onClick={() => handleEdit(row)}>Edit</button>
      )
    }
  ]}
  data={items}
  isLoading={isLoading}
  isEmpty={items.length === 0}
  emptyMessage="No items found"
  onRowClick={(row) => handleSelectRow(row)}
/>
```

### Modal

```javascript
<Modal 
  isOpen={showModal}
  title="Edit Item"
  onClose={() => setShowModal(false)}
  size="lg" // sm, md, lg, xl
>
  {/* Content */}
</Modal>
```

### ConfirmDialog

```javascript
<ConfirmDialog
  isOpen={showConfirm}
  title="Delete Item?"
  description="This cannot be undone"
  isDangerous={true}
  actionLabel="Delete"
  isLoading={isDeleting}
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
>
  {/* Optional: additional details */}
  <p>This will permanently delete: {selectedItem?.name}</p>
</ConfirmDialog>
```

### Alerts

```javascript
{error && <ErrorAlert message={error} title="Error" onDismiss={() => setError('')} />}
{success && <SuccessAlert message={success} />}
{warning && <WarningAlert message={warning} />}
```

### RoleGuard

```javascript
<RoleGuard requiredRole="ADMIN">
  <AdminOnlyFeature />
</RoleGuard>

<RoleGuard requiredPermission="REFUND_ORDERS">
  <RefundButton />
</RoleGuard>
```

---

## 🔗 CONNECTING TO BACKEND

### Environment Setup

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Verification Checklist

- [ ] Backend is running on configured port
- [ ] `/api/v1/auth/admin/login` endpoint exists and returns JWT token
- [ ] All `/api/v1/admin/*` endpoints implemented
- [ ] JWT token format: `Bearer <token>`
- [ ] 401 response returns when token invalid/expired
- [ ] CORS allows frontend origin
- [ ] API returns errors in expected format

---

## 📊 DATA FLOW DIAGRAMS

### Authentication Flow

```
User Login
   ↓
  adminAuthService.login(email, password)
   ↓
  POST /api/v1/auth/admin/login
   ↓
  Backend validates → Returns { accessToken, user }
   ↓
  Store token in localStorage['adminToken']
   ↓
  setUser() + setIsAuthenticated(true)
   ↓
  useAdminAuth hook now has user data
   ↓
  Protected routes render
   ↓
  API calls include Authorization header
```

### Inventory Adjustment Flow

```
User clicks "Adjust"
   ↓
  StockAdjustmentModal opens
   ↓
  User enters: amount, reason, notes
   ↓
  Submit button → handleSubmit validation
   ↓
  Validation errors? → Show inline errors
   ↓
  Confirmation dialog opens
   ↓
  User confirms
   ↓
  adminInventoryService.adjustStock(data)
   ↓
  POST /api/v1/admin/inventory/adjust-stock
   ↓
  Backend processes → Returns { adjustmentId, status }
   ↓
  Success alert shown
   ↓
  loadInventory() refreshes table
   ↓
  Modal closes
```

### Order Cancellation Flow

```
User clicks "Cancel Order"
   ↓
  ConfirmDialog opens (isDangerous=true)
   ↓
  User enters reason + notes
   ↓
  User confirms
   ↓
  adminOrdersService.cancelOrder(orderId, { reason, notes })
   ↓
  POST /api/v1/admin/orders/:id/cancel
   ↓
  Backend:
    - Updates order status → CANCELLED
    - Releases reserved stock
    - Creates audit log
    - Returns updated order
   ↓
  Frontend shows success
   ↓
  loadOrders() refreshes table
   ↓
  Order now shows CANCELLED status
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Data Fetching

```javascript
// ❌ Bad: Too many requests
const [orders, setOrders] = useState([])
useEffect(() => {
  loadOrders() // Runs on every render
}, []) // Missing dependency tracking

// ✅ Good: Controlled updates
useEffect(() => {
  loadOrders()
}, []) // Empty = only on mount

useEffect(() => {
  if (statusFilter) loadOrders()
}, [statusFilter]) // Reload when filter changes
```

### Component Rendering

```javascript
// ✅ Memoize expensive components
export const DataTable = React.memo(function DataTable({ columns, data }) {
  return (
    <table>
      {/* Render */}
    </table>
  )
})

// ✅ Use useMemo for computed values
const lowStockItems = useMemo(
  () => items.filter(item => item.quantity < item.threshold),
  [items]
)
```

### API Pagination

```javascript
const data = await adminService.getItems({
  limit: 50,      // Limit results
  offset: 0,      // Paginate
  sort: 'created_at:desc',  // Sort server-side
})
```

---

## 📋 TESTING SCENARIOS

### Authentication Tests

```
1. Login with correct credentials
   → Should store token and redirect to dashboard
   
2. Login with wrong password
   → Should show error message
   
3. Access /admin/dashboard without login
   → Should redirect to /admin/auth/login
   
4. Token expires mid-session
   → API should return 401
   → Interceptor should clear token and redirect to login
   
5. Logout
   → Should clear localStorage
   → Should redirect to login
```

### Authorization Tests

```
1. Login as STAFF user
   → Can see /admin/dashboard ✓
   → Cannot access /admin/users ✓
   → Cannot click delete buttons ✓
   
2. Login as ADMIN user
   → Can access orders + inventory
   → Cannot refund orders (SUPER_ADMIN only)
   
3. Try accessing with modified JWT
   → Should be rejected
```

### Functional Tests

```
Inventory Adjustment:
  1. Reduce stock by 5
     → Shows new total
     → Requires reason
     → Confirmation required
     → Success after submit
  
  2. Increase stock by 100
     → No max limit
     → All validations pass
     → Updates table
  
  3. Try negative (below current)
     → Should prevent
  
  4. Try without notes
     → Should require notes

Order Cancellation:
  1. Cancel processing order
     → Order status → CANCELLED
     → Stock released
     → Success shown
     → Cannot cancel again
  
  2. Cancel completed order
     → Refund button appears instead
  
  3. Cancel with reason
     → Reason logged
     → Visible in audit trail
```

---

## 🎓 LEARNING RESOURCES

- **Next.js App Router**: https://nextjs.org/docs/app
- **React Hooks**: https://react.dev/reference/react
- **Tailwind CSS**: https://tailwindcss.com
- **Axios Documentation**: https://axios-http.com/docs/intro
- **Backend Admin API**: See `backend/ADMIN_API_COMPLETE_GUIDE.md`

