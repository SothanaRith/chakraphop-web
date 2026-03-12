# ADMIN FRONTEND - PRODUCTION IMPLEMENTATION GUIDE

## 🎯 OVERVIEW

This is a production-grade admin frontend for managing e-commerce operations. It's built with:
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **API Communication**: Axios with centralized admin API client
- **Authentication**: JWT-based with role-based access control

---

## 📁 FOLDER STRUCTURE

```
frontend/src/
├── app/admin/                              # Admin routes
│   ├── auth/
│   │   ├── login/page.js                   # Admin login page
│   │   └── logout/page.js                  # Logout handler
│   ├── access-denied/page.js               # Access denied page
│   ├── dashboard/page.js                   # Dashboard overview
│   ├── inventory/page.js                   # Inventory management
│   ├── orders/page.js                      # Order management
│   ├── products/page.js                    # Product management
│   ├── users/page.js                       # Admin users (SUPER_ADMIN only)
│   └── layout.js                           # Admin layout wrapper (protected)
│
├── components/admin/                       # Admin components
│   ├── AdminLayout.js                      # Main layout with sidebar
│   ├── AdminProtectedRoute.js              # Route protection wrapper
│   ├── Navigation.js                       # Sidebar + TopBar
│   ├── DataTable.js                        # Reusable data table
│   ├── Modal.js                            # Reusable modal
│   ├── ConfirmDialog.js                    # Confirmation dialog
│   ├── RoleGuard.js                        # Role-based UI rendering
│   └── Alerts.js                           # Error/Success/Warning alerts
│
├── contexts/
│   ├── AdminAuthContext.js                 # Admin auth state management
│   ├── AuthContext.js                      # Customer auth (existing)
│   └── CartContext.js                      # Cart state (existing)
│
├── lib/api/admin/                          # Admin API services
│   ├── client.js                           # Axios admin client
│   ├── auth.js                             # Authentication endpoints
│   ├── inventory.js                        # Inventory endpoints
│   ├── orders.js                           # Order endpoints
│   ├── products.js                         # Product endpoints
│   ├── users.js                            # User management endpoints
│   ├── dashboard.js                        # Dashboard data endpoints
│   ├── audit.js                            # Audit/logging endpoints
│   └── index.js                            # Barrel export
│
└── config/
    └── admin.routes.js                     # Admin route constants & config
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### Setup Flow

```javascript
// 1. User navigates to /admin/auth/login
// 2. Enters credentials (email + password)
// 3. API validates and returns JWT token
// 4. Token stored in localStorage as 'adminToken'
// 5. User redirected to /admin/dashboard

// 6. All protected routes check:
//    - Is adminToken present? → YES: Continue
//    - Is token valid? → NO: Redirect to login
//    - Does user's role have permission? → NO: Show access denied

// 7. Logout clears token and redirects to login
```

### Role-Based Access Control

```javascript
// Three roles defined:
// - SUPER_ADMIN: Full access to everything (user management, refunds, audit)
// - ADMIN: Operational staff (inventory, orders, products)
// - STAFF: Limited read-only + note creation

// Example: Using RoleGuard component
<RoleGuard requiredRole="ADMIN">
  <button onClick={handleDelete}>Delete</button>
</RoleGuard>

// Example: Using permission check
<RoleGuard requiredPermission="ADJUST_INVENTORY">
  <button onClick={handleAdjust}>Adjust Stock</button>
</RoleGuard>

// Example: Using hook
const { canPerform, hasRole } = useAdminAuth()
if (canPerform('REFUND_ORDERS')) {
  // Show refund button
}
```

---

## 🛠️ CRITICAL COMPONENTS

### 1. AdminProtectedRoute
**Purpose**: Wraps admin pages to enforce authentication + role checks

```javascript
<AdminProtectedRoute requiredRole="ADMIN">
  <YourPage />
</AdminProtectedRoute>
```

### 2. DataTable
**Purpose**: Reusable table for displaying paginated data

```javascript
<DataTable
  columns={[
    { key: 'id', label: 'ID' },
    { 
      key: 'status', 
      label: 'Status',
      render: (item) => <StatusBadge status={item.status} />
    }
  ]}
  data={items}
  isLoading={isLoading}
  onRowClick={(row) => handleSelectRow(row)}
/>
```

### 3. ConfirmDialog
**Purpose**: Safe confirmation before destructive actions

```javascript
<ConfirmDialog
  isOpen={showConfirm}
  title="Delete Item?"
  description="This action cannot be undone"
  isDangerous={true}
  actionLabel="Delete"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
>
  <p>Additional details or warnings here</p>
</ConfirmDialog>
```

### 4. RoleGuard
**Purpose**: Conditionally render UI based on role/permission

```javascript
// Hide button if user lacks permission
<RoleGuard requiredPermission="ADJUST_INVENTORY">
  <button onClick={handleAdjust}>Adjust Stock</button>
</RoleGuard>

// Only show to SUPER_ADMIN
<RoleGuard requiredRole="SUPER_ADMIN">
  <UserManagementPanel />
</RoleGuard>
```

### 5. Modal
**Purpose**: Reusable modal container

```javascript
<Modal 
  isOpen={showModal} 
  title="Edit Item" 
  onClose={handleClose}
  size="lg"
>
  <form onSubmit={handleSubmit}>
    {/* Form content */}
  </form>
</Modal>
```

---

## 📊 KEY WORKFLOWS

### Inventory Stock Adjustment (CRITICAL)

**Safety Features**:
- ✅ Validation prevents negative stock
- ✅ Clear confirmation dialog required
- ✅ Reason must be selected
- ✅ Notes field encourages documentation
- ✅ Approval workflow available for significant adjustments
- ✅ All adjustments logged for audit trail

**User Flow**:
```
1. Staff clicks "Adjust" on inventory item
2. Modal opens with current stock displayed
3. User enters:
   - Adjustment amount (e.g., -5)
   - Reason (DAMAGE, LOSS, RECOUNT, etc)
   - Notes (physical count date, reference, etc)
   - Approval checkbox (if required)
4. Preview shows: Current → New Stock
5. Validation runs (no negatives, required fields)
6. Confirmation dialog shown
7. Submit → API receives adjustment
8. Success/Error message + reload
```

### Order Cancellation (CRITICAL)

**Safety Features**:
- ✅ Reason required (CUSTOMER_REQUEST, OUT_OF_STOCK, etc)
- ✅ Notes field for explanation
- ✅ Confirmation dialog (red/dangerous styling)
- ✅ Stock automatically released on cancel
- ✅ Audit log created

### Order Refund (SUPER_ADMIN ONLY)

**Safety Features**:
- ✅ Role-gated (SUPER_ADMIN only)
- ✅ Reason required
- ✅ Confirmation with amount shown
- ✅ Creates immutable refund record
- ✅ Finance-trackable

---

## 🎨 DESIGN PRINCIPLES

### Admin UI Design Rules

1. **Data First**: Prioritize information over decoration
2. **Safety Over Speed**: Confirmations for destructive actions
3. **Clarity**: Every state must be obvious
4. **Consistency**: Reuse components, patterns, colors
5. **Accessibility**: High contrast, clear labels
6. **Density**: More information per screen without clutter

### Color Coding

```
- Blue: Primary actions, info, navigation
- Green: Success, valid data, low urgency
- Yellow: Warnings, low stock, caution
- Red: Danger, critical, destructive actions only
- Gray: Neutral, secondary actions, disabled states
```

### Status Badges

```
- PUBLISHED: Green badge
- DRAFT: Yellow badge
- ARCHIVED: Gray badge
- CANCELLED: Gray badge
- ACTIVE: Green text
- INACTIVE: Red text
- LOW STOCK: Red bold text + badge
```

---

## 🚀 API INTEGRATION

### Admin API Client

All requests go through centralized admin API client (`src/lib/api/admin/client.js`):

```javascript
// ✅ Token auto-injected from localStorage
// ✅ Errors handled globally
// ✅ 401 redirects to login
// ✅ Error messages extracted and displayed
// ✅ Request/response interceptors configured
```

### Service Structure

Each module has its own service file:

```javascript
// inventory.js
export const adminInventoryService = {
  getStockList: async (params) => { /* ... */ },
  adjustStock: async (data) => { /* ... */ },
  approveAdjustment: async (id, data) => { /* ... */ },
  // ... more methods
}

// Usage:
const data = await adminInventoryService.getStockList({ limit: 100 })
```

### Error Handling

```javascript
try {
  const result = await adminOrdersService.cancelOrder(orderId, { reason, notes })
  setSuccess('Order cancelled successfully')
} catch (err) {
  setError(err.message) // Friendly error message from API
  // err.status: HTTP status code
  // err.errors: Validation errors array
}
```

---

## 📝 EXAMPLE: BUILDING A NEW ADMIN PAGE

### 1. Create the page component

```javascript
// src/app/admin/brand-pages/page.js
'use client'

import { useEffect, useState } from 'react'
import { adminBrandService } from '@/lib/api/admin'
import { ErrorAlert, SuccessAlert } from '@/components/admin/Alerts'
import { DataTable } from '@/components/admin/DataTable'
import { RoleGuard } from '@/components/admin/RoleGuard'

export default function BrandPagesPage() {
  const [pages, setPages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      setError('')
      const data = await adminBrandService.getPages()
      setPages(data.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'isActive', 
      label: 'Status',
      render: (page) => page.isActive ? '✓ Active' : '○ Inactive'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (page) => (
        <RoleGuard requiredPermission="EDIT_BRAND_PAGES">
          <a href={`/admin/brand-pages/${page.id}`} className="text-blue-600">
            Edit
          </a>
        </RoleGuard>
      )
    }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Brand Pages</h1>
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <div className="bg-white rounded shadow">
        <DataTable columns={columns} data={pages} isLoading={isLoading} />
      </div>
    </div>
  )
}
```

### 2. Create API service

```javascript
// src/lib/api/admin/brand.js
import adminApiClient from './client'

export const adminBrandService = {
  getPages: async () => {
    return await adminApiClient.get('/admin/brand/pages')
  },
  
  getPage: async (pageId) => {
    return await adminApiClient.get(`/admin/brand/pages/${pageId}`)
  },
  
  updatePage: async (pageId, data) => {
    return await adminApiClient.put(`/admin/brand/pages/${pageId}`, data)
  },
  
  publishPage: async (pageId) => {
    return await adminApiClient.post(`/admin/brand/pages/${pageId}/publish`)
  }
}
```

### 3. Update index.js barrel export

```javascript
// src/lib/api/admin/index.js
import { adminBrandService } from './brand'

export {
  // ... existing exports
  adminBrandService,
}
```

---

## 🧪 TESTING ADMIN FEATURES

### Test User Credentials

```
Email: admin@example.com
Password: SecurePassword123!
Role: SUPER_ADMIN
```

### Test Workflows

1. **Login Flow**
   - Navigate to /admin/auth/login
   - Enter test credentials
   - Should redirect to /admin/dashboard

2. **Stock Adjustment**
   - Go to /admin/inventory
   - Click "Adjust" on any item
   - Try negative amount (should prevent below 0)
   - Try without reason (should show validation)
   - Submit → should show success

3. **Order Cancellation**
   - Go to /admin/orders
   - Click order → Detail modal
   - Click "Cancel Order"
   - Confirm → Order status should change
   - Check inventory (stock should be released)

4. **Role Access**
   - Login as STAFF user
   - Try accessing /admin/users (should show denied)
   - Try accessing /admin/orders (should work)

---

## 🔍 DEBUGGING ADMIN ISSUES

### Common Issues & Solutions

**Issue**: "Access Denied" on allowed page
- Check user.role in browser DevTools (localStorage.getItem('adminUser'))
- Check API returns correct permissions
- Verify RoleGuard logic

**Issue**: "Login failed" with valid credentials
- Check CORS settings in backend
- Verify API endpoint URL (NEXT_PUBLIC_API_URL)
- Check token storage in localStorage

**Issue**: Changes not reflecting
- Check API success response
- Verify `loadData()` is called after mutation
- Check error handling (might be silent failing)

**Issue**: Modals not appearing
- Check z-index conflicts (should be z-50)
- Verify isOpen state is actually true
- Check console for JavaScript errors

---

## 📦 DEPLOYMENT CHECKLIST

### Before Going Live

- [ ] Test all workflows with real data
- [ ] Verify role-based access control
- [ ] Load test with large datasets
- [ ] Test error scenarios (network failure, timeout)
- [ ] Verify all API endpoints are available
- [ ] Set NEXT_PUBLIC_API_URL environment variable
- [ ] Test on multiple browsers
- [ ] Verify JWT token refresh working
- [ ] Test logout on all pages
- [ ] Verify audit logs are created
- [ ] Set up error monitoring (Sentry, etc)

---

## 📞 SUPPORT & TROUBLESHOOTING

### Enable Debug Logging

```javascript
// In any admin component
console.log('Current user:', user)
console.log('User permissions:', { canRefund: canPerform('REFUND_ORDERS') })
console.log('API Client token:', localStorage.getItem('adminToken'))
```

### Common API Errors

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Token expired or invalid | Clear localStorage, re-login |
| 403 Forbidden | User lacks permission | Check user role |
| 404 Not Found | Resource doesn't exist | Verify ID/parameters |
| 422 Unprocessable | Validation failed | Check error.errors array |
| 500 Server Error | Backend issue | Check backend logs |

---

## 🎓 LEARNING PATH

1. **Start**: Read this guide
2. **Explore**: Open `/admin/dashboard` and inspect the code
3. **Understand**: Study the inventory adjustment modal (complex UX + API)
4. **Build**: Create a simple new page (e.g., brand pages)
5. **Master**: Add full CRUD for a new resource with role guards

---

## 📚 REFERENCES

- **Backend Admin API**: See `backend/ADMIN_API_COMPLETE_GUIDE.md`
- **Next.js App Router**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hooks**: https://react.dev/reference/react

