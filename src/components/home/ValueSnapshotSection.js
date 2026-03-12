/**
 * ValueSnapshotSection - Brand value pillars
 * Communicates 3 core pillars: Performance / Design / Sustainability
 */

import SectionWrapper from './SectionWrapper'
import { Zap, Palette, Leaf } from 'lucide-react'

export default function ValueSnapshotSection() {
  const pillars = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance First',
      description: 'Engineering that adapts to your body. Materials that enhance movement.',
      accent: false,
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Design Clarity',
      description: 'Form follows function. Every detail purposeful. Every line essential.',
      accent: true, // This pillar gets the light red accent
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Future',
      description: 'Built responsibly. Made to last. Carbon-neutral by 2025.',
      accent: false,
    },
  ]

  return (
    <SectionWrapper id="values" bgColor="bg-white">
      <div className="space-y-16">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-body font-medium text-neutral-600 mb-3 uppercase tracking-widest">
            What Drives Us
          </p>
          <h2 className="font-display text-display-md font-bold tracking-tight">
            Three Principles
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`space-y-4 pb-8 ${
                pillar.accent
                  ? 'border-b-2 border-accent-primary'
                  : 'border-b border-neutral-200'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 flex items-center justify-center ${
                  pillar.accent
                    ? 'bg-accent-muted text-accent-primary'
                    : 'bg-neutral-100 text-neutral-900'
                }`}
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="text-heading-lg font-semibold text-neutral-900">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-body text-neutral-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
