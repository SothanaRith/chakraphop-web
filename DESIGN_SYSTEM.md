# Design System

## Overview

The Elite Sport design system is built on principles of clarity, confidence, and premium aesthetics. Every decision—from typography to spacing—is intentional and serves the goal of creating a high-end e-commerce experience.

---

## 🎨 Color System

### Philosophy
- **Neutral-First**: Primary UI uses black, white, and grays
- **Accent Sparingly**: Color used only for emphasis (sale badges, CTAs)
- **High Contrast**: Clear hierarchy through contrast, not color

### Palette

**Neutral (Primary)**
```
neutral-50:  #fafafa   - Lightest backgrounds
neutral-100: #f5f5f5   - Subtle backgrounds
neutral-200: #e5e5e5   - Borders, dividers
neutral-300: #d4d4d4   - Disabled text
neutral-400: #a3a3a3   - Placeholder text
neutral-500: #737373   - Secondary text
neutral-600: #525252   - Body text (light backgrounds)
neutral-700: #404040   - Strong text
neutral-800: #262626   - Near-black backgrounds
neutral-900: #171717   - Primary text, buttons
neutral-950: #0a0a0a   - Deepest black
```

**Accent (Red)**
```
accent-600: #dc2626    - Sale badges, urgent CTAs
accent-700: #b91c1c    - Hover states
```

### Usage Guidelines

**Backgrounds:**
- White (`bg-white`) for main content
- `neutral-50` for subtle distinction
- `neutral-900` or `neutral-950` for dark sections

**Text:**
- `neutral-900` for primary headings
- `neutral-600` for body text
- `neutral-500` for secondary/metadata
- White on dark backgrounds

**Borders:**
- `neutral-200` for light borders
- `neutral-300` for stronger borders
- `neutral-900` for focus states

**CTAs:**
- `neutral-900` background with white text (primary)
- White background with `neutral-900` border (secondary)

---

## 📝 Typography

### Font Stack

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', Arial, sans-serif
```

**Rationale**: System fonts for:
- Zero load time
- Platform-native feel
- Exceptional readability
- Professional appearance

### Type Scale

| Token | Size | Line Height | Letter Spacing | Use Case |
|-------|------|-------------|----------------|----------|
| `text-display-lg` | 72px / 4.5rem | 1.1 | -0.02em | Hero headlines |
| `text-display-md` | 60px / 3.75rem | 1.1 | -0.02em | Major section headers |
| `text-display-sm` | 48px / 3rem | 1.15 | -0.01em | Page titles |
| `text-heading-xl` | 36px / 2.25rem | 1.2 | -0.01em | Content headers |
| `text-heading-lg` | 30px / 1.875rem | 1.25 | -0.01em | Subsection titles |
| `text-heading-md` | 24px / 1.5rem | 1.3 | - | Card titles |
| `text-heading-sm` | 20px / 1.25rem | 1.4 | - | Small headers |
| `text-body-lg` | 18px / 1.125rem | 1.6 | - | Lead paragraphs |
| `text-body` | 16px / 1rem | 1.6 | - | Body text |
| `text-body-sm` | 14px / 0.875rem | 1.5 | - | Secondary text |
| `text-caption` | 12px / 0.75rem | 1.4 | - | Metadata, labels |

### Font Weights

- **Regular** (400): Body text
- **Medium** (500): Emphasized text, navigation
- **Semibold** (600): Headings, buttons
- **Bold** (700): Hero headlines, key CTAs

### Hierarchy Rules

1. **One Display per section**: Don't compete for attention
2. **Headings cascade**: h1 → h2 → h3 naturally
3. **Body + Body-lg only**: Keep body text simple
4. **Captions for metadata**: Small, de-emphasized

---

## 📏 Spacing System

### Philosophy
- **Generous white space** = Premium feel
- **Consistent rhythm** = Visual harmony
- **Responsive scaling** = Adapts to screen size

### Scale

```css
/* Tailwind's default scale */
0.5  → 2px
1    → 4px
2    → 8px
3    → 12px
4    → 16px
5    → 20px
6    → 24px
8    → 32px
10   → 40px
12   → 48px
16   → 64px
20   → 80px
24   → 96px
32   → 128px

/* Custom additions */
18   → 72px
22   → 88px
26   → 104px
30   → 120px
34   → 136px
38   → 152px
```

### Section Spacing

**Utility Classes:**

```css
.section-spacing {
  @apply py-20 md:py-28 lg:py-36;
}

.section-spacing-sm {
  @apply py-12 md:py-16 lg:py-20;
}
```

**Usage:**
- Major sections (Hero, Featured Products): `.section-spacing`
- Minor sections (Features, Trust badges): `.section-spacing-sm`
- Borders/dividers: `border-t` or `border-b`

### Component Spacing

**Cards:**
- Padding: `p-6` (24px) or `p-8` (32px)
- Gap between cards: `gap-8` (32px) or `gap-12` (48px)

**Buttons:**
- Padding: `px-8 py-4` (32px × 16px)
- Gap between buttons: `gap-4` (16px)

**Forms:**
- Input padding: `px-4 py-3`
- Label margin: `mb-2` or `mb-4`
- Field gap: `gap-6`

---

## 🎯 Components

### Buttons

**Variants:**

1. **Primary** (`.btn-primary`)
   ```html
   <button class="btn btn-primary">
     Shop Now
   </button>
   ```
   - Black background, white text
   - Hover: Slightly lighter background
   - Active: Scale down (0.98)

2. **Secondary** (`.btn-secondary`)
   ```html
   <button class="btn btn-secondary">
     Learn More
   </button>
   ```
   - White background, black border
   - Hover: Inverts (black background, white text)

3. **Ghost** (`.btn-ghost`)
   ```html
   <button class="btn btn-ghost">
     Cancel
   </button>
   ```
   - Transparent background
   - Hover: Light gray background

**Sizes:**
- Small: `px-6 py-3 text-body-sm`
- Medium: `px-8 py-4 text-body` (default)
- Large: `px-10 py-5 text-body-lg`

### Cards

**Product Card**
- Aspect ratio: 3:4 (portrait)
- Hover: Image scales to 105%, quick add slides up
- Structure: Image → Category → Name → Colors → Price

**Category Card**
- Aspect ratio: 3:4 (portrait)
- Full-bleed image with gradient overlay
- Hover: Image scales, text transforms

### Inputs

```html
<input class="input" type="text" placeholder="Email" />
```

**Styling:**
- Border: `border-neutral-300`
- Focus: `border-neutral-900` + `ring-1 ring-neutral-900`
- Padding: `px-4 py-3`
- No border-radius (sharp corners)

### Containers

**Utility Classes:**

```css
.container-fluid {
  @apply w-full px-6 md:px-12 lg:px-16;
}

.container-section {
  @apply w-full max-w-8xl mx-auto px-6 md:px-12 lg:px-16;
}

.container-narrow {
  @apply w-full max-w-5xl mx-auto px-6 md:px-12;
}
```

**Usage:**
- `.container-fluid`: Full-width sections
- `.container-section`: Most content sections (max 1408px)
- `.container-narrow`: Text-heavy content (max 1280px)

---

## 🎬 Animation

### Timing Functions

- **Default**: `ease-out` (natural deceleration)
- **Quick interactions**: 200-300ms
- **Content transitions**: 400-600ms
- **Page transitions**: 600-800ms

### Keyframes

```css
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeUp {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  0%   { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
```

### Utility Classes

```css
.animate-fade-in   → fadeIn 0.6s ease-out
.animate-fade-up   → fadeUp 0.6s ease-out
.animate-scale-in  → scaleIn 0.3s ease-out

.hover-lift        → hover:-translate-y-1
.hover-scale       → hover:scale-105
```

### Animation Principles

1. **Purpose-Driven**: Only animate when it guides attention
2. **Consistent**: Same durations/easings for similar interactions
3. **Performant**: Use `transform` and `opacity` (GPU-accelerated)
4. **Subtle**: Micro-interactions, not distractions

---

## 📐 Layout

### Grid System

**Auto-Fit Grid:**
```css
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

**Common Layouts:**

```html
<!-- 2-column (desktop) -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

<!-- 3-column product grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

<!-- 4-column product grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
```

### Aspect Ratios

```css
.aspect-product  → 3:4 (portrait products)
.aspect-hero     → 16:9 (hero images)
.aspect-square   → 1:1 (avatars, thumbnails)
```

### Responsive Patterns

**Stack-to-Row:**
```html
<div class="flex flex-col md:flex-row gap-6">
```

**Hidden-to-Visible:**
```html
<div class="hidden lg:block">Desktop only</div>
<div class="lg:hidden">Mobile only</div>
```

**Responsive Text:**
```html
<h1 class="text-display-sm md:text-display-md lg:text-display-lg">
```

---

## ♿ Accessibility

### Focus States

All interactive elements use:

```css
.focus-ring {
  @apply focus:outline-none 
         focus-visible:ring-2 
         focus-visible:ring-neutral-900 
         focus-visible:ring-offset-2;
}
```

### Semantic HTML

- Use `<button>` for actions
- Use `<a>` for navigation
- Use `<nav>`, `<main>`, `<footer>` landmarks
- Headings in logical order (h1 → h2 → h3)

### ARIA Labels

```html
<button aria-label="Add to cart">
  <ShoppingBag />
</button>
```

### Color Contrast

- **AA Standard**: 4.5:1 for normal text, 3:1 for large text
- **AAA Standard**: 7:1 for normal text, 4.5:1 for large text
- Test: Use browser DevTools or online checkers

---

## 🚀 Performance

### CSS Optimization

- **Tailwind Purge**: Removes unused styles in production
- **Critical CSS**: Inlined in `<head>`
- **Minimal Custom CSS**: ~500 lines total

### Best Practices

1. **Use Tailwind utilities** over custom CSS
2. **Compose with `@apply`** for repeated patterns
3. **Avoid deep nesting** in custom CSS
4. **Group responsive variants** for clarity

---

## 📱 Responsive Design

### Breakpoints

| Token | Size | Device |
|-------|------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Mobile-First

```html
<!-- Mobile: 1 column, Desktop: 3 columns -->
<div class="grid-cols-1 lg:grid-cols-3">

<!-- Mobile: py-12, Desktop: py-20 -->
<section class="py-12 lg:py-20">
```

### Touch Targets

- **Minimum**: 44×44px (iOS guideline)
- **Recommended**: 48×48px (Material Design)
- **Buttons**: Default `py-4` (16px) + text = ~48px

---

## 🎭 Design Tokens (Summary)

```css
/* Colors */
--color-primary: #171717      (neutral-900)
--color-background: #ffffff
--color-accent: #dc2626       (accent-600)

/* Typography */
--font-sans: system-ui
--font-size-display: 4.5rem
--font-size-body: 1rem

/* Spacing */
--spacing-section: 5rem       (py-20)
--spacing-component: 2rem     (gap-8)

/* Transitions */
--transition-fast: 200ms
--transition-base: 300ms
--transition-slow: 600ms
```

---

## 🎓 Design Principles

1. **Clarity**: Every pixel has a purpose
2. **Hierarchy**: Clear visual order
3. **Consistency**: Predictable patterns
4. **Restraint**: Less is more
5. **Quality**: Premium feel without pretense

---

**Last Updated**: February 2026  
**Version**: 1.0
