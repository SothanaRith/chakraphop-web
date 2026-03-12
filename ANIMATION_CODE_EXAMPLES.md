# Animation Code Examples by Component

## Quick Reference - Copy & Paste Ready

### Hero Section
```javascript
// Hero.js - Already implemented
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      ease: [0.12, 0.4, 0.29, 0.95],
    },
  },
}

<motion.div variants={containerVariants} initial="hidden" animate="show">
  <motion.h1 variants={itemVariants}>Built for Performance</motion.h1>
  <motion.p variants={itemVariants}>Description text</motion.p>
  <motion.div className="flex gap-4" variants={itemVariants}>
    <button>CTA 1</button>
    <button>CTA 2</button>
  </motion.div>
</motion.div>
```

### Product Card Grid
```javascript
// ProductCard.js - Already implemented
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.2 }}
>
  <motion.div whileHover={{ scale: 1.02 }}>
    <img src={image} alt={name} />
  </motion.div>
</motion.div>
```

### Button with Feedback
```javascript
// Button.js - Already implemented
import { motion } from 'framer-motion'

<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15, ease: [0.12, 0.4, 0.29, 0.95] }}
>
  Click Me
</motion.button>
```

---

## Implementation for Other Components

### 1. Category Showcase Section

**Use Case**: Display multiple category cards with staggered entrance

```javascript
// src/components/home/CategoryShowcase.js

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms between each category
      delayChildren: 0,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.12, 0.4, 0.29, 0.95],
    },
  },
}

export default function CategoryShowcase({ categories }) {
  return (
    <section className="section-spacing">
      <motion.div
        className="container-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="text-display-md mb-16">Shop by Category</h2>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/products/${category.slug}`}>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors" />
                  <h3 className="absolute inset-0 flex items-center justify-center text-heading-md text-white font-bold">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
```

### 2. Story/About Section

**Use Case**: Parallax-style reveal with text and image

```javascript
// src/components/home/StorySection.js

'use client'

import { motion } from 'framer-motion'

export default function StorySection() {
  return (
    <section className="section-spacing bg-neutral-50">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/story.jpg"
              alt="Our story"
              className="rounded-lg"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-display-md mb-6">Our Story</h2>
            <p className="text-body-lg text-neutral-600 mb-4">
              Since 2010, we've been crafting premium athletic wear...
            </p>
            <p className="text-body-lg text-neutral-600">
              Our commitment remains unchanged: performance, style, sustainability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### 3. Features List

**Use Case**: Icons with titles and descriptions in a staggered grid

```javascript
// src/components/home/Features.js

'use client'

import { motion } from 'framer-motion'
import { Award, Truck, RefreshCw, Shield } from 'lucide-react'

const features = [
  { icon: Award, title: 'Premium Quality', description: 'Crafted from finest materials' },
  { icon: Truck, title: 'Fast Shipping', description: 'Delivered in 2-3 business days' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy' },
  { icon: Shield, title: 'Secure Payment', description: 'Protected transactions' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.12, 0.4, 0.29, 0.95],
    },
  },
}

export default function Features() {
  return (
    <section className="section-spacing bg-white">
      <motion.div
        className="container-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={index} variants={featureVariants}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="inline-block p-3 bg-neutral-100 rounded-lg mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-6 h-6 text-neutral-900" />
                  </motion.div>
                  <h3 className="text-heading-sm font-semibold mb-2">{feature.title}</h3>
                  <p className="text-body-sm text-neutral-600">{feature.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
```

### 4. Product Filters (Collapsible)

**Use Case**: Filters that slide open/close with smooth animation

```javascript
// src/components/product/ProductFilters.js

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function ProductFilters() {
  const [expandedFilter, setExpandedFilter] = useState('category')

  const filterGroups = [
    {
      id: 'category',
      name: 'Category',
      options: ['All', 'Running', 'Training', 'Essentials'],
    },
    {
      id: 'size',
      name: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'price',
      name: 'Price',
      options: ['Under $50', '$50-$100', '$100-$150', 'Over $150'],
    },
  ]

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.15 },
    },
  }

  return (
    <div className="space-y-4">
      {filterGroups.map((group) => (
        <div key={group.id} className="border border-neutral-200 rounded-lg">
          {/* Header */}
          <button
            onClick={() =>
              setExpandedFilter(
                expandedFilter === group.id ? null : group.id
              )
            }
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50"
          >
            <span className="font-semibold text-neutral-900">{group.name}</span>
            <motion.div
              animate={{ rotate: expandedFilter === group.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          {/* Content */}
          <AnimatePresence>
            {expandedFilter === group.id && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="border-t border-neutral-200 px-4 py-3 space-y-2"
              >
                {group.options.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      defaultChecked={option === 'All'}
                    />
                    <span className="text-body">{option}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

### 5. Contact Form with Validation

**Use Case**: Form with field validation animations and success/error states

```javascript
// src/app/contact/page.js

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { FormSuccess, FormError } from '@/components/ui/FormStatus'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState(null) // 'loading', 'success', 'error', null
  const [errors, setErrors] = useState({})

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
    }, 1500)
  }

  return (
    <section className="section-spacing bg-white">
      <motion.div
        className="container-section max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-display-md mb-4">Get in Touch</h1>
          <p className="text-body-lg text-neutral-600">
            We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-body font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-body font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
          </motion.div>

          {/* Message Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-body font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
              required
            />
          </motion.div>

          {/* Status Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: status ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {status === 'success' && (
              <FormSuccess message="Message sent! We'll get back to you soon." />
            )}
            {status === 'error' && (
              <FormError message="Something went wrong. Please try again." />
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="pt-4"
          >
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  )
}
```

### 6. Mobile Menu Animation

**Use Case**: Mobile navigation drawer with smooth slide and fade

```javascript
// Update to Navigation.js mobileMenuOpen state

import { AnimatePresence, motion } from 'framer-motion'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuVariants = {
    hidden: {
      x: '-100%',
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.12, 0.4, 0.29, 0.95],
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <nav>
      {/* Existing nav code */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 left-0 h-full w-64 bg-white z-50 lg:hidden"
            >
              <motion.div
                className="p-6 space-y-4"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    variants={itemVariants}
                    className="block text-body font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
```

### 7. Testimonials Carousel

**Use Case**: Rotating testimonials with fade transition

```javascript
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Professional Athlete',
    quote: 'The best performance wear I've ever used.',
    image: '/testimonials/sarah.jpg',
  },
  // ... more testimonials
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-spacing">
      <div className="container-section max-w-3xl mx-auto text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-heading-lg text-neutral-600 mb-6 italic">
              "{testimonials[current].quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-neutral-900">
                  {testimonials[current].name}
                </p>
                <p className="text-caption text-neutral-500">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current ? 'bg-neutral-900' : 'bg-neutral-300'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Performance Tips

### ✅ DO
- Use `whileInView` with `viewport={{ once: true }}`
- Combine multiple transforms in one `animate` prop
- Use `transition={{ duration: 0.3 }}` for most animations
- Stagger with `staggerChildren: 0.05` (50ms)

### ❌ DON'T
- Animate `width`, `height`, or `left`/`right`
- Use `duration: 1` or higher without good reason
- Animate on `every` scroll (use `once: true`)
- Chain complex calculations in motion values

### Testing
```bash
# Check performance in Chrome DevTools
1. Open DevTools → Performance tab
2. Record while scrolling through page
3. Look for solid 60fps (no drops)
4. Check paint (green) vs composite (purple)
```

---

## Deployment Checklist

- [ ] Test on low-end device (Moto G4)
- [ ] Check with `prefers-reduced-motion` enabled
- [ ] Run Lighthouse audit (should be 90+)
- [ ] Test on slow 4G network
- [ ] Verify no accessibility issues
- [ ] Check all page transitions smooth
- [ ] Test on iOS Safari
- [ ] Verify Android Chrome smooth

Ready to implement! 🎬
