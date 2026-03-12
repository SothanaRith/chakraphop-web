# Animation Implementation Guide

Complete motion system for the Elite Sport e-commerce frontend using Framer Motion.

## Quick Start

### 1. Import Motion Components

```javascript
import { motion } from 'framer-motion'
import { 
  FadeIn, 
  SlideUp, 
  SlideDown, 
  HoverScale,
  Stagger,
  StaggerItem 
} from '@/lib/motion/components'
import { usePrefersReducedMotion } from '@/lib/motion/hooks'
```

### 2. Use Pre-built Animation Components

```javascript
// Simple fade in
<FadeIn delay={0.1}>
  <h1>My Content</h1>
</FadeIn>

// Slide up with stagger
<Stagger initialDelay={0.2} staggerDelay={0.05}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      {item.content}
    </StaggerItem>
  ))}
</Stagger>

// Hover scale for cards
<HoverScale scale={1.02}>
  <div className="card">Product Card</div>
</HoverScale>
```

## Animation Inventory

### Already Updated Components

✅ **Hero.js** - Staggered entrance, background zoom
✅ **PageHeader.js** - Breadcrumb slide, title/description stagger
✅ **ProductCard.js** - Scroll reveal, hover scale, badge animations
✅ **Button.js** - Hover scale, tap press feedback
✅ **FeaturedProducts.js** - Section animations, product grid stagger

### Ready to Use Components

- **FormStatus.js** - Success/Error/Info alerts with animations
- **Modal.js** - Modal, Drawer, Toast with entrance/exit
- **FormStatus.js** - Loading spinner, skeleton loader

## Animation Patterns

### 1. Page Entrance (Hero Sections)

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,        // 100ms delay between children
      delayChildren: 0.2,           // Wait before first child
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.12, 0.4, 0.29, 0.95],  // Premium easing
    },
  },
}

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="show">
  <motion.h1 variants={itemVariants}>Title</motion.h1>
  <motion.p variants={itemVariants}>Description</motion.p>
</motion.div>
```

### 2. Scroll Reveal (Content Sections)

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}  // Trigger 100px before visible
  transition={{ duration: 0.3 }}
>
  Content that animates when scrolled into view
</motion.div>
```

### 3. Hover Interactions (Cards, Buttons)

```javascript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  Interactive element
</motion.div>
```

### 4. Feedback States (Forms)

```javascript
import { FormSuccess, FormError, LoadingSpinner } from '@/components/ui/FormStatus'

// Show success with animation
{isSuccess && <FormSuccess message="Sent successfully!" />}

// Show error with animation
{hasError && <FormError message="Something went wrong" />}

// Loading state
{isLoading && <LoadingSpinner />}
```

### 5. List Animations (Product Grids)

```javascript
// Container stagger
<motion.div
  initial="hidden"
  whileInView="show"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,      // 50ms between each item
        delayChildren: 0.1,
      },
    },
  }}
  className="grid grid-cols-4 gap-6"
>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <ProductCard product={item} />
    </StaggerItem>
  ))}
</motion.div>
```

## Motion Tokens

### Timing (Duration)

```javascript
150ms   - FAST (micro-interactions, hover)
200ms   - SHORT (standard animations)
300ms   - MEDIUM (emphasis, stagger)
500ms   - SLOW (rarely used, hero entrance)
```

### Easing

```javascript
// Premium easing (most used)
ease: [0.12, 0.4, 0.29, 0.95]  // easeOut

// For exits
ease: [0.32, 0, 0.67, 0]       // easeIn

// For back-and-forth
ease: [0.25, 0.46, 0.45, 0.94] // easeInOut

// For constant speed (loading, progress)
ease: 'linear'
```

## Accessibility

### Respect User Preferences

```javascript
import { usePrefersReducedMotion } from '@/lib/motion/hooks'

export function MyComponent() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,  // Skip animations if preference set
      }}
    >
      Content
    </motion.div>
  )
}
```

## Performance Best Practices

### ✅ DO Use These Properties (GPU Accelerated)

- `transform` (scale, rotate, x, y)
- `opacity`
- `filter`

### ❌ DON'T Animate These (CPU Intensive)

- `width`, `height` → Use `scaleX`, `scaleY` instead
- `left`, `right`, `top`, `bottom` → Use `x`, `y` instead
- `backgroundColor`, `color` → Use `filter` or separate elements
- `border-radius` → Keep static, use CSS

### Example: Bad vs Good

```javascript
// ❌ BAD - Repaints on every frame
<motion.div animate={{ width: [0, 100] }} />

// ✅ GOOD - GPU accelerated
<motion.div animate={{ scaleX: [0, 1] }} style={{ originX: 0 }} />
```

## Common Use Cases

### 1. Adding Entrance Animations to Existing Components

```javascript
// Before
<div className="section">Content</div>

// After
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.3 }}
  className="section"
>
  Content
</motion.div>
```

### 2. Button with Loading State

```javascript
import { LoadingSpinner } from '@/components/ui/FormStatus'

export function SubmitButton({ isLoading }) {
  return (
    <button disabled={isLoading}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        'Submit'
      )}
    </button>
  )
}
```

### 3. Image Gallery with Animations

```javascript
<motion.div layout className="grid grid-cols-3 gap-4">
  {images.map(img => (
    <motion.img
      key={img.id}
      layoutId={img.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      src={img.src}
    />
  ))}
</motion.div>
```

### 4. Modal/Dialog with Backdrop

```javascript
import { Modal } from '@/components/ui/Modal'

export function MyModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Dialog Title"
      >
        Dialog content
      </Modal>
    </>
  )
}
```

### 5. Toast Notifications

```javascript
import { Toast } from '@/components/ui/Modal'

export function MyComponent() {
  const [toastOpen, setToastOpen] = useState(false)

  return (
    <>
      <button onClick={() => setToastOpen(true)}>
        Show Notification
      </button>
      <Toast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Action completed!"
        type="success"  // 'success' | 'error' | 'info' | 'warning'
      />
    </>
  )
}
```

## Testing Animations

### Before Shipping

- [ ] Test on low-end devices (frame rate drops)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Test on mobile (60fps vs 120fps screens)
- [ ] Test navigation between pages
- [ ] Check for layout shifts (CLS - Cumulative Layout Shift)
- [ ] Verify touch interactions (not just hover)
- [ ] Test in different browsers
- [ ] Check accessibility: keyboard navigation still works
- [ ] Verify no animations on `print` media query
- [ ] Test with screen readers enabled
- [ ] Check reduced motion mode in OS settings
- [ ] Profile with Chrome DevTools (Performance tab)

## Troubleshooting

### Animations Not Running

```javascript
// ❌ Missing initial state
<motion.div animate={{ opacity: 1 }}>

// ✅ Add initial state
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
```

### Performance Issues

```javascript
// ❌ Too many animations at once
{items.map(item => <motion.div animate={{...}} />)}

// ✅ Use stagger pattern
<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => <motion.div variants={item} />)}
</motion.div>
```

### Not Respecting Accessibility

```javascript
// ❌ Always animate
<motion.div animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />

// ✅ Check preference
const prefersReducedMotion = usePrefersReducedMotion()
<motion.div 
  animate={{ opacity: 1 }} 
  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
/>
```

## Component Integration Checklist

### For Each Page Component

- [ ] Add hero entrance stagger animation
- [ ] Add section reveal on scroll
- [ ] Animate heading with slide-up
- [ ] Animate description with fade-in delay
- [ ] Add CTA button hover animations
- [ ] Use ProductCard (already animated)
- [ ] Add form feedback animations
- [ ] Check accessibility with motion preference

### For Each Interactive Element

- [ ] Button: hover scale + tap feedback
- [ ] Card: hover scale + shadow
- [ ] Link: underline animation (optional)
- [ ] Input: focus outline animation
- [ ] Checkbox: toggle animation
- [ ] Modal: entrance + exit animations

## File Structure

```
src/
  lib/
    motion/
      config.js          - Motion tokens and presets
      components.js      - Reusable animation wrappers
      hooks.js          - Motion utility hooks
      index.js          - Exports
  components/
    home/
      Hero.js           - ✅ Updated with animations
    layout/
      PageHeader.js     - ✅ Updated with animations
      Navigation.js     - Ready for animation updates
      Footer.js         - Ready for animation updates
    product/
      ProductCard.js    - ✅ Updated with animations
      ProductGrid.js    - Ready for animation updates
      ProductFilters.js - Ready for animation updates
    ui/
      Button.js         - ✅ Updated with animations
      Modal.js          - Animated components
      FormStatus.js     - Animated feedback states
```

## Next Steps

1. **Update Remaining Pages** - Add scroll reveal to:
   - CategoryShowcase.js
   - StorySection.js
   - Features.js
   - ProductGrid.js
   - All other home sections

2. **Update Form Pages** - Add animations to:
   - Contact form with validation feedback
   - Track Order form with result animations
   - Newsletter signup

3. **Update Navigation** - Add animations to:
   - Mobile menu entrance/exit
   - Dropdown animations
   - Cart sidebar

4. **Update Product Pages** - Add animations to:
   - Product gallery carousel
   - Size guide modal
   - Reviews section

5. **Test Thoroughly** - Performance & accessibility:
   - Run lighthouse audit
   - Test on mobile devices
   - Check reduced motion settings
   - Profile animations with DevTools
