import Link from 'next/link'
import {
  BookOpen,
  Cpu,
  Keyboard,
  Lightbulb,
  Rocket,
  Users,
  Wrench,
  Star,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  Bot,
  Code2,
  MonitorSmartphone,
  Braces,
  FileCode2,
  Database,
  Atom,
  Workflow,
  Smartphone,
  Layers,
  Boxes,
  Server,
  ShieldCheck,
  GitBranch,
  Cloud,
  Terminal,
  Figma,
  Palette,
} from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/animation/Reveal'
import LazyFadeImage from '@/components/animation/LazyFadeImage'

export const metadata = {
  title: 'Chakraphop | Desktop Accessories + Programming Academy',
  description: 'Premium desk setups, programming courses, and developer tools merged into one ecosystem.',
}

const offerings = [
  {
    icon: BookOpen,
    title: 'Online Programming Courses',
    description:
      'Learn web development with project-based learning, hands-on coding tutorials, and real production workflows.',
    ctaLabel: 'Browse Courses',
    href: '/tech/courses',
  },
  {
    icon: Keyboard,
    title: 'Desktop Accessories Store',
    description:
      'Mechanical keyboards, monitor lights, and setup gear built for developers and creators who value flow and focus.',
    ctaLabel: 'Shop Accessories',
    href: '/tech/store',
  },
  {
    icon: Wrench,
    title: 'Developer Services',
    description:
      'Custom web systems, business automation, and scalable technical solutions for teams and modern startups.',
    ctaLabel: 'Explore Services',
    href: '#services',
  },
]

const featuredCourses = [
  {
    title: 'Node.js API Engineering Bootcamp',
    instructor: 'Lin Nguyen',
    rating: 4.9,
    price: 79,
    originalPrice: 149,
    lessons: 24,
    level: 'Intermediate',
    href: '/tech/courses/nodejs-api-engineering-bootcamp',
    bg: 'from-cyan-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70',
  },
  {
    title: 'React Frontend Patterns for Commerce Apps',
    instructor: 'Chakraphop Academy',
    rating: 4.8,
    price: 199,
    originalPrice: 299,
    students: 1240,
    lessons: 18,
    level: 'Advanced',
    href: '/tech/courses/react-frontend-patterns-for-commerce-apps',
    bg: 'from-indigo-500 to-violet-600',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=70',
  },
  {
    title: 'System Design for Product Developers',
    instructor: 'Senior Mentors',
    rating: 4.9,
    price: 99,
    originalPrice: 199,
    lessons: 30,
    level: 'Advanced',
    href: '/tech/courses',
    bg: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=70',
  },
]

const deskProducts = [
  {
    name: 'Keychron K8 Pro Hot-Swap Keyboard',
    price: 109.99,
    originalPrice: 149.99,
    tag: 'Best Seller',
    href: '/tech/store/keychron-k8-pro-hot-swap-keyboard',
    accent: 'bg-cyan-100 text-cyan-800',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=70',
  },
  {
    name: 'BenQ ScreenBar Halo Monitor Light',
    price: 159.0,
    originalPrice: 199.0,
    tag: 'Focus Gear',
    href: '/tech/store/benq-screenbar-halo-monitor-light',
    accent: 'bg-amber-100 text-amber-800',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=70',
  },
  {
    name: 'Developer Desk Starter Set',
    price: 249.0,
    originalPrice: 349.0,
    tag: 'Bundle',
    href: '/tech/store',
    accent: 'bg-emerald-100 text-emerald-800',
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=70',
  },
]

const advantages = [
  'Practical programming education with real workflows',
  'Tools and products designed for developers',
  'Premium desk accessories for better focus',
  'Real-world coding projects and portfolio outcomes',
  'Community-based learning and mentorship',
]

const learningPath = [
  {
    title: 'Learn Programming Fundamentals',
    description: 'Master core concepts in JavaScript, backend APIs, and frontend architecture.',
    icon: Code2,
  },
  {
    title: 'Build Real Projects',
    description: 'Ship practical applications with structured sections, lessons, and milestones.',
    icon: Rocket,
  },
  {
    title: 'Upgrade Your Workspace',
    description: 'Use ergonomic and productivity-focused accessories to sustain deep work.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Become a Professional Developer',
    description: 'Grow through advanced courses, collaboration, and career-oriented execution.',
    icon: Cpu,
  },
]

const blogPosts = [
  {
    category: 'Coding Tips',
    title: 'How to Structure Scalable Express APIs in 2026',
    href: '#blog',
  },
  {
    category: 'Productivity',
    title: 'Desk Setup Habits That Improve Developer Focus',
    href: '#blog',
  },
  {
    category: 'Learning Guide',
    title: 'A 90-Day Roadmap to Become a Job-Ready Web Developer',
    href: '#blog',
  },
]

const testimonials = [
  {
    name: 'Socheat R.',
    role: 'Frontend Student',
    quote:
      'The projects are practical and the course flow keeps me consistent. I went from tutorials to shipping real features.',
  },
  {
    name: 'Dara V.',
    role: 'Desk Setup Customer',
    quote:
      'I upgraded my keyboard and monitor light here. The quality is excellent and my workflow is noticeably better.',
  },
  {
    name: 'Malis T.',
    role: 'Freelance',
    stars: 5,
    content:
      'Chakraphop combines learning and gear in one ecosystem. It feels built for developers, not generic e-commerce.',
    author: 'Sarah Jenkins',
    title: 'Senior Frontend Engineer',
  },
]

const heroLanguageChips = [
  { label: 'Flutter', icon: Smartphone, x: 4, y: 14, delay: 0, duration: 8.2 },
  { label: 'Dart', icon: Braces, x: 16, y: 8, delay: 500, duration: 7.6 },
  { label: 'Swift', icon: FileCode2, x: 28, y: 16, delay: 900, duration: 8.7 },
  { label: 'SwiftUI', icon: Layers, x: 41, y: 5, delay: 1300, duration: 7.8 },
  { label: 'UIKit', icon: Boxes, x: 54, y: 12, delay: 1700, duration: 8.9 },
  { label: 'Vue 3', icon: Atom, x: 68, y: 6, delay: 2100, duration: 7.7 },
  { label: 'React', icon: Atom, x: 92, y: 4, delay: 2500, duration: 8.6 },
  { label: 'Vite', icon: Rocket, x: 86, y: 20, delay: 2900, duration: 7.9 },
  { label: 'Backend', icon: Server, x: 2, y: 42, delay: 4100, duration: 8.4 },
  { label: 'Node.js', icon: Workflow, x: 92, y: 42, delay: 4500, duration: 7.8 },
  { label: 'Laravel', icon: Code2, x: 19, y: 32, delay: 4900, duration: 8.5 },
  { label: 'REST', icon: Server, x: 27, y: 84, delay: 5300, duration: 7.6 },
  { label: 'Auth/JWT', icon: ShieldCheck, x: 36, y: 70, delay: 5700, duration: 8.3 },
  { label: 'MySQL', icon: Database, x: 51, y: 92, delay: 6100, duration: 7.7 },
  { label: 'Git', icon: GitBranch, x: 66, y: 80, delay: 6500, duration: 8.9 },
  { label: 'CI/CD', icon: Workflow, x: 6, y: 91, delay: 6900, duration: 7.4 },
  { label: 'Docker', icon: Boxes, x: 91, y: 72, delay: 7300, duration: 8.1 },
  { label: 'AWS', icon: Cloud, x: 50, y: 50, delay: 7700, duration: 7.6 },
  { label: 'Linux', icon: Terminal, x: 88, y: 88, delay: 8100, duration: 8.6 },
  { label: 'Figma', icon: Figma, x: 74, y: 96, delay: 8500, duration: 7.7 },
]

export default function TechLandingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 hero-cinematic bg-[radial-gradient(circle_at_0%_0%,#d9f5ff_0%,#edf8ff_30%,#ffffff_62%)]">
        <section className="container-section py-20 lg:py-28 relative overflow-hidden">
          {heroLanguageChips.map((chip) => (
            <div
              key={chip.label}
              className="hero-chip"
              aria-hidden="true"
              style={{
                '--chip-x': `${chip.x}%`,
                '--chip-y': `${chip.y}%`,
                '--chip-delay': `${chip.delay}ms`,
                '--chip-duration': `${chip.duration}s`,
              }}
            >
              <chip.icon className="w-3.5 h-3.5" />
              <span>{chip.label}</span>
            </div>
          ))}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Reveal variant="mask">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-700 mb-5">Tech learning + commerce ecosystem</p>
              </Reveal>
              <Reveal variant="mask" delay={80}>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl text-slate-900 text-balance">
                  Build Skills. Upgrade Your Setup. Create the Future.
                </h1>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-4 max-w-2xl text-lg text-slate-700">
                  Chakraphop combines programming education, developer tools, and premium desktop accessories so builders can learn faster, work better, and ship confidently.
                </p>
              </Reveal>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/tech/courses" className="btn btn-primary rounded-xl px-7 py-3">
                  Browse Courses
                </Link>
                <Link href="/tech/store" className="btn btn-secondary rounded-xl px-7 py-3 border-slate-900">
                  Shop Accessories
                </Link>
                <a href="#community" className="btn btn-ghost rounded-xl px-7 py-3 border border-slate-300 bg-white">
                  Explore Tech Community
                </a>
              </div>
            </div>

            <Reveal className="relative" delay={180}>
              <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-7 float-soft card-cinematic">
                <div className="rounded-2xl bg-slate-950 p-5 text-cyan-300 font-mono text-sm leading-7 overflow-hidden">
                  <p>{`> npm run build-future`}</p>
                  <p className="text-cyan-100">Compiling skill stack...</p>
                  <p>{`✓ API Engineering`}</p>
                  <p>{`✓ Frontend Systems`}</p>
                  <p>{`✓ Desk Productivity`}</p>
                  <p className="text-emerald-300">Launch ready.</p>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-cyan-50 p-3">
                    <BookOpen className="w-5 h-5 text-cyan-700 mx-auto" />
                    <p className="mt-2 text-xs font-semibold text-slate-800">Courses</p>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-3">
                    <Keyboard className="w-5 h-5 text-indigo-700 mx-auto" />
                    <p className="mt-2 text-xs font-semibold text-slate-800">Gear</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <Bot className="w-5 h-5 text-emerald-700 mx-auto" />
                    <p className="mt-2 text-xs font-semibold text-slate-800">Services</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-md float-soft">
                <p className="text-xs text-slate-500">Active learners</p>
                <p className="text-xl font-bold text-slate-900">12.8k+</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">What we offer</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">One platform. Three growth engines.</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 stagger-children">
              {offerings.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover-lift card-cinematic">
                  <item.icon className="w-7 h-7 text-cyan-700" />
                  <h3 className="text-xl font-semibold text-slate-900 mt-4">{item.title}</h3>
                  <p className="mt-3 text-slate-700 text-sm leading-6">{item.description}</p>
                  <Link href={item.href} className="inline-flex items-center gap-2 mt-6 text-cyan-700 font-semibold hover:text-cyan-900">
                    {item.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24" id="featured-courses">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">Featured courses</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Popular programs for modern developers</h2>
              </div>
              <Link href="/tech/courses" className="link-accent font-semibold">View all courses</Link>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
              {featuredCourses.map((course) => (
                <article key={course.title} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm card-cinematic course-card">
                  <div className="relative h-40 p-5 text-white flex items-end product-media">
                    <LazyFadeImage src={course.image} alt={course.title} className="absolute inset-0" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.bg} opacity-70`} />
                    <div className="relative z-10 flex justify-between w-full items-center">
                      <span className="text-xs uppercase tracking-[0.15em]">{course.level}</span>
                      {course.originalPrice && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 leading-snug">{course.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">Instructor: {course.instructor}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-sm font-semibold text-slate-800">{course.rating}</span>
                      </div>
                      <div className="text-right">
                        {course.originalPrice && (
                          <p className="text-xs text-slate-400 line-through">${course.originalPrice}</p>
                        )}
                        <p className="text-slate-900 font-bold">${course.price}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="progress-fill h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" style={{ width: `${Math.min(100, Math.round(course.rating * 20))}%` }} />
                    </div>
                    <div className="mt-5">
                      <Link href={course.href} className="btn btn-primary rounded-xl w-full py-2.5">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24" id="products">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">Desk setup products</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Top accessories for focus and flow</h2>
              </div>
              <Link href="/tech/store" className="link-accent font-semibold">View store</Link>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
              {deskProducts.map((product) => (
                <article key={product.name} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm card-cinematic">
                  <div className="relative h-44 p-5 flex items-start justify-between product-media">
                    <LazyFadeImage src={product.image} alt={product.name} className="absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10" />
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${product.accent}`}>{product.tag}</span>
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md w-fit shadow-lg shadow-red-500/20">
                          Save ${Math.floor(product.originalPrice - product.price)}
                        </span>
                      )}
                    </div>
                    <Cpu className="relative z-10 w-6 h-6 text-white/90" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                    <div className="mt-3 flex items-center gap-3">
                      <p className="text-xl font-bold text-slate-900">${product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-slate-400 line-through">${product.originalPrice}</p>
                      )}
                    </div>
                    <Link href={product.href} className="mt-5 btn btn-secondary rounded-xl w-full py-2.5 border-slate-900 inline-flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24">
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-10 md:p-14 text-white">
              <p className="text-sm uppercase tracking-[0.15em] text-cyan-300">Why choose us</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">Built for practical growth, not passive learning.</h2>
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {advantages.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5" />
                    <p className="text-slate-100 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24" id="learning-path">
            <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">Learning path</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">From beginner to professional in four steps</h2>
            <div className="mt-9 grid md:grid-cols-2 xl:grid-cols-4 gap-5 stagger-children">
              {learningPath.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 relative shadow-sm card-cinematic">
                  <span className="absolute -top-3 left-5 bg-cyan-700 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {index + 1}
                  </span>
                  <step.icon className="w-6 h-6 text-cyan-700 mt-3" />
                  <h3 className="text-lg font-semibold text-slate-900 mt-4">{step.title}</h3>
                  <p className="text-sm text-slate-700 mt-2 leading-6">{step.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24" id="community">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">Community</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Learn with a developer community that builds together</h2>
                  <p className="text-slate-700 mt-4">
                    Join discussion groups, collaborate on coding projects, and access curated tech learning resources from mentors and peers.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href="#" className="btn btn-primary rounded-xl px-6 py-3">Join Community</a>
                    <Link href="/tech/courses" className="btn btn-secondary rounded-xl px-6 py-3 border-slate-900">Start Learning</Link>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 stagger-children">
                  <div className="rounded-xl bg-cyan-50 p-5 card-cinematic">
                    <Users className="w-6 h-6 text-cyan-700" />
                    <p className="mt-3 font-semibold text-slate-900">Discussion Groups</p>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-5 card-cinematic">
                    <Code2 className="w-6 h-6 text-indigo-700" />
                    <p className="mt-3 font-semibold text-slate-900">Code Collaboration</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-5 card-cinematic">
                    <Lightbulb className="w-6 h-6 text-emerald-700" />
                    <p className="mt-3 font-semibold text-slate-900">Learning Resources</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-5 card-cinematic">
                    <Rocket className="w-6 h-6 text-amber-700" />
                    <p className="mt-3 font-semibold text-slate-900">Career Momentum</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24" id="blog">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">Content & tech blog</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Tutorials, inspiration, and developer insights</h2>
              </div>
              <Link href="/blog" className="link-accent font-semibold">Read all posts</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6 stagger-children">
              {blogPosts.map((post) => (
                <article key={post.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover-lift card-cinematic">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cyan-700">{post.category}</p>
                  <h3 className="text-xl font-semibold text-slate-900 mt-3">{post.title}</h3>
                  <a href={post.href} className="inline-flex items-center gap-2 mt-5 text-cyan-700 font-semibold hover:text-cyan-900">
                    Explore article
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="container-section pb-20 lg:pb-24">
            <p className="text-sm uppercase tracking-[0.15em] text-cyan-700">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Trusted by students, customers, and developers</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6 stagger-children">
              {testimonials.map((item) => (
                <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm card-cinematic">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-700 leading-7">"{item.quote || item.content}"</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <section className="container-section pb-16">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-700 p-10 md:p-14 text-white">
            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl text-balance">Start your developer journey today.</h2>
            <p className="mt-4 text-cyan-100 max-w-2xl">
              Learn practical coding, build your dream setup, and grow with a community focused on real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/tech/courses" className="btn rounded-xl px-7 py-3 bg-white text-slate-900 hover:bg-slate-100">
                Browse Courses
              </Link>
              <Link href="/tech/store" className="btn rounded-xl px-7 py-3 bg-slate-900 text-white hover:bg-slate-800">
                Shop Accessories
              </Link>
              <a href="#community" className="btn rounded-xl px-7 py-3 border border-white/70 text-white hover:bg-white/10">
                Join Community
              </a>
            </div>
          </div>
        </section>

        <section className="container-section pb-20" id="services">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">Developer Services</h3>
            <p className="text-slate-700 mt-3 max-w-2xl">
              Need a custom platform, automation system, or full-stack product support? We partner with teams to design and ship scalable digital systems.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-700">
              <span className="px-3 py-1 rounded-full bg-slate-100">Web Development</span>
              <span className="px-3 py-1 rounded-full bg-slate-100">Custom Systems</span>
              <span className="px-3 py-1 rounded-full bg-slate-100">Business Automation</span>
            </div>
          </div>
        </section>

        <section className="container-section pb-24">
          <div className="bg-slate-50 p-6 rounded-lg shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Chakraphop Site Map</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="font-semibold text-slate-900 mb-3">About Us</p>
                <Link href="/about" className="block text-slate-600 hover:text-slate-900">Our Story</Link>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-3">Courses</p>
                <Link href="/tech/courses" className="block text-slate-600 hover:text-slate-900">Browse Programs</Link>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-3">Shop</p>
                <Link href="/tech/store" className="block text-slate-600 hover:text-slate-900">Accessories Store</Link>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-3">Developer Services</p>
                <a href="#services" className="block text-slate-600 hover:text-slate-900">Solutions</a>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-3">Blog</p>
                <a href="#blog" className="block text-slate-600 hover:text-slate-900">Tech Articles</a>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg shadow-sm border border-slate-100">
                <h4 className="text-slate-900 font-bold mb-2">Need Help?</h4>
                <a href="mailto:support@chakraphop.dev" className="block text-slate-600 hover:text-slate-900">support@chakraphop.dev</a>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-3">Social</p>
                <p className="text-slate-600">Twitter • YouTube • LinkedIn</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
