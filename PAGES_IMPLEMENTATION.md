# Complete Pages Implementation Guide

## Overview

This document covers the implementation of 18 new pages across three categories: Shop, Support, and Company. All pages follow the Apple × Nike design philosophy and integrate with backend APIs.

---

## 1. SHOP PAGES (6 pages)

### ✅ New Arrivals `/products/new`
**Status**: Implemented
**File**: `src/app/products/new/page.js`
**Purpose**: Display latest products
**Data**: Products API (`category: 'new'`)
**Features**: Filters, sorting, pagination

### ✅ Men `/products/men`
**Status**: Implemented
**File**: `src/app/products/men/page.js`
**Purpose**: Men's product category
**Data**: Products API (`category: 'men'`)
**Features**: 
- Desktop filters sidebar (sticky)
- Product grid (4 columns desktop, 2 mobile)
- Filter by price, size, ratings
- Breadcrumb navigation

### ✅ Women `/products/women`
**Status**: Implemented
**File**: `src/app/products/women/page.js`
**Purpose**: Women's product category
**Data**: Products API (`category: 'women'`)
**Features**: Same as Men's page

### ✅ Accessories `/products/accessories`
**Status**: Implemented
**File**: `src/app/products/accessories/page.js`
**Purpose**: Accessories category
**Data**: Products API (`category: 'accessories'`)
**Features**: Same as Men's page

### Collections `/collections`
**Status**: Pending
**File**: `src/app/collections/page.js`
**Purpose**: Display curated collections (seasonal, themed)
**Data**: Collections API
**Features**: 
- Collection cards with images
- Filter/search collections
- Link to products in each collection
**Example API Response**:
```json
{
  "collections": [
    {
      "id": 1,
      "name": "Spring 2024",
      "slug": "spring-2024",
      "description": "New season, new style",
      "image": "url",
      "productCount": 42,
      "products": []
    }
  ]
}
```

---

## 2. SUPPORT PAGES (6 pages)

### ✅ Track Order `/track-order`
**Status**: Implemented
**File**: `src/app/track-order/page.js`
**Purpose**: Real-time order tracking
**Data**: Orders API
**Features**:
- Search by order number + email
- Display order status timeline
- Show shipping address
- Estimated delivery date
- Real-time status updates

**API Integration**:
```javascript
// src/lib/api/orders.js
await orderService.trackOrder({ 
  trackingNumber, 
  email 
})
```

### ✅ Contact Us `/contact`
**Status**: Implemented
**File**: `src/app/contact/page.js`
**Purpose**: Contact form and information
**Data**: Support API
**Features**:
- Contact form with validation
- Multiple communication channels
- Operating hours
- Physical address
- Form submission → Support ticket creation

**API Integration**:
```javascript
await supportService.submitContactForm({
  name, email, subject, message
})
```

### ✅ FAQ `/faq`
**Status**: Implemented
**File**: `src/app/faq/page.js`
**Purpose**: Frequently asked questions
**Data**: Static + CMS
**Features**:
- Organized by category (Shipping, Returns, Sizing, etc.)
- Expandable Q&A
- Search functionality
- Link to Contact if question not answered

### Support Hub `/support`
**Status**: Pending
**File**: `src/app/support/page.js`
**Purpose**: Navigation hub for all support pages
**Features**:
- Grid of support topics (Contact, FAQ, Track Order, Shipping)
- Quick links
- Support hours
- Chat/email CTA

### Shipping & Returns `/shipping-returns`
**Status**: Pending
**File**: `src/app/shipping-returns/page.js`
**Purpose**: Shipping and return policies
**Data**: Static content
**Features**:
- Shipping policy (timing, costs, methods)
- Return policy (30 days, conditions)
- Exchange process
- International shipping info

### Size Guide `/size-guide`
**Status**: Pending
**File**: `src/app/size-guide/page.js`
**Purpose**: Size measurements by category
**Data**: Static or CMS
**Features**:
- Category tabs (Men, Women, Accessories)
- Measurement charts
- Fit tips and videos
- Size comparison tool

---

## 3. COMPANY PAGES (6 pages)

### ✅ About Us `/about`
**Status**: Implemented
**File**: `src/app/about/page.js`
**Purpose**: Brand story and values
**Data**: Static
**Features**:
- Mission statement
- Core values (4 sections with icons)
- Company timeline (6 milestones)
- CTA to shop

### ✅ Blog Listing `/blog`
**Status**: Implemented
**File**: `src/app/blog/page.js`
**Purpose**: Blog article index
**Data**: Content API
**Features**:
- 2-column grid layout
- Featured image per post
- Author + publish date
- Reading time estimate
- Excerpt preview
- "Read More" link

**API Integration**:
```javascript
await contentService.getBlogPosts({ limit: 12 })
```

### ✅ Blog Detail `/blog/[slug]`
**Status**: Implemented
**File**: `src/app/blog/[slug]/page.js`
**Purpose**: Individual blog article
**Data**: Content API
**Features**:
- Full article content
- Author bio
- Publish date & reading time
- Share buttons
- Related articles (3-4)
- Tag system
- Back to blog link

**Dynamic Metadata** (for SEO):
```javascript
export async function generateMetadata({ params }) {
  const post = await contentService.getBlogPostBySlug(params.slug)
  return {
    title: `${post.title} | SPORT Blog`,
    description: post.excerpt
  }
}
```

### Company Overview `/company`
**Status**: Pending
**File**: `src/app/company/page.js`
**Purpose**: Corporate information hub
**Features**:
- Company stats (revenue, years, countries)
- Leadership team profiles
- Brand partnerships
- Links to other company pages

### Careers `/careers`
**Status**: Pending
**File**: `src/app/careers/page.js`
**Purpose**: Job listings and applications
**Data**: Careers API/CMS
**Features**:
- Job board with filters (department, location)
- Individual job detail pages
- Application form
- Culture/benefits overview

### Sustainability `/sustainability`
**Status**: Pending
**File**: `src/app/sustainability/page.js`
**Purpose**: ESG initiatives and impact
**Data**: Static/CMS
**Features**:
- Sustainability commitments
- Impact metrics
- Material sources
- Carbon neutral certification
- Links to reports

### Press `/press`
**Status**: Pending
**File**: `src/app/press/page.js`
**Purpose**: Press releases and media
**Data**: CMS/Content API
**Features**:
- Press release listing (paginated)
- Filter by date/category
- Press kits for download
- Media contact information
- Brand assets

---

## Component Reuse Summary

### New Layout Components Created
1. **PageHeader** - Hero section with breadcrumbs
   - Usage: All new pages
   - Accepts: title, description, breadcrumbs, bgImage

2. **PageSection** - Standardized spacing container
   - Usage: All pages for consistent rhythm
   - Accepts: children, title, subtitle, className

3. **ProductGrid** - Responsive product layout
   - Usage: All category pages
   - 2 cols mobile, 3 cols tablet, 4 cols desktop

4. **ProductFilters** - Collapsible filter sidebar
   - Usage: Category & collection pages
   - Features: Category, price, size, color

### Component Locations
```
src/components/
├── layout/
│   ├── PageHeader.js ✅ (NEW)
│   ├── PageSection.js ✅ (NEW)
│   ├── Navigation.js (UPDATED)
│   └── Footer.js (EXISTING)
├── product/
│   ├── ProductGrid.js ✅ (NEW)
│   ├── ProductFilters.js ✅ (NEW)
│   ├── ProductCard.js (EXISTING)
│   └── ProductGallery.js (EXISTING)
└── forms/
    └── (Add FormInput.js if needed)
```

---

## API Service Layer Status

### Existing Services
- ✅ `src/lib/api/products.js` - Product catalog
- ✅ `src/lib/api/cart.js` - Shopping cart
- ✅ `src/lib/api/auth.js` - Authentication

### New Services Created
- ✅ `src/lib/api/orders.js` - Order tracking (enhanced)
- ✅ `src/lib/api/support.js` - Contact form, FAQ
- ✅ `src/lib/api/content.js` - Blog, press, careers

### API Endpoints Summary
```
PRODUCTS
  GET /products?category=men&limit=48
  GET /products/:id
  POST /products/:id/reviews

ORDERS
  GET /orders/:id
  POST /orders/track (with tracking number + email)
  GET /orders/history
  POST /orders/:id/cancel

SUPPORT
  POST /support/contact (contact form)
  GET /support/faq
  GET /support/faq/categories

CONTENT
  GET /content/blog?limit=12
  GET /content/blog/:slug
  GET /content/press
  GET /content/press/:slug
  GET /content/careers
  GET /content/careers/:id/apply
```

---

## Navigation Updates

### Header Navigation (Desktop)
```
SPORT | [New Arrivals | Men | Women | Accessories | Collections] | Search | User | Cart | Menu
```

### Footer Navigation Structure
```
SHOP                    SUPPORT              COMPANY
├── New Arrivals       ├── Contact Us        ├── About Us
├── Men                ├── Shipping & Returns├── Careers
├── Women              ├── Size Guide        ├── Sustainability
├── Accessories        ├── FAQ               ├── Press
└── Collections        └── Track Order       └── Blog
```

**Navigation File**: `/src/components/layout/Navigation.js` (UPDATED)
- Added support links structure
- Nav links array includes shop categories
- Footer already includes all sections

---

## Metadata & SEO

All pages include proper `metadata` exports for:
- Page title
- Meta description
- Open Graph tags
- Structured data (where applicable)

Example:
```javascript
export const metadata = {
  title: "Men's Collection | SPORT",
  description: "Shop premium men's sports apparel..."
}
```

---

## Responsive Design Breakpoints

All pages use Tailwind's standard breakpoints:
- **Mobile**: `<640px` (hidden desktop features)
- **Tablet**: `640px-1023px` (adjusted layouts)
- **Desktop**: `≥1024px` (full features)

Key classes:
- `hidden md:block` - Hide on mobile
- `md:grid-cols-2 lg:grid-cols-4` - Responsive columns
- `container-fluid` - Custom max-width container

---

## Testing Checklist

Before production deployment:

- [ ] All pages load without errors
- [ ] API calls work and handle errors gracefully
- [ ] Loading states display during data fetching
- [ ] Empty states show when no data available
- [ ] Mobile responsive (375px, 768px, 1920px)
- [ ] Forms validate input properly
- [ ] Navigation links all work
- [ ] Breadcrumbs display correctly
- [ ] Images load and display properly
- [ ] Blog detail pages generate correct metadata
- [ ] Track order searches work end-to-end
- [ ] Contact form submits and shows confirmation
- [ ] FAQ categories expand/collapse properly

---

## Performance Considerations

1. **Image Optimization**
   - Use Next.js Image component where possible
   - Lazy load images below fold
   - Use appropriate dimensions per breakpoint

2. **API Calls**
   - Use server-side fetching for static content (Blog, About)
   - Client-side fetching for user interactions (Track Order, Contact)
   - Implement caching for frequently accessed data

3. **Code Splitting**
   - Each page is automatically code-split by Next.js
   - Filters and forms use `'use client'` for interactivity

---

## Pending Implementation

The following pages are architecture-planned but need code:

- [ ] `/collections` - Collection listing page
- [ ] `/support` - Support hub page
- [ ] `/shipping-returns` - Shipping policy page
- [ ] `/size-guide` - Size measurements page
- [ ] `/company` - Company overview page
- [ ] `/careers` - Job listing page
- [ ] `/sustainability` - Sustainability page
- [ ] `/press` - Press releases page

All these pages follow the same pattern as completed pages and can be built quickly using the existing component library.

---

## File Structure Summary

```
frontend/src/app/
├── (routes)
│   ├── products/
│   │   ├── new/page.js ✅
│   │   ├── men/page.js ✅
│   │   ├── women/page.js ✅
│   │   └── accessories/page.js ✅
│   ├── track-order/page.js ✅
│   ├── contact/page.js ✅
│   ├── faq/page.js ✅
│   ├── about/page.js ✅
│   ├── blog/
│   │   ├── page.js ✅
│   │   └── [slug]/page.js ✅
│   └── (pending pages...)
│
└── components/
    ├── layout/
    │   ├── PageHeader.js ✅
    │   ├── PageSection.js ✅
    │   ├── Navigation.js (UPDATED)
    │   └── Footer.js (EXISTING)
    ├── product/
    │   ├── ProductGrid.js ✅
    │   └── ProductFilters.js ✅
    └── (existing components)
```

---

## Next Steps

1. **Immediate** (0-1 day)
   - Test all implemented pages
   - Verify API integration
   - Mobile responsive testing

2. **Short-term** (1-3 days)
   - Implement pending pages (Collections, Support Hub, etc.)
   - Add Careers page with job posting functionality
   - Create Press releases page

3. **Medium-term** (1 week)
   - Build Size Guide with measurement tools
   - Create Sustainability/About expanded pages
   - Add search functionality across Blog

4. **Long-term**
   - Implement admin CMS for page content
   - Add analytics tracking
   - Build advanced filtering/search
   - Create recommendation engine for related products
