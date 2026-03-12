# Motion Design Strategy

## Philosophy

Animation serves three purposes:
1. **Feedback** - Let users know their actions registered
2. **Guidance** - Direct attention to important content
3. **Confidence** - Convey a polished, premium brand

### Core Principle
**Restrained elegance over flashy effects**

Like Apple: invisible until needed, then perfect.  
Like Nike: confident, energetic, but purposeful.

---

## Motion Tokens

### Timing (Durations)
```javascript
// Micro-interactions (instant feedback)
MICRO: 150ms      // Button press, hover effects

// Standard (most animations)
FAST: 200ms       // Page enters, items fade in

// Deliberate (emphasis)
MEDIUM: 300ms     // Hero section, important content

// Slow (rarely used)
SLOW: 500ms       // Large layout changes
```

**Rule**: Shorter is better. Users should not wait for animation.

### Easing

```javascript
// Ease In (start slow, accelerate)
EASE_IN: "easeIn"
Use for: Elements exiting/shrinking

// Ease Out (start fast, decelerate)  
EASE_OUT: "easeOut"
Use for: Elements entering/growing

// Ease In Out (smooth both ends)
EASE_IN_OUT: "easeInOut"
Use for: Subtle transitions

// Linear (constant speed)
LINEAR: "linear"
Use for: Loading indicators, rotations
```

**CSS Equivalent**:
```css
cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* easeInOut */
cubic-bezier(0.12, 0.4, 0.29, 0.95)   /* easeOut */
cubic-bezier(0.32, 0, 0.67, 0)        /* easeIn */
```

### Effects

#### Fade
```
opacity: 0 → 1
Duration: 200ms
Easing: easeOut
Use: Content appearing, pages entering
```

#### Slide
```
transform: translateY/X
Duration: 200-300ms  
Easing: easeOut
Use: Hero sections, modals, menus
```

#### Scale
```
transform: scale
Duration: 150-200ms
Easing: easeOut
Use: Button press, card hover, attention-drawing
```

#### Stagger
```
Sequence child animations with delay
Delay: 50-100ms between children
Use: List items, product grids
```

---

## Animation Inventory

### PAGE LAYER (Whole page transitions)
| Component | Animation | Duration | Easing | Purpose |
|-----------|-----------|----------|--------|---------|
| Page Enter | Fade in | 200ms | easeOut | Show new page is loading |
| Page Exit | Fade out | 150ms | easeIn | Visual continuity |
| Layout Shift | None (prevent CLS) | - | - | Maintain stability |

### SECTION LAYER (Hero, featured, content blocks)
| Component | Animation | Duration | Easing | Purpose |
|-----------|-----------|----------|--------|---------|
| Hero Title | Fade + Slide | 300ms | easeOut | Grab attention |
| Hero Description | Fade | 250ms | easeOut | Content reveal |
| Featured Section | Stagger children | 200ms + 60ms delay | easeOut | Draw eye down |

### COMPONENT LAYER (Buttons, cards, forms)
| Component | Animation | Duration | Easing | Purpose |
|-----------|-----------|----------|--------|---------|
| Button Hover | Scale + Opacity | 150ms | easeOut | Feedback |
| Button Press | Scale | 100ms | easeIn | Click feedback |
| Card Hover | Shadow + Scale | 150ms | easeOut | Depth perception |
| Link Hover | Color + Underline | 150ms | easeOut | Interactivity |

### INTERACTION LAYER (Forms, state changes)
| Component | Animation | Duration | Easing | Purpose |
|-----------|-----------|----------|--------|---------|
| Success Message | Slide in + Fade | 200ms | easeOut | Confirmation |
| Error Message | Shake + Pulse | 300ms | easeOut | Alert |
| Loading Skeleton | Pulse | Looping | linear | Indicate loading |
| Cart Badgebadge Update | Scale + Pulse | 200ms | easeOut | Attract attention |

### MICRO INTERACTIONS (Immediate feedback)
| Component | Animation | Duration | Easing | Purpose |
|-----------|-----------|----------|--------|---------|
| Add to Cart | Bounce | 300ms | easeOut | Confirmation |
| Wishlist Toggle | Heart pop | 200ms | easeOut | Action feedback |
| Quantity Change | Fade | 100ms | easeOut | State change |
| Filter Apply | Fade in results | 200ms | easeOut | New data |

---

## Accessibility Compliance

### prefers-reduced-motion

For users who prefer reduced motion, provide:
- 0ms duration (instant)
- No complex sequences
- OR minimal fade only

```javascript
const duration = prefersReducedMotion ? 0 : 200
const shouldAnimate = !prefersReducedMotion
```

### Screen Readers
- Animations should NOT change meaning
- Content must load immediately
- Motion is progressive enhancement only

### Keyboard Users
- Animations should NOT prevent keyboard navigation
- Focus should be visible and animatable
- No hover-only information

---

## Performance Considerations

### DO ✅
- Use `transform` and `opacity` (GPU accelerated)
- Animate only when needed
- Use `will-change` sparingly
- Stop animations when not visible
- Use CSS variables for consistency

### DON'T ❌
- Animate `width`, `height`, `left`, `top` (causes reflow)
- Animate `color` (respects brand but expensive)
- Loop animations continuously
- Create too many simultaneous animations
- Block user interaction during animation

### Optimization
```javascript
// Good - GPU accelerated
transform: translateX()
opacity: 0 → 1
filter: blur()

// Avoid - causes reflow
width, height, left, top, margin, padding
```

---

## Animation Categories

### 1. PAGE TRANSITIONS
**When**: User navigates between pages  
**Goal**: Visual continuity  
**Implementation**: Layout-level component wrapping pages  
**Duration**: 150-200ms  

```
Current page: fade out (150ms)
↓ (invisible gap ~50ms)
Next page: fade in (200ms)
```

### 2. HERO SECTION ENTRANCE
**When**: Page loads  
**Goal**: Grab attention professionally  
**Implementation**: Staggered children  
**Duration**: 200-300ms with 50-100ms stagger  

```
1. Title: fade + slide up (200ms)
2. Description: fade (200ms, delay 50ms)
3. CTA Button: scale in (200ms, delay 100ms)
```

### 3. CONTENT REVEAL
**When**: Section comes into view  
**Goal**: Guide reading flow  
**Implementation**: Section component with intersection observer  
**Duration**: 200ms fade per item, 60ms stagger  

```
Item 1: fade in (200ms)
Item 2: fade in (200ms, delay 60ms)
Item 3: fade in (200ms, delay 120ms)
```

### 4. INTERACTIVE FEEDBACK
**When**: User hovers, clicks, or types  
**Goal**: Confirm interaction was registered  
**Implementation**: CSS/Framer hover/tap states  
**Duration**: 150ms (hover), 100ms (press)  

```
Hover: scale 1 → 1.05
Press: scale 1 → 0.95
```

### 5. STATE CHANGES
**When**: Data loads, form validates, notification arrives  
**Goal**: User understands what changed  
**Implementation**: Conditional animations  
**Duration**: 200ms fade/slide  

```
Success: slide in from right
Error: fade in with shake
Loading: pulse outline
```

---

## Implementation Layers

### Layer 1: Foundation
```javascript
// Motion config (tokens)
// Motion hooks (utilities)
// Motion components (wrappers)
```

### Layer 2: Pages
```javascript
// <PageTransition> wrapper
// Hero entrance animations
// Section reveal on scroll
```

### Layer 3: Components
```javascript
// <AnimatedButton>
// <AnimatedCard>
// <AnimatedLink>
// <FeedbackMessage>
```

### Layer 4: Micro-interactions
```javascript
// Hover states
// Press states
// Toggled states
// Load states
```

---

## Motion Design Patterns

### Pattern 1: Entrance
```
Initial: opacity: 0, transform: translateY(20px)
Animate: opacity: 1, transform: translateY(0)
Duration: 200ms, easing: easeOut
```
**Use for**: Page load, modal appear, list items

### Pattern 2: Exit
```
Initial: opacity: 1, transform: translateY(0)
Animate: opacity: 0, transform: translateY(20px)
Duration: 150ms, easing: easeIn
```
**Use for**: Page unload, modal close, dismissal

### Pattern 3: Hover (Interactive)
```
Initial: scale: 1
Animate: scale: 1.05
Duration: 150ms, easing: easeOut
Reverse on mouse leave
```
**Use for**: Buttons, cards, links

### Pattern 4: Press (Tactile)
```
Initial: scale: 1
Animate: scale: 0.95
Duration: 100ms, easing: easeIn
Reverse on release
```
**Use for**: Button clicks, interactive feedback

### Pattern 5: Success
```
1. Slide in: translateX(0) from right
2. Optional: scale pulse
Duration: 200ms + optional 150ms pulse
```
**Use for**: Success messages, confirmations

### Pattern 6: Error
```
1. Shake: translateX alternating ±10px
2. Fade: grow opacity
Duration: 300ms (shake) + 200ms (fade)
```
**Use for**: Error messages, validation

### Pattern 7: Loading
```
Pulse: opacity 0.5 → 1 → 0.5
Duration: 1000ms, loop indefinite
Linear easing
```
**Use for**: Skeleton loaders, loading indicators

### Pattern 8: Stagger (Sequence)
```
Each child: offset delay += 50-100ms
Total cascade visible
Feels like coordinated motion
```
**Use for**: Product grids, list items, navigation

---

## Duration Guidelines

| Interaction Type | Duration | Reason |
|-----------------|----------|--------|
| Micro (press) | 100-150ms | Feels instant |
| Short (fade) | 150-200ms | Noticeable but quick |
| Standard (entrance) | 200-300ms | Time to appreciate |
| Stagger per item | 50-100ms | Smooth cascade |
| Loading pulse | 1000ms | Hypnotic loop |
| Page transition | 150-200ms | Quick visual bridge |

**Rule of thumb**: If user waits more than 300ms noticing animation, it's too slow.

---

## Easing Guidance

| Easing | Feel | Use Case |
|--------|------|----------|
| easeOut | Fast start, smooth end | Things appearing, growing |
| easeIn | Smooth start, fast end | Things exiting, shrinking |
| easeInOut | Balanced | Continuous interactions |
| linear | Constant | Loading, rotation |

**Remember**: easeOut feels most premium. Use 70% of the time.

---

## What NOT to Animate

❌ **Avoid**:
- Page background colors (unless intentional)
- Font sizes (causes reflow)
- Border radius (expensive)
- Box shadows (on elements that move)
- Width/height of containers (use scale instead)
- Position changes (use transform instead)
- Continuous spinning/floating (distracting)
- Auto-playing videos or carousels (intrusive)

✅ **Safe to animate**:
- Opacity
- Transform (translate, scale, rotate)
- Filter effects
- Color (sparingly, brief)
- Shadow changes (on static elements)

---

## Motion Testing Checklist

Before shipping animations:

- [ ] Does animation serve a purpose?
- [ ] Does it feel premium or gimmicky?
- [ ] Is duration appropriate (150-300ms)?
- [ ] Does it work with prefers-reduced-motion?
- [ ] Does it block user interaction?
- [ ] Does it cause layout shift (CLS)?
- [ ] Does it perform at 60fps?
- [ ] Is it accessible (screen readers, keyboard)?
- [ ] Does it work on mobile/touch?
- [ ] Is it consistent with brand?

---

## Next Steps

1. Install Framer Motion
2. Create motion config and utilities
3. Build reusable animation components
4. Integrate into existing page components
5. Test on devices and browsers
6. Gather user feedback
7. Refine based on real usage

This strategy ensures animations feel intentional, perform well, and enhance (not distract from) the user experience.
