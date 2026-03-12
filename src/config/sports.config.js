/**
 * Sport Configuration
 * Central configuration for all sports, categories, and featured sections
 * Single source of truth for navigation and routing
 */

import { 
  Zap, 
  Footprints, 
  Dribble, 
  Dumbbell, 
  Trophy,
  Star,
  TrendingUp,
  Sparkles,
  Crown,
  Target
} from 'lucide-react'

// Sport Icons Map - Maps string identifiers to icon components
export const SPORT_ICONS = {
  footprints: Footprints,
  dribble: Dribble,
  dumbbell: Dumbbell,
  trophy: Trophy,
  target: Target,
  sparkles: Sparkles,
  zap: Zap
}

// Featured Icons Map (for Client Components)
export const FEATURED_ICONS = {
  star: Star,
  trendingUp: TrendingUp,
  trophy: Trophy,
  crown: Crown,
  target: Target,
  sparkles: Sparkles,
  zap: Zap
}

// Featured Sections Configuration
export const FEATURED_SECTIONS = [
  {
    id: 'highlights',
    name: 'Highlights',
    slug: 'highlights',
    path: '/sports/highlights',
    description: 'The best of the best across all sports',
    icon: 'star',
    badge: 'Featured'
  },
  {
    id: 'new',
    name: 'New in Sports',
    slug: 'new',
    path: '/sports/new',
    description: 'Latest drops and newest releases',
    icon: 'trendingUp',
    badge: 'New'
  },
  {
    id: 'bestseller',
    name: 'Bestseller',
    slug: 'bestseller',
    path: '/sports/bestseller',
    description: 'Top-performing products athletes love',
    icon: 'trophy',
    badge: 'Popular'
  },
  {
    id: 'locker-room',
    name: 'The Locker Room',
    slug: 'locker-room',
    path: '/sports/locker-room',
    description: 'Exclusive athlete collections and collaborations',
    icon: 'crown'
  },
  {
    id: 'jordan',
    name: 'Jordan Sport',
    slug: 'jordan',
    path: '/sports/jordan',
    description: 'Premium performance from the Jordan line',
    icon: 'crown',
    badge: 'Premium'
  },
  {
    id: 'hybrid-training',
    name: 'Hybrid Training',
    slug: 'hybrid-training',
    path: '/sports/hybrid-training',
    description: 'Cross-training gear for multi-sport athletes',
    icon: 'zap'
  }
]

// Core Sports Configuration
export const CORE_SPORTS = [
  {
    id: 'running',
    name: 'Running',
    slug: 'running',
    path: '/sports/running',
    description: 'Built for speed, distance, and every run in between',
    icon: 'footprints',
    heroImage: '/images/sports/running-hero.jpg',
    categories: [
      {
        id: 'all',
        name: 'All Running',
        slug: 'all',
        path: '/sports/running',
        description: 'Complete running collection'
      },
      {
        id: 'shoes',
        name: 'Shoes',
        slug: 'shoes',
        path: '/sports/running/shoes',
        description: 'Performance footwear for every run type'
      },
      {
        id: 'clothing',
        name: 'Clothing',
        slug: 'clothing',
        path: '/sports/running/clothing',
        description: 'Lightweight, breathable running apparel'
      },
      {
        id: 'accessories',
        name: 'Accessories',
        slug: 'accessories',
        path: '/sports/running/accessories',
        description: 'Essential running gear and accessories'
      }
    ],
    stats: {
      productsCount: 450,
      popularSize: 'M',
      avgPrice: 85
    }
  },
  {
    id: 'football',
    name: 'Football',
    slug: 'football',
    path: '/sports/football',
    description: 'Precision-engineered for the beautiful game',
    icon: 'dribble',
    heroImage: '/images/sports/football-hero.jpg',
    categories: [
      {
        id: 'all',
        name: 'All Football',
        slug: 'all',
        path: '/sports/football',
        description: 'Complete football collection'
      },
      {
        id: 'shoes',
        name: 'Shoes',
        slug: 'shoes',
        path: '/sports/football/shoes',
        description: 'Boots and cleats for every playing surface'
      },
      {
        id: 'clothing',
        name: 'Clothing',
        slug: 'clothing',
        path: '/sports/football/clothing',
        description: 'Jerseys, shorts, and training gear'
      },
      {
        id: 'accessories',
        name: 'Accessories',
        slug: 'accessories',
        path: '/sports/football/accessories',
        description: 'Shin guards, bags, and training equipment'
      }
    ],
    stats: {
      productsCount: 380,
      popularSize: 'L',
      avgPrice: 75
    }
  },
  {
    id: 'training',
    name: 'Training & Gym',
    slug: 'training',
    path: '/sports/training',
    description: 'Built to push limits and maximize performance',
    icon: 'dumbbell',
    heroImage: '/images/sports/training-hero.jpg',
    categories: [
      {
        id: 'all',
        name: 'All Training & Gym',
        slug: 'all',
        path: '/sports/training',
        description: 'Complete training collection'
      },
      {
        id: 'shoes',
        name: 'Shoes',
        slug: 'shoes',
        path: '/sports/training/shoes',
        description: 'Stable, supportive footwear for lifting and training'
      },
      {
        id: 'clothing',
        name: 'Clothing',
        slug: 'clothing',
        path: '/sports/training/clothing',
        description: 'Flexible, durable training apparel'
      },
      {
        id: 'accessories',
        name: 'Accessories',
        slug: 'accessories',
        path: '/sports/training/accessories',
        description: 'Gloves, belts, bags, and training essentials'
      }
    ],
    stats: {
      productsCount: 520,
      popularSize: 'L',
      avgPrice: 65
    }
  }
]

// More Sports Configuration
export const MORE_SPORTS = [
  {
    id: 'all',
    name: 'All Sports',
    slug: 'all',
    path: '/sports/all',
    description: 'Explore our complete sport collection',
    icon: 'trophy'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    slug: 'basketball',
    path: '/sports/basketball',
    description: 'Court-ready performance gear',
    icon: 'trophy',
    categories: ['shoes', 'clothing', 'accessories']
  },
  {
    id: 'tennis',
    name: 'Tennis',
    slug: 'tennis',
    path: '/sports/tennis',
    description: 'Precision gear for the court',
    icon: 'target',
    categories: ['shoes', 'clothing', 'accessories']
  },
  {
    id: 'golf',
    name: 'Golf',
    slug: 'golf',
    path: '/sports/golf',
    description: 'Performance-driven golf apparel',
    icon: 'target',
    categories: ['shoes', 'clothing', 'accessories']
  },
  {
    id: 'yoga',
    name: 'Yoga',
    slug: 'yoga',
    path: '/sports/yoga',
    description: 'Flexible, comfortable yoga essentials',
    icon: 'sparkles',
    categories: ['clothing', 'accessories']
  },
  {
    id: 'skateboarding',
    name: 'Skateboarding',
    slug: 'skateboarding',
    path: '/sports/skateboarding',
    description: 'Durable gear for street and park',
    icon: 'zap',
    categories: ['shoes', 'clothing', 'accessories']
  }
]

// All Sports Combined
export const ALL_SPORTS = [...CORE_SPORTS, ...MORE_SPORTS.filter(s => s.id !== 'all')]

// Category Configuration (applies to all sports)
export const STANDARD_CATEGORIES = [
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Performance footwear'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Athletic apparel'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential gear'
  }
]

// Utility Functions
export const getSportBySlug = (slug) => {
  return ALL_SPORTS.find(sport => sport.slug === slug)
}

export const getSportCategories = (sportSlug) => {
  const sport = getSportBySlug(sportSlug)
  return sport?.categories || STANDARD_CATEGORIES
}

export const getCategoryBySlug = (sportSlug, categorySlug) => {
  const categories = getSportCategories(sportSlug)
  return categories.find(cat => cat.slug === categorySlug)
}

export const getFeaturedBySlug = (slug) => {
  return FEATURED_SECTIONS.find(section => section.slug === slug)
}

export const isCoreSport = (slug) => {
  return CORE_SPORTS.some(sport => sport.slug === slug)
}

// Navigation Structure (for menu rendering)
export const SPORT_NAVIGATION = {
  featured: FEATURED_SECTIONS,
  core: CORE_SPORTS,
  more: MORE_SPORTS
}

export default {
  FEATURED_SECTIONS,
  CORE_SPORTS,
  MORE_SPORTS,
  ALL_SPORTS,
  STANDARD_CATEGORIES,
  SPORT_NAVIGATION,
  getSportBySlug,
  getSportCategories,
  getCategoryBySlug,
  getFeaturedBySlug,
  isCoreSport
}
