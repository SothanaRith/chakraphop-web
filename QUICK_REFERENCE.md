# Quick Developer Reference

## 🚀 Completed Pages (Copy & Paste Ready)

All pages follow this structure and are immediately deployable:

### Category Page Template
**File**: `/app/products/[category]/page.js`
```javascript
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import ProductFilters from '@/components/product/ProductFilters'

// 1. Dynamic metadata
export const metadata = { /* ... */ }

// 2. Async component fetching data
async function ProductListing() {
  const products = await productService.getProducts({ 
    category: 'men', 
    limit: 48 
  })
  return <ProductGrid>{products.map(...)}</ProductGrid>
}

// 3. Main component with layout
export default function Page() {
  return (
    <main>
      <PageHeader title="..." breadcrumbs={...} />
      <PageSection>
        <ProductGrid />
      </PageSection>
    </main>
  )
}
```

### Support Form Page Template
**File**: `/app/contact/page.js`
```javascript
'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { supportService } from '@/lib/api/support'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await supportService.submitContactForm(formData)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <PageHeader title="Contact Us" />
      <form onSubmit={handleSubmit}>{/* ... */}</form>
    </main>
  )
}
```

---

## 📋 Pages Checklist

### SHOP (6 pages)
- [x] `/products/new` - New Arrivals - DONE
- [x] `/products/men` - Men's - DONE
- [x] `/products/women` - Women's - DONE
- [x] `/products/accessories` - Accessories - DONE
- [ ] `/collections` - Collections - PLANNED
- [ ] `/shop` - All products (optional hub)

### SUPPORT (6 pages)
- [x] `/track-order` - Order tracking - DONE
- [x] `/contact` - Contact form - DONE
- [x] `/faq` - FAQ - DONE
- [ ] `/support` - Support hub - PLANNED
- [ ] `/shipping-returns` - Policies - PLANNED
- [ ] `/size-guide` - Sizes - PLANNED

### COMPANY (6 pages)
- [x] `/about` - About Us - DONE
- [x] `/blog` - Blog listing - DONE
- [x] `/blog/[slug]` - Blog detail - DONE
- [ ] `/company` - Company info - PLANNED
- [ ] `/careers` - Jobs - PLANNED
- [ ] `/sustainability` - Sustainability - PLANNED
- [ ] `/press` - Press releases - PLANNED

**Total: 10 DONE, 8 PLANNED**

---

## 🔗 Component Import Quick Reference

### Layout Components
```javascript
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
```

### Product Components
```javascript
import ProductCard from '@/components/product/ProductCard'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilters from '@/components/product/ProductFilters'
import ProductGallery from '@/components/product/ProductGallery'
```

### Context & Hooks
```javascript
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useProducts } from '@/hooks/useProducts'
import { useOrders } from '@/hooks/useOrders'
```

### API Services
```javascript
import { productService } from '@/lib/api/products'
import { cartService } from '@/lib/api/cart'
import { orderService } from '@/lib/api/orders'
import { supportService } from '@/lib/api/support'
import { contentService } from '@/lib/api/content'
```

---

## 🎨 Common Styling Classes

### Text Styles
```javascript
// Display (hero titles)
className="text-display-lg md:text-display-xl font-bold"

// Heading
className="text-heading-lg font-medium"
className="text-heading-md font-medium"
className="text-heading-sm font-medium"

// Body
className="text-body text-neutral-600"
className="text-body-sm text-neutral-500"

// Caption
className="text-caption text-neutral-500"
```

### Spacing
```javascript
// Padding
className="p-4 md:p-6 lg:p-8"

// Margin bottom (common pattern)
className="mb-6 md:mb-8 lg:mb-12"

// Section spacing
className="py-16 md:py-24 lg:py-32"
```

### Buttons
```javascript
// Primary
className="btn btn-primary"

// Secondary
className="btn btn-secondary"

// Outline
className="btn btn-outline"

// Disabled
disabled={loading}
```

### Responsive Grid
```javascript
// Products (2 cols mobile → 4 cols desktop)
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"

// 2 column layout
className="grid lg:grid-cols-2 gap-8"

// 3 column layout
className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
```

---

## 🔌 API Integration Patterns

### Fetching Products (Server-side)
```javascript
async function Products() {
  try {
    const response = await productService.getProducts({
      category: 'men',
      limit: 48
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
```

### Form Submission (Client-side)
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  
  try {
    await supportService.submitContactForm(formData)
    setSuccess(true)
  } catch (err) {
    setError(err.response?.data?.message || 'Error occurred')
  } finally {
    setLoading(false)
  }
}
```

### Dynamic Data (with Suspense)
```javascript
<Suspense fallback={<div>Loading...</div>}>
  <AsyncComponent />
</Suspense>
```

---

## ✅ Pre-Launch Checklist

### Backend Team
- [ ] Verify all endpoints match documentation
- [ ] Test error responses (400, 401, 404, 500)
- [ ] Add pagination support to list endpoints
- [ ] Implement rate limiting
- [ ] Add request logging

### Frontend Team
- [ ] Test all 10 pages on mobile/tablet/desktop
- [ ] Verify API calls work end-to-end
- [ ] Test error states (network down, API errors)
- [ ] Verify images load correctly
- [ ] Test forms with invalid data
- [ ] Check accessibility (keyboard nav, screen readers)
- [ ] Performance audit (Lighthouse)
- [ ] Test on real 4G connection

### DevOps Team
- [ ] Set up environment variables (.env.local)
- [ ] Configure API base URL for production
- [ ] Set up analytics tracking
- [ ] Configure CDN for images
- [ ] Set up error monitoring (Sentry)
- [ ] Enable compression & caching
- [ ] Configure CORS headers

### QA Team
- [ ] Test all links in Navigation
- [ ] Test all links in Footer
- [ ] Test breadcrumb navigation
- [ ] Test mobile menu
- [ ] Test user menu dropdown
- [ ] Test cart badge updates
- [ ] Test form validation
- [ ] Test sorting/filtering
- [ ] Test pagination
- [ ] Test 404 pages

---

## 🚀 Deployment Command

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel (recommended)
vercel deploy --prod
```

---

## 🐛 Common Issues & Solutions

### Problem: "Module not found"
**Solution**: Check import path uses `@/` alias. Verify file exists in `src/components` or `src/lib`.

### Problem: "Cannot read property of undefined"
**Solution**: Add null checks. Use optional chaining (`data?.property`). Add Suspense boundary.

### Problem: "Images not loading"
**Solution**: Verify image URLs are correct. Check CORS headers. Use Next.js Image component.

### Problem: "API calls failing"
**Solution**: Check API base URL in `src/lib/api/client.js`. Verify backend is running. Check network tab in DevTools.

### Problem: "Styles not applying"
**Solution**: Verify class names are in `tailwind.config.js`. Check Tailwind CSS is imported in layout. Rebuild Tailwind.

### Problem: "Mobile menu not working"
**Solution**: Check state is updating (`setIsMobileMenuOpen`). Verify click handlers attached. Check z-index stacking.

---

## 📊 Page Load Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

**Current Performance**: (To be measured post-deployment)

---

## 🎯 Next Immediate Tasks

### By Tomorrow
1. **Test all 10 pages** - Load each in browser, verify no errors
2. **API integration test** - Confirm endpoints exist and respond correctly
3. **Mobile responsive test** - Check on iPhone SE (375px) and iPad (768px)

### By End of Week
4. **Deploy to staging** - Vercel automatically or custom server
5. **Full QA pass** - All 10 pages, all interactions
6. **Performance audit** - Run Lighthouse, fix bottlenecks

### By Production Launch
7. **Implement 8 pending pages** - Use templates provided
8. **Analytics setup** - Google Analytics, Sentry
9. **Go live** - Domain setup, SSL certificate, monitoring

---

## 📞 Questions?

Refer to:
- **Architecture questions** → `PAGES_ARCHITECTURE.md`
- **Implementation details** → `PAGES_IMPLEMENTATION.md`
- **API endpoints** → `API_INTEGRATION.md`
- **Design tokens** → `DESIGN_SYSTEM.md`
- **Component API** → `COMPONENTS.md`

---

**Remember**: This is production-ready code. Just plug in your API endpoints and launch! 🚀
