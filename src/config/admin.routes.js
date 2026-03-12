// Admin page structure and architecture documentation

export const ADMIN_ROUTES = {
  AUTH: {
    LOGIN: '/admin/auth/login',
    LOGOUT: '/admin/auth/logout',
  },
  DASHBOARD: '/admin/dashboard',
  INVENTORY: {
    LIST: '/admin/inventory',
    MOVEMENTS: '/admin/inventory/movements',
  },
  ORDERS: {
    LIST: '/admin/orders',
    DETAIL: (id) => `/admin/orders/${id}`,
  },
  PRODUCTS: {
    LIST: '/admin/products',
    NEW: '/admin/products/new',
    DETAIL: (id) => `/admin/products/${id}`,
  },
  USERS: {
    LIST: '/admin/users',
    NEW: '/admin/users/new',
    DETAIL: (id) => `/admin/users/${id}`,
  },
  AUDIT: {
    LOGS: '/admin/audit/logs',
    ACTIONS: '/admin/audit/actions',
  },
  ACCESS_DENIED: '/admin/access-denied',
}

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: {
    description: 'Full access to all admin features',
    permissions: [
      'VIEW_DASHBOARD',
      'VIEW_ORDERS',
      'VIEW_PRODUCTS',
      'VIEW_INVENTORY',
      'EDIT_PRODUCTS',
      'ADJUST_INVENTORY',
      'UPDATE_ORDER_STATUS',
      'REFUND_ORDERS',
      'CREATE_NOTES',
      'VIEW_USERS',
      'MANAGE_USERS',
      'VIEW_AUDIT',
    ],
  },
  ADMIN: {
    description: 'Operational admin with inventory and order management',
    permissions: [
      'VIEW_DASHBOARD',
      'VIEW_ORDERS',
      'VIEW_PRODUCTS',
      'VIEW_INVENTORY',
      'EDIT_PRODUCTS',
      'ADJUST_INVENTORY',
      'UPDATE_ORDER_STATUS',
      'CREATE_NOTES',
      'VIEW_USERS',
      'VIEW_AUDIT',
    ],
  },
  STAFF: {
    description: 'Limited staff with read-only and note capabilities',
    permissions: [
      'VIEW_DASHBOARD',
      'VIEW_ORDERS',
      'VIEW_PRODUCTS',
      'VIEW_INVENTORY',
      'CREATE_NOTES',
    ],
  },
}

export const ADMIN_COMPONENTS = {
  // Auth
  AdminLoginPage: 'src/app/admin/auth/login/page.js',
  AdminLogoutPage: 'src/app/admin/auth/logout/page.js',

  // Layout
  AdminLayout: 'src/components/admin/AdminLayout.js',
  AdminSidebar: 'src/components/admin/Navigation.js',
  AdminTopBar: 'src/components/admin/Navigation.js',
  AdminProtectedRoute: 'src/components/admin/AdminProtectedRoute.js',

  // Shared Components
  DataTable: 'src/components/admin/DataTable.js',
  Modal: 'src/components/admin/Modal.js',
  ConfirmDialog: 'src/components/admin/ConfirmDialog.js',
  RoleGuard: 'src/components/admin/RoleGuard.js',
  Alerts: 'src/components/admin/Alerts.js',

  // Pages
  DashboardPage: 'src/app/admin/dashboard/page.js',
  InventoryPage: 'src/app/admin/inventory/page.js',
  OrdersPage: 'src/app/admin/orders/page.js',
  ProductsPage: 'src/app/admin/products/page.js',
  UsersPage: 'src/app/admin/users/page.js',
}

export const API_SERVICES = {
  adminAuthService: 'src/lib/api/admin/auth.js',
  adminInventoryService: 'src/lib/api/admin/inventory.js',
  adminOrdersService: 'src/lib/api/admin/orders.js',
  adminProductsService: 'src/lib/api/admin/products.js',
  adminUsersService: 'src/lib/api/admin/users.js',
  adminDashboardService: 'src/lib/api/admin/dashboard.js',
  adminAuditService: 'src/lib/api/admin/audit.js',
}
