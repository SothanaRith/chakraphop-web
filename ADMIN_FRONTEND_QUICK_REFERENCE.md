# ADMIN FRONTEND - QUICK REFERENCE

## 🚀 QUICK START

### 1. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# Access at http://localhost:3000/admin/auth/login
```

### 2. Login to Admin Panel

```
Email: admin@example.com
Password: SecurePassword123!
```

### 3. Navigate to Dashboard

After login, you're at `/admin/dashboard`

---

## 📂 KEY FILES AT A GLANCE

| File | Purpose |
|------|---------|
| `src/contexts/AdminAuthContext.js` | Admin auth state + hooks |
| `src/components/admin/AdminLayout.js` | Main sidebar + topbar layout |
| `src/components/admin/AdminProtectedRoute.js` | Route protection wrapper |
| `src/lib/api/admin/client.js` | Centralized API client |
| `src/lib/api/admin/*.js` | Service files (inventory, orders, etc) |
| `src/app/admin/layout.js` | Admin section layout |
| `src/app/admin/auth/login/page.js` | Login page |
| `src/app/admin/dashboard/page.js` | Dashboard |
| `src/app/admin/inventory/page.js` | Inventory management |
| `src/app/admin/orders/page.js` | Order management |
| `src/app/admin/products/page.js` | Product management |
| `src/app/admin/users/page.js` | User management (SUPER_ADMIN) |

---

## 🔑 MOST USED HOOKS & FUNCTIONS

### useAdminAuth Hook

```javascript
const { user, isAuthenticated, loading, hasRole, canPerform, login, logout } = useAdminAuth()

// Examples:
if (!isAuthenticated) router.push('/admin/auth/login')

if (hasRole('SUPER_ADMIN')) {
  // Show refund button
}

if (canPerform('ADJUST_INVENTORY')) {
  // Show inventory adjustment button
}
```

### Admin API Services

```javascript
import { 
  adminAuthService,
  adminInventoryService,
  adminOrdersService,
  adminProductsService,
  adminUsersService,
  adminDashboardService,
  adminAuditService
} from '@/lib/api/admin'

// Inventory
const items = await adminInventoryService.getStockList()
await adminInventoryService.adjustStock({ variantId, adjustment, reason, notes })

// Orders
const orders = await adminOrdersService.getOrders()
await adminOrdersService.cancelOrder(orderId, { reason, notes })
await adminOrdersService.refundOrder(orderId, { reason, refundAmount })

// Products
const products = await adminProductsService.getProducts()
await adminProductsService.updateProduct(productId, updateData)

// Users (SUPER_ADMIN only)
const users = await adminUsersService.getUsers()

// Dashboard
const metrics = await adminDashboardService.getMetrics()
```

### Components

```javascript
// Protected route
<AdminProtectedRoute requiredRole="ADMIN">
  <Page />
</AdminProtectedRoute>

// Conditional rendering by role
<RoleGuard requiredPermission="ADJUST_INVENTORY">
  <AdjustButton />
</RoleGuard>

// Data table
<DataTable columns={cols} data={items} isLoading={loading} />

// Modal
<Modal isOpen={show} title="Title" onClose={close}>
  Content
</Modal>

// Confirmation
<ConfirmDialog
  isOpen={show}
  title="Sure?"
  isDangerous={true}
  onConfirm={handleConfirm}
  onCancel={() => setShow(false)}
/>

// Alerts
<ErrorAlert message={msg} />
<SuccessAlert message={msg} />
<WarningAlert message={msg} />
```

---

## 📊 ROLE MATRIX

| Feature | SUPER_ADMIN | ADMIN | STAFF |
|---------|-------------|-------|-------|
| Dashboard | ✓ | ✓ | ✓ |
| View Orders | ✓ | ✓ | ✓ |
| Update Order Status | ✓ | ✓ | ✗ |
| Cancel Orders | ✓ | ✓ | ✗ |
| **Refund Orders** | ✓ | ✗ | ✗ |
| View Inventory | ✓ | ✓ | ✓ |
| Adjust Stock | ✓ | ✓ | ✗ |
| View Products | ✓ | ✓ | ✓ |
| Edit Products | ✓ | ✓ | ✗ |
| Manage Users | ✓ | ✗ | ✗ |
| View Audit Logs | ✓ | ✓ | ✗ |
| Create Notes | ✓ | ✓ | ✓ |

---

## 🔐 LOGIN USERS FOR TESTING

```
SUPER_ADMIN:
  Email: super_admin@example.com
  Password: SuperAdmin123!

ADMIN:
  Email: admin@example.com
  Password: SecurePassword123!

STAFF:
  Email: staff@example.com
  Password: Staff123!
```

---

## ⚡ COMMON TASKS

### Add Alert Message

```javascript
const [error, setError] = useState('')
const [success, setSuccess] = useState('')

// In JSX
{error && <ErrorAlert message={error} onDismiss={() => setError('')} />}
{success && <SuccessAlert message={success} onDismiss={() => setSuccess('')} />}

// In handler
try {
  await apiCall()
  setSuccess('Operation completed')
} catch (err) {
  setError(err.message)
}
```

### Load Data on Mount

```javascript
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  loadData()
}, [])

const loadData = async () => {
  try {
    setIsLoading(true)
    const result = await adminService.getData()
    setData(result.items)
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}
```

### Show Confirmation Before Action

```javascript
const [showConfirm, setShowConfirm] = useState(false)

const handleDelete = async () => {
  try {
    await adminService.delete(itemId)
    setSuccess('Deleted')
  } catch (err) {
    setError(err.message)
  }
}

// In JSX
<button onClick={() => setShowConfirm(true)}>Delete</button>

<ConfirmDialog
  isOpen={showConfirm}
  title="Delete this item?"
  isDangerous={true}
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>
```

### Display Table

```javascript
<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => <Badge status={row.status} />
    },
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
/>
```

### Check User Permission

```javascript
const { canPerform, hasRole } = useAdminAuth()

// Permission-based
if (!canPerform('ADJUST_INVENTORY')) {
  return <AccessDenied />
}

// Role-based
if (!hasRole('ADMIN')) {
  return <AccessDenied />
}

// In JSX with guard
<RoleGuard requiredRole="SUPER_ADMIN">
  <DeleteButton />
</RoleGuard>
```

---

## 🐛 DEBUGGING

### Check Current User

```javascript
// In browser console
localStorage.getItem('adminToken')
JSON.parse(localStorage.getItem('adminUser'))
```

### Enable Request Logging

```javascript
// In src/lib/api/admin/client.js (add to interceptor)
adminApiClient.interceptors.request.use((config) => {
  console.log('API Request:', config.method.toUpperCase(), config.url, config.data)
  return config
})

adminApiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data)
    return response.data
  }
)
```

### Component Debug Output

```javascript
// Add to component
console.log('User:', user)
console.log('Permissions:', { 
  canAdjustInventory: canPerform('ADJUST_INVENTORY'),
  isAdmin: hasRole('ADMIN')
})
```

---

## 🚨 ERROR CODES & MEANINGS

| Code | Meaning | Fix |
|------|---------|-----|
| 400 | Bad request | Check request format |
| 401 | Unauthorized | Login again, check token |
| 403 | Forbidden | Check user role/permissions |
| 404 | Not found | Check ID/resource exists |
| 422 | Validation error | Check field errors in response |
| 500 | Server error | Check backend logs |

---

## ✅ DEPLOYMENT CHECKLIST

Before going to production:

- [ ] Test login with test user
- [ ] Test all CRUD operations
- [ ] Test stock adjustment workflow
- [ ] Test order cancellation
- [ ] Verify role-based access
- [ ] Test on different browsers
- [ ] Test token refresh on expiry
- [ ] Verify all API endpoints working
- [ ] Check error handling
- [ ] Load test with large datasets
- [ ] Set `NEXT_PUBLIC_API_URL` environment var
- [ ] Set up monitoring/logging
- [ ] Train admin team on UI

---

## 📱 RESPONSIVE DESIGN

Admin UI is mobile-friendly:
- Sidebar collapses on mobile
- Mobile menu toggle
- Tables are responsive
- Modals adapt to screen size

Test on:
- Desktop (1920px+)
- Tablet (768px)
- Mobile (375px)

---

## 🔗 USEFUL LINKS

- **Login**: `/admin/auth/login`
- **Dashboard**: `/admin/dashboard`
- **Inventory**: `/admin/inventory`
- **Orders**: `/admin/orders`
- **Products**: `/admin/products`
- **Users**: `/admin/users` (SUPER_ADMIN only)
- **Backend API Docs**: See `backend/ADMIN_API_COMPLETE_GUIDE.md`
- **Full Architecture**: See `ADMIN_FRONTEND_ARCHITECTURE.md`
- **Implementation Details**: See `ADMIN_FRONTEND_IMPLEMENTATION.md`

---

## 💡 PRO TIPS

1. **Always confirm destructive actions** - Use ConfirmDialog for delete/cancel
2. **Validate before showing confirmation** - Catch errors early
3. **Show meaningful error messages** - Not just "Failed"
4. **Log important actions** - For audit trail
5. **Test with different roles** - Verify access control works
6. **Use RoleGuard liberally** - Don't let UI mislead about permissions
7. **Refresh data after mutations** - Don't rely on optimistic updates
8. **Handle loading states** - Show spinners, disable buttons
9. **Use semantic HTML** - For accessibility
10. **Keep modals simple** - One action per modal

---

## 🎓 NEXT STEPS

1. **Understand the flow**: Read `ADMIN_FRONTEND_IMPLEMENTATION.md`
2. **Learn the architecture**: Read `ADMIN_FRONTEND_ARCHITECTURE.md`
3. **Explore the code**: Open a page like `/admin/inventory/page.js`
4. **Try modifications**: Add a new column to a table
5. **Build new pages**: Create a new admin feature
6. **Test edge cases**: Try error scenarios
7. **Deploy**: Follow deployment checklist above

