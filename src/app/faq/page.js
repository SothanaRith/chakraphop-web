'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import Badge from '@/components/ui/Badge'
import { ChevronDown, Search, MessageCircle } from 'lucide-react'

const faqs = [
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days. International orders may take 10-15 business days depending on location.'
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! Free standard shipping is available on orders over $100. You can also opt for express shipping at checkout for an additional fee.'
      },
      {
        q: 'Can I change my shipping address?',
        a: 'If your order hasn\'t shipped yet, you can change the address in your account. Once shipped, please contact our support team at support@sport.com.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy for all items in original condition with tags attached. Items must be unworn and unwashed. Refunds are processed within 5-7 business days after we receive the return.'
      },
      {
        q: 'How do I initiate a return?',
        a: 'Log into your account, go to Orders, and click "Return Item" next to the product. Follow the instructions to print a label and ship the item back to us.'
      },
      {
        q: 'Do you offer exchanges?',
        a: 'Yes! If you need a different size or color, you can initiate an exchange through your account. We\'ll send the replacement before you return the original.'
      }
    ]
  },
  {
    category: 'Products & Sizing',
    questions: [
      {
        q: 'How do I find the right size?',
        a: 'Visit our Size Guide page for detailed measurements by category. We recommend measuring yourself and comparing to our charts. When in doubt, feel free to order multiple sizes for comparison.'
      },
      {
        q: 'Are all products original?',
        a: 'Yes, 100% authentic. We source directly from manufacturers and authorized distributors. All products come with authenticity guarantees.'
      },
      {
        q: 'When do you restock sold-out items?',
        a: 'Popular items are restocked weekly. Sign up for product notifications to be alerted when items are back in stock.'
      }
    ]
  },
  {
    category: 'Account & Orders',
    questions: [
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you\'ll receive an email with a tracking link. You can also track orders from your account dashboard or use our Track Order page.'
      },
      {
        q: 'Can I cancel my order?',
        a: 'If your order hasn\'t shipped, you can cancel it from your account. If it\'s already shipped, you\'ll need to initiate a return after receiving it.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page. Enter your email and follow the instructions sent to your inbox.'
      }
    ]
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are encrypted and secure.'
      },
      {
        q: 'Is my payment information safe?',
        a: 'Yes. We use industry-standard SSL encryption and never store full credit card details. Payment processing is handled by PCI-compliant providers.'
      },
      {
        q: 'Do you charge sales tax?',
        a: 'Sales tax is calculated based on your shipping address. It\'s displayed before checkout so you know the total cost.'
      }
    ]
  }
]

export default function FAQPage() {
  const [expandedCategory, setExpandedCategory] = useState(0)
  const [expandedQuestion, setExpandedQuestion] = useState({})

  const toggleQuestion = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`
    setExpandedQuestion(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title="How Can We Help?"
        description="Find quick answers to common questions about shipping, returns, products, and more. Can't find what you need? Contact our support team."
        breadcrumbs={['Home', 'Support', 'FAQ']}
      />

      <PageSection className="bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-neutral-300 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-12">
            {faqs.map((faqGroup, catIdx) => (
              <div key={catIdx} className="pb-8 last:pb-0">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline" size="sm">{faqGroup.questions.length} Questions</Badge>
                  <h3 className="text-heading-xl font-semibold">{faqGroup.category}</h3>
                </div>
                <div className="space-y-4">
                  {faqGroup.questions.map((item, qIdx) => {
                    const key = `${catIdx}-${qIdx}`
                    const isExpanded = expandedQuestion[key]

                    return (
                      <div key={qIdx} className="border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-400 transition-colors">
                        <button
                          onClick={() => toggleQuestion(catIdx, qIdx)}
                          className="w-full px-6 py-5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
                        >
                          <h4 className="text-body-lg font-medium pr-4">{item.q}</h4>
                          <ChevronDown
                            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-200">
                            <p className="text-body text-neutral-700 leading-relaxed">{item.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-16 p-10 bg-neutral-900 text-white rounded-lg text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-accent-primary" />
            <h3 className="text-heading-xl font-semibold mb-3">Still need help?</h3>
            <p className="text-body-lg text-neutral-300 mb-8 max-w-xl mx-auto">
              Our support team is standing by. We typically respond within 2 hours during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="btn bg-white text-neutral-900 hover:bg-neutral-100">
                Contact Support
              </a>
              <a href="mailto:support@sport.com" className="btn btn-ghost border-2 border-white text-white hover:bg-white hover:text-neutral-900">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
