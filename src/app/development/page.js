'use client'

import Link from 'next/link'
import Reveal from '@/components/animation/Reveal'
import LazyFadeImage from '@/components/animation/LazyFadeImage'
import {
  Code2,
  Smartphone,
  Layout,
  Server,
  Network,
  Wrench,
  Search,
  PenTool,
  Terminal,
  Activity,
  Rocket,
  HeadphonesIcon,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Clock,
  Users,
  MapPin,
  Mail,
  MessageSquare,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    title: 'Web Application Development',
    description: 'Custom, scalable web applications built with modern frameworks to drive your business forward.',
    icon: Code2,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.',
    icon: Smartphone,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive, engaging, and beautiful product experiences.',
    icon: Layout,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    title: 'API Development',
    description: 'Robust, secure, and well-documented APIs to connect your systems and scale operations.',
    icon: Server,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    title: 'System Integration',
    description: 'Seamlessly connect third-party services and legacy systems into a unified platform.',
    icon: Network,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    title: 'Maintenance & Support',
    description: 'Ongoing support, performance monitoring, and updates to keep your software running smoothly.',
    icon: Wrench,
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
]

const processSteps = [
  { title: 'Requirement Analysis', description: 'Understanding your goals, users, and technical constraints.', icon: Search },
  { title: 'System Design', description: 'Architecting the solution and designing the user experience.', icon: PenTool },
  { title: 'Development', description: 'Writing clean, scalable code using modern technologies.', icon: Terminal },
  { title: 'Testing', description: 'Rigorous QA to ensure performance, security, and reliability.', icon: Activity },
  { title: 'Deployment', description: 'Smooth launch with zero downtime and continuous integration.', icon: Rocket },
  { title: 'Support', description: 'Post-launch monitoring, updates, and dedicated technical support.', icon: HeadphonesIcon },
]

const technologies = [
  { name: 'Vue.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg' },
  { name: 'Laravel', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg' },
  { name: 'Node.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
  { name: 'Flutter', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png' },
  { name: 'MySQL', logo: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg' },
  { name: 'Docker', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg' },
  { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
]

const portfolioProjects = [
  {
    title: 'E-Commerce Ecosystem',
    description: 'A scalable marketplace platform with real-time inventory and advanced analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    category: 'Web App',
  },
  {
    title: 'Fitness Tracking App',
    description: 'Cross-platform mobile app for workout planning, progress tracking, and community challenges.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    category: 'Mobile App',
  },
  {
    title: 'Logistics ERP System',
    description: 'Enterprise resource planning software for real-time fleet tracking and automated dispatch.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    category: 'SaaS',
  },
]

const whyChooseUs = [
  { title: 'Experienced Developers', icon: Users, desc: 'Our team consists of senior engineers who have shipped products for millions of users.' },
  { title: 'Clean & Scalable Code', icon: Code2, desc: 'We follow best practices and design patterns to ensure your software can grow with you.' },
  { title: 'Fast Delivery', icon: Zap, desc: 'Agile methodologies and automated pipelines ensure we ship high-quality features fast.' },
  { title: 'Modern Technologies', icon: Rocket, desc: 'We leverage the latest frameworks to build fast, secure, and future-proof applications.' },
  { title: 'Reliable Support', icon: ShieldCheck, desc: "We don't just build and leave. We provide ongoing maintenance and monitoring." },
]

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'CTO, LogiTech Solutions',
    content: 'Chakraphop delivered our ERP system ahead of schedule. The code quality is exceptional, and their communication throughout the process was incredible.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Founder, FitLife App',
    content: 'They transformed our vague idea into a polished, high-performing mobile app. The UX design process was collaborative and the final product exceeded expectations.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'David Rossi',
    role: 'Director of Ops, RetailCore',
    content: 'The API integration work they did saved us hundreds of hours of manual labor every month. A truly professional and capable development team.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
]

export default function DevelopmentServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pb-20 pt-16 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="container-section relative z-10 text-center max-w-4xl mx-auto px-4">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Professional Software <span className="text-cyan-400">Development Services</span>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              We build high-performance web applications, native mobile apps, and robust business systems tailored to accelerate your growth.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="btn btn-primary bg-cyan-500 hover:bg-cyan-600 border-none text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="btn btn-secondary border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 px-8 py-4 rounded-xl text-lg font-semibold transition-all w-full sm:w-auto text-center inline-flex items-center justify-center">
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="container-section py-20 lg:py-28" id="services">
        <div className="text-center md:text-left mb-12">
          <p className="text-sm uppercase tracking-[0.15em] text-cyan-600 font-semibold">Our Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Comprehensive Development Services</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 50}>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 h-full">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${service.bg} mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Our Process Section */}
      <section className="bg-white py-20 lg:py-28 border-y border-slate-200" id="process">
        <div className="container-section">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Development Process</h2>
            <p className="text-slate-600 mt-4 text-lg">A proven workflow from concept to deployment.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 50}>
                <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 h-full">
                  <span className="absolute -top-4 -right-4 text-6xl font-black text-slate-200 opacity-50">0{index + 1}</span>
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technologies We Use */}
      <section className="container-section py-20 lg:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Technologies We Use</h2>
          <p className="text-slate-600 mt-4 text-lg">We build with the modern stack for maximum performance and scalability.</p>
        </div>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {technologies.map(tech => (
              <div key={tech.name} className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-4 rounded-full shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tech.logo} alt={tech.name} className="w-6 h-6 object-contain" />
                <span className="font-semibold text-slate-800">{tech.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 5. Portfolio / Projects Section */}
      <section className="bg-slate-900 py-20 lg:py-28 text-white" id="portfolio">
        <div className="container-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-cyan-400 font-semibold mb-2">Featured Work</p>
              <h2 className="text-3xl md:text-4xl font-bold">Recent Projects</h2>
            </div>
            <button className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors inline-flex items-center gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, idx) => (
              <Reveal key={project.title} delay={idx * 100}>
                <div className="bg-slate-800 rounded-2xl overflow-hidden group border border-slate-700 hover:border-cyan-500/50 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-transparent transition-colors" />
                    <LazyFadeImage src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full border border-slate-700">{project.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                    <button className="w-full py-3 rounded-xl bg-slate-700 hover:bg-cyan-600 text-white font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us Section */}
      <section className="container-section py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose Us</h2>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">We are committed to delivering excellence, speed, and reliability in every line of code we write.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 max-w-5xl mx-auto">
          {whyChooseUs.map((reason, idx) => (
            <Reveal key={reason.title} delay={idx * 50}>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                  <reason.icon className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
        <div className="container-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Reveal key={t.name} delay={idx * 100}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col justify-between">
                  <p className="text-slate-700 italic mb-8">&quot;{t.content}&quot;</p>
                  <div className="flex items-center gap-4 mt-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Section */}
      <section className="relative py-24 bg-cyan-600 overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        <div className="container-section relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Your Next Project Together</h2>
            <p className="text-cyan-100 text-lg md:text-xl mb-10">Ready to transform your idea into reality? Our expert team is ready to start.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-cyan-700 hover:bg-slate-50 font-bold py-4 px-8 rounded-xl text-lg shadow-xl shadow-cyan-900/20 transition-transform hover:-translate-y-1">
                Start Your Project
              </button>
              <button className="bg-cyan-700 hover:bg-cyan-800 border-2 border-transparent text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors">
                Get Free Consultation
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Contact Section */}
      <section className="container-section py-20 lg:py-28" id="contact">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-slate-900 p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-10">Fill up the form and our Team will get back to you within 24 hours.</p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-6 h-6 text-cyan-400" />
                  <span>+1 (555) 123-4567 <span className="text-slate-500 text-sm block">WhatsApp Available</span></span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <span>hello@chakraphop.dev</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <span>123 Innovation Drive, Tech District, SF 94107</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-10 lg:p-12">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
