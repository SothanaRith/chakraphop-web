import Link from 'next/link'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const footerSections = [
    {
      title: 'Store',
      links: [
        { label: 'Desktop Accessories', href: '/tech/store' },
        { label: 'Mechanical Keyboards', href: '/tech/store' },
        { label: 'Laptop Stands', href: '/tech/store' },
        { label: 'Desk Setup Gear', href: '/tech/store' },
      ],
    },
    {
      title: 'Learning',
      links: [
        { label: 'Course Marketplace', href: '/tech/courses' },
        { label: 'Student Dashboard', href: '/tech/student/dashboard' },
        { label: 'Instructor Dashboard', href: '/tech/instructor/dashboard' },
        { label: 'Learning Paths', href: '/tech/courses' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Chakraphop', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Developer Blog', href: '/blog' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="bg-neutral-950 text-neutral-100">
      <div className="container-section section-spacing">
        {/* Newsletter */}
        <div className="mb-20 pb-20 border-b border-neutral-800">
          <div className="max-w-2xl">
            <h2 className="text-heading-lg mb-4 text-white">Stay Updated</h2>
            <p className="text-body-lg text-neutral-400 mb-8">
              Get desktop setup drops, new coding course launches, and weekly developer resources.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              <button
                type="submit"
                className="btn btn-primary bg-white text-neutral-900 hover:bg-neutral-200 px-10"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-heading-sm mb-6 text-white">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-body text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social & Contact */}
          <div>
            <h3 className="text-heading-sm mb-6 text-white">Connect</h3>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200 focus-ring"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-body-sm text-neutral-500">
              Questions?
              <br />
              <a href="mailto:support@chakraphop.dev" className="text-neutral-300 hover:text-white transition-colors">
                support@chakraphop.dev
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-body-sm text-neutral-500">
            © 2026 Chakraphop. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-body-sm text-neutral-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-body-sm text-neutral-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-body-sm text-neutral-500 hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
