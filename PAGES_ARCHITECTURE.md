# E-Commerce Pages Architecture

## 📋 Complete Page Inventory

### GROUP 1: SHOP & PRODUCT DISCOVERY
These pages are **customer-facing** product browsing experiences.

| Page | Route | Purpose | Data Source | Status |
|------|-------|---------|-------------|--------|
| Shop (All Products) | `/shop` | Browse all products with filters | Products API | ✓ Existing |
| New Arrivals | `/products/new` | Latest products | Products API | 🔄 Create |
| Men | `/products/men` | Men's category | Products API | 🔄 Create |
| Women | `/products/women` | Women's category | Products API | 🔄 Create |
| Accessories | `/products/accessories` | Accessories category | Products API | 🔄 Create |
| Collections | `/collections` | Curated collections | Products API | 🔄 Create |

---

### GROUP 2: SUPPORT & CUSTOMER HELP
These pages provide **customer service** and operational information.

| Page | Route | Purpose | Data Source | Status |
|------|-------|---------|-------------|--------|
| Support Hub | `/support` | Navigation hub | Static | 🔄 Create |
| Contact Us | `/contact` | Contact form | Support API | 🔄 Create |
| Shipping & Returns | `/shipping-returns` | Policies | Static | 🔄 Create |
| Size Guide | `/size-guide` | Sizing charts | Static/API | 🔄 Create |
| FAQ | `/faq` | Questions & answers | Static/CMS | 🔄 Create |
| Track Order | `/track-order` | Order tracking | Orders API | 🔄 Create |

---

### GROUP 3: COMPANY & BRAND
These pages tell the **brand story** and support business goals.

| Page | Route | Purpose | Data Source | Status |
|------|-------|---------|-------------|--------|
| Company | `/company` | Company overview | Static | 🔄 Create |
| About Us | `/about` | Brand story | Static | 🔄 Create |
| Careers | `/careers` | Job opportunities | Careers API/CMS | 🔄 Create |
| Sustainability | `/sustainability` | ESG initiatives | Static/CMS | 🔄 Create |
| Press | `/press` | Press releases | CMS/API | 🔄 Create |
| Blog Listing | `/blog` | Article index | Blog API | 🔄 Create |
| Blog Detail | `/blog/[slug]` | Single article | Blog API | 🔄 Create |

---

## 🏗️ Component Reuse Strategy

### Shared Layout Components
```
src/components/
├── layout/
│   ├── Navigation.js (✓ existing)
│   ├── Footer.js (✓ existing)
│   ├── PageHeader.js (NEW - hero + breadcrumbs)
│   ├── PageSection.js (NEW - standardized spacing)
│   └── SectionHeader.js (NEW - title + subtitle)
├── product/
│   ├── ProductCard.js (✓ existing)
│   ├── ProductGrid.js (NEW - responsive grid layout)
│   ├── ProductFilters.js (NEW - category filters)
│   └── ProductSort.js (NEW - sorting controls)
├── forms/
│   ├── ContactForm.js (NEW)
│   ├── TrackOrderForm.js (NEW)
│   └── FormInput.js (NEW - reusable input)
└── cms/
    ├── RichText.js (NEW - render rich content)
    ├── BlogCard.js (NEW)
    └── BlogGrid.js (NEW)
```

### Layout Composition Patterns

**Pattern A: Hero + Content**
```
<PageHeader title="..." description="..." />
<PageSection>...</PageSection>
<PageSection>...</PageSection>
```

**Pattern B: Grid + Sidebar**
```
<div className="grid lg:grid-cols-4 gap-8">
  <ProductFilters />
  <ProductGrid />
</div>
```

**Pattern C: Form + Info**
```
<div className="grid lg:grid-cols-2 gap-12">
  <ContactForm />
  <ContactInfo />
</div>
```

---

## 📊 Data Requirements by Page

### SHOP PAGES
- **Products data**: id, name, price, image, category, rating, availability
- **Filters**: Price range, size, color, rating, in-stock only
- **Pagination**: 12-24 items per page
- **Sorting**: Price (asc/desc), Rating, Newest, Best Sellers

### SUPPORT PAGES
- **Contact**: Form submission → Support API
- **Track Order**: Order ID → Orders API (returns status, timeline, tracking)
- **FAQ**: Static JSON or CMS (questions, answers, categories)
- **Size Guide**: Static data by category (measurements, fit tips)

### COMPANY PAGES
- **Blog**: title, excerpt, image, author, date, content, tags
- **Press**: title, date, excerpt, PDF link, publication
- **Careers**: title, description, location, department, apply link

---

## 🎨 Design System Alignment

All pages follow:
- **Typography**: Existing heading/body scales from tailwind.config.js
- **Spacing**: 18px, 24px, 32px, 40px, 56px, 80px, 144px
- **Colors**: Neutral-first palette + accent red
- **Animations**: Fade-in, fade-up (no unnecessary motion)
- **Mobile**: Stack vertically, hide desktop elements at `lg:` breakpoint

---

## 🔗 Navigation Integration

### Header Navigation (Desktop)
```
SPORT | New Arrivals | Men | Women | Accessories | Collections | Search | User | Cart | Menu
```

### Footer Navigation (All Sizes)
```
SHOP
├── New Arrivals
├── Men
├── Women
├── Accessories
└── Collections

SUPPORT
├── Contact Us
├── Shipping & Returns
├── Size Guide
├── FAQ
└── Track Order

COMPANY
├── About Us
├── Careers
├── Sustainability
├── Press
└── Blog

CUSTOMER
├── My Account
├── Orders
├── Wishlist
└── Sign Out
```

### Mobile Menu
Same as footer structure for consistency

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px (single column, stacked)
- **Tablet**: 640px - 1023px (2 columns where appropriate)
- **Desktop**: 1024px+ (3-4 columns, sidebar layouts)

---

## 🔄 API Integration Checklist

- [ ] Update `src/lib/api/products.js` - add category filters
- [ ] Create `src/lib/api/orders.js` - track order endpoint
- [ ] Create `src/lib/api/support.js` - contact form, FAQ
- [ ] Create `src/lib/api/content.js` - blog, careers, press
- [ ] Error handling for all endpoints
- [ ] Loading states for async operations
- [ ] Caching strategy for static content

---

## 🎯 Key Implementation Priorities

1. **Shop pages first** - core business functionality (NEW: Men, Women, Accessories, Collections)
2. **Support pages second** - customer retention (Contact, Track Order, FAQ)
3. **Company pages third** - brand building (About, Blog, Press)

---

## 🧪 Testing Checklist

- [ ] All pages load without errors
- [ ] API calls are correct and handle errors
- [ ] Mobile responsive on iPhone SE (375px)
- [ ] Mobile responsive on iPad (768px)
- [ ] Desktop layout works (1920px)
- [ ] Forms validate input and show errors
- [ ] Links navigate correctly
- [ ] Images load and display properly
- [ ] Loading states appear during API calls
- [ ] Empty states show when no data

---

## 📝 SEO Considerations

- Static metadata in route layout.js
- Open Graph tags for sharing
- Structured data for products, articles, org schema
- Meta descriptions for all pages
- Canonical URLs
- Sitemap generation
- robots.txt configuration

Each page's `layout.js` should export metadata:
```javascript
export const metadata = {
  title: "Page Title | SPORT",
  description: "Page description for search results"
}
```
