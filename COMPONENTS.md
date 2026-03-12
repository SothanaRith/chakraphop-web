# Component Architecture

Complete reference for all UI components in the Elite Sport frontend.

---

## 📋 Component Index

### Layout Components
- [Navigation](#navigation)
- [Footer](#footer)

### Home Components
- [Hero](#hero)
- [FeaturedProducts](#featuredproducts)
- [CategoryShowcase](#categoryshowcase)
- [StorySection](#storysection)
- [Features](#features)

### Product Components
- [ProductCard](#productcard)
- [ProductGallery](#productgallery)
- [ProductInfo](#productinfo)
- [FilterPanel](#filterpanel)
- [SortBar](#sortbar)

### UI Primitives
- [Button](#button)
- [Container](#container)

---

## Layout Components

### Navigation

**Path**: `src/components/layout/Navigation.js`

**Purpose**: Persistent header navigation with search, cart, and mobile menu.

**Features:**
- Sticky positioning with scroll-based background
- Search bar toggle
- Mobile hamburger menu
- Cart badge with item count

**Props**: None (uses client-side state)

**Usage:**
```jsx
import Navigation from '@/components/layout/Navigation'

<Navigation />
```

**States:**
- Default: Transparent/minimal background
- Scrolled: White background with shadow
- Search open: Expanded search bar below nav
- Mobile menu open: Full-screen menu overlay

**Responsive Behavior:**
- Desktop (lg+): Horizontal links, all actions visible
- Mobile: Hamburger menu, search + cart only

---

### Footer

**Path**: `src/components/layout/Footer.js`

**Purpose**: Rich footer with newsletter, links, and social icons.

**Features:**
- Newsletter signup form
- Multi-column link sections
- Social media links
- Bottom legal links

**Props**: None

**Usage:**
```jsx
import Footer from '@/components/layout/Footer'

<Footer />
```

**Sections:**
1. Newsletter (full-width, prominent)
2. Link columns (Shop, Support, Company, Connect)
3. Bottom bar (copyright, legal links)

**Responsive Behavior:**
- Mobile: Stacked columns
- Desktop: 4-column grid

---

## Home Components

### Hero

**Path**: `src/components/home/Hero.js`

**Purpose**: Full-screen hero section with bold messaging and CTA.

**Features:**
- Full-bleed background image
- Large display typography
- Primary + secondary CTAs
- Scroll indicator

**Props**: None (uses static content)

**Usage:**
```jsx
import Hero from '@/components/home/Hero'

<Hero />
```

**Design Notes:**
- Background image with gradient overlay
- Text contrast: white on dark
- Eyebrow text for context
- Bold headline (96px+ on desktop)

**Responsive Behavior:**
- Mobile: Smaller text, stacked buttons
- Desktop: Large text, side-by-side buttons

---

### FeaturedProducts

**Path**: `src/components/home/FeaturedProducts.js`

**Purpose**: Showcase curated products in a grid.

**Features:**
- Section header with description
- Responsive product grid
- "View All" link

**Props**: None (fetches products or uses static data)

**Usage:**
```jsx
import FeaturedProducts from '@/components/home/FeaturedProducts'

<FeaturedProducts />
```

**Layout:**
- 4-column grid on desktop
- 2-column on tablet
- 1-column on mobile

---

### CategoryShowcase

**Path**: `src/components/home/CategoryShowcase.js`

**Purpose**: Editorial-style category cards with immersive imagery.

**Features:**
- Full-image cards with overlay
- Hover effects (scale, text transform)
- Clear CTAs

**Props**: None (uses static category data)

**Usage:**
```jsx
import CategoryShowcase from '@/components/home/CategoryShowcase'

<CategoryShowcase />
```

**Design Notes:**
- 3 equal-width columns
- Portrait aspect ratio (3:4)
- Dark gradient overlay for text contrast

**Responsive Behavior:**
- Desktop: 3 columns
- Mobile: Stacked cards

---

### StorySection

**Path**: `src/components/home/StorySection.js`

**Purpose**: Brand storytelling with image + text layout.

**Features:**
- 2-column layout (image + content)
- Dark background for contrast
- Link to "About" page

**Props**: None

**Usage:**
```jsx
import StorySection from '@/components/home/StorySection'

<StorySection />
```

**Design Notes:**
- Image on left (desktop), top (mobile)
- White text on dark background
- Eyebrow label for context

---

### Features

**Path**: `src/components/home/Features.js`

**Purpose**: Trust badges (shipping, returns, support, security).

**Features:**
- Icon + title + description
- 4-column grid

**Props**: None

**Usage:**
```jsx
import Features from '@/components/home/Features'

<Features />
```

**Layout:**
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile

---

## Product Components

### ProductCard

**Path**: `src/components/product/ProductCard.js`

**Purpose**: Reusable product card for grids.

**Features:**
- Hover-enhanced image
- Quick Add button (on hover)
- Badge system (NEW, SALE)
- Color swatches
- Price with optional original price

**Props:**
```typescript
{
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    colors?: string[]
    isNew?: boolean
  }
}
```

**Usage:**
```jsx
import ProductCard from '@/components/product/ProductCard'

<ProductCard product={productData} />
```

**Hover Behavior:**
- Image scales to 105%
- Quick Add button slides up from bottom

**Responsive:**
- Works in any grid layout
- Maintains 3:4 aspect ratio

---

### ProductGallery

**Path**: `src/components/product/ProductGallery.js`

**Purpose**: Interactive image gallery for product detail page.

**Features:**
- Main image with navigation arrows
- Thumbnail grid below
- Current image indicator
- Click to select thumbnail

**Props:**
```typescript
{
  images: string[]  // Array of image URLs
}
```

**Usage:**
```jsx
import ProductGallery from '@/components/product/ProductGallery'

<ProductGallery images={['/img1.jpg', '/img2.jpg']} />
```

**States:**
- Current image index
- Hover states on thumbnails

---

### ProductInfo

**Path**: `src/components/product/ProductInfo.js`

**Purpose**: Detailed product information and purchase UI.

**Features:**
- Color selector (visual swatches)
- Size selector (button group)
- Quantity selector
- Add to Cart + Wishlist CTAs
- Accordion details (Product Details, Fit & Care, Shipping)

**Props:**
```typescript
{
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    category: string
    colors: Array<{ hex: string, name: string }>
    description?: string
    isNew?: boolean
  }
}
```

**Usage:**
```jsx
import ProductInfo from '@/components/product/ProductInfo'

<ProductInfo product={productData} />
```

**Interactions:**
- Color selection: Visual feedback (ring)
- Size selection: Toggle selected state
- Quantity: Increment/decrement
- Accordion: Expand/collapse sections

---

### FilterPanel

**Path**: `src/components/product/FilterPanel.js`

**Purpose**: Sidebar filters for product listing.

**Features:**
- Collapsible filter sections
- Checkbox filters
- Color swatch filters
- Item counts per option
- "Clear All" button

**Props**: None (manages state internally)

**Usage:**
```jsx
import FilterPanel from '@/components/product/FilterPanel'

<FilterPanel />
```

**Filter Sections:**
- Category
- Price Range
- Size
- Color

**Responsive:**
- Desktop: Sidebar (280px fixed width)
- Mobile: Modal/drawer (future implementation)

---

### SortBar

**Path**: `src/components/product/SortBar.js`

**Purpose**: Product count and sort dropdown.

**Features:**
- Total product count display
- Sort dropdown
- Mobile filter toggle button

**Props:**
```typescript
{
  totalProducts: number
}
```

**Usage:**
```jsx
import SortBar from '@/components/product/SortBar'

<SortBar totalProducts={48} />
```

**Sort Options:**
- Featured
- Newest
- Price: Low to High
- Price: High to Low
- Name: A to Z

---

## UI Primitives

### Button

**Path**: `src/components/ui/Button.js`

**Purpose**: Reusable button component with variants.

**Features:**
- Variants: primary, secondary, ghost
- Sizes: sm, md, lg
- Full-width option
- Disabled state

**Props:**
```typescript
{
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  ...props  // All native button props
}
```

**Usage:**
```jsx
import Button from '@/components/ui/Button'

<Button variant="primary" size="lg">
  Shop Now
</Button>
```

**Styling:**
- Primary: Black background, white text
- Secondary: White background, black border
- Ghost: Transparent, hover background

---

### Container

**Path**: `src/components/ui/Container.js`

**Purpose**: Responsive container wrapper.

**Features:**
- Variants: fluid, section, narrow
- Consistent horizontal padding
- Max-width constraints

**Props:**
```typescript
{
  children: ReactNode
  variant?: 'fluid' | 'section' | 'narrow'
  className?: string
}
```

**Usage:**
```jsx
import Container from '@/components/ui/Container'

<Container variant="section">
  <h1>Content</h1>
</Container>
```

**Variants:**
- `fluid`: Full-width with padding
- `section`: Max-width 88rem (1408px)
- `narrow`: Max-width 80rem (1280px)

---

## Component Guidelines

### File Organization

```
components/
├── layout/         # Persistent UI (nav, footer)
├── home/           # Homepage-specific sections
├── product/        # Product-related components
└── ui/             # Reusable primitives
```

### Naming Conventions

- **PascalCase** for component files: `ProductCard.js`
- **camelCase** for utility files: `utils.js`
- **Descriptive names**: `FeaturedProducts` not `ProductSection`

### Component Structure

```jsx
'use client'  // If using hooks/interactivity

import { useState } from 'react'

export default function ComponentName({ prop1, prop2 }) {
  // State
  const [state, setState] = useState(defaultValue)

  // Handlers
  const handleAction = () => {
    // Logic
  }

  // Render
  return (
    <div className="component-class">
      {/* JSX */}
    </div>
  )
}
```

### Best Practices

1. **Single Responsibility**: One component, one job
2. **Composition**: Build complex UIs from small components
3. **Props Over State**: Pass data down, not up
4. **Semantic HTML**: Use correct elements
5. **Accessibility**: ARIA labels, focus states
6. **Performance**: Avoid unnecessary re-renders

### Client vs Server Components

**Server Components (default):**
- Fetch data
- Render static content
- No interactivity

**Client Components (`'use client'`):**
- Use hooks (useState, useEffect, etc.)
- Event handlers
- Browser APIs

---

## Testing Components

### Manual Testing Checklist

- [ ] Renders correctly in all breakpoints
- [ ] Hover/focus states work
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast meets AA standards
- [ ] Handles edge cases (long text, missing data)

### Performance Checks

- [ ] No unnecessary re-renders
- [ ] Images optimized (Next.js Image component)
- [ ] Lazy load below-the-fold content
- [ ] Animations use GPU-accelerated properties

---

**Last Updated**: February 2026  
**Version**: 1.0
