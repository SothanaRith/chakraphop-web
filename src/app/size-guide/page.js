import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'

export const metadata = {
  title: "Size Guide | SPORT",
  description: "Find the perfect fit with our comprehensive size guide for men, women, and accessories."
}

const sizeGuides = {
  men: {
    title: 'Men\'s Sizing',
    description: 'All measurements are in inches and centimeters',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    measurements: [
      {
        size: 'XS',
        chest: '34-36 (86-91cm)',
        waist: '28-30 (71-76cm)',
        length: '27.5 (70cm)',
        fit: 'Close fit'
      },
      {
        size: 'S',
        chest: '36-38 (91-96cm)',
        waist: '30-32 (76-81cm)',
        length: '28 (71cm)',
        fit: 'Close fit'
      },
      {
        size: 'M',
        chest: '38-40 (96-101cm)',
        waist: '32-34 (81-86cm)',
        length: '28.5 (72cm)',
        fit: 'Standard fit'
      },
      {
        size: 'L',
        chest: '40-42 (101-106cm)',
        waist: '34-36 (86-91cm)',
        length: '29 (73cm)',
        fit: 'Standard fit'
      },
      {
        size: 'XL',
        chest: '42-44 (106-111cm)',
        waist: '36-38 (91-96cm)',
        length: '29.5 (74cm)',
        fit: 'Relaxed fit'
      },
      {
        size: 'XXL',
        chest: '44-46 (111-116cm)',
        waist: '38-40 (96-101cm)',
        length: '30 (75cm)',
        fit: 'Relaxed fit'
      }
    ]
  },
  women: {
    title: 'Women\'s Sizing',
    description: 'All measurements are in inches and centimeters',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    measurements: [
      {
        size: 'XS',
        chest: '32-34 (81-86cm)',
        waist: '24-26 (61-66cm)',
        length: '26 (66cm)',
        fit: 'Close fit'
      },
      {
        size: 'S',
        chest: '34-36 (86-91cm)',
        waist: '26-28 (66-71cm)',
        length: '26.5 (67cm)',
        fit: 'Close fit'
      },
      {
        size: 'M',
        chest: '36-38 (91-96cm)',
        waist: '28-30 (71-76cm)',
        length: '27 (68cm)',
        fit: 'Standard fit'
      },
      {
        size: 'L',
        chest: '38-40 (96-101cm)',
        waist: '30-32 (76-81cm)',
        length: '27.5 (69cm)',
        fit: 'Standard fit'
      },
      {
        size: 'XL',
        chest: '40-42 (101-106cm)',
        waist: '32-34 (81-86cm)',
        length: '28 (70cm)',
        fit: 'Relaxed fit'
      },
      {
        size: 'XXL',
        chest: '42-44 (106-111cm)',
        waist: '34-36 (86-91cm)',
        length: '28.5 (71cm)',
        fit: 'Relaxed fit'
      }
    ]
  }
}

function SizeTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-neutral-900">
            <th className="text-left text-body font-semibold py-4 px-4">Size</th>
            <th className="text-left text-body font-semibold py-4 px-4">Chest</th>
            <th className="text-left text-body font-semibold py-4 px-4">Waist</th>
            <th className="text-left text-body font-semibold py-4 px-4">Length</th>
            <th className="text-left text-body font-semibold py-4 px-4">Fit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-neutral-200">
              <td className="py-4 px-4 text-body font-medium">{row.size}</td>
              <td className="py-4 px-4 text-body">{row.chest}</td>
              <td className="py-4 px-4 text-body">{row.waist}</td>
              <td className="py-4 px-4 text-body">{row.length}</td>
              <td className="py-4 px-4 text-body-sm text-neutral-600">{row.fit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Size Guide"
        description="Find your perfect fit. Use these measurements to select the right size for every SPORT product."
        breadcrumbs={['Home', 'Support', 'Size Guide']}
      />

      {/* How to Measure */}
      <PageSection className="bg-white">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">How to Measure</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-heading-lg font-semibold mb-3">Chest</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Measure around your chest at the fullest part. Keep the measuring tape parallel to the ground and comfortably snug (not tight).
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-semibold mb-3">Waist</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Measure around your natural waist, typically about an inch above your hip bone. Again, keep the tape comfortably snug.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-semibold mb-3">Length</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Measure from the base of your neck down to your desired hem length. For a standard fit, most lengths fall at the hip.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Men's Sizes */}
      <PageSection className="bg-neutral-50">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-2">{sizeGuides.men.title}</h2>
          <p className="text-body text-neutral-600 mb-8">{sizeGuides.men.description}</p>
          <SizeTable data={sizeGuides.men.measurements} />
        </div>
      </PageSection>

      {/* Women's Sizes */}
      <PageSection className="bg-white">
        <div>
          <h2 className="font-display text-display-md font-bold tracking-tight mb-2">{sizeGuides.women.title}</h2>
          <p className="text-body text-neutral-600 mb-8">{sizeGuides.women.description}</p>
          <SizeTable data={sizeGuides.women.measurements} />
        </div>
      </PageSection>

      {/* Fit Tips */}
      <PageSection className="bg-neutral-50">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md font-bold tracking-tight mb-8">Fit Tips</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-heading-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center text-caption font-bold">✓</span>
                Between Sizes?
              </h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                If you fall between two sizes, we recommend sizing up for a more comfortable, relaxed fit. All SPORT pieces are designed with performance in mind.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center text-caption font-bold">✓</span>
                Try Before You Commit
              </h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Order multiple sizes and try them on. We offer free returns within 30 days for all items in original condition.
              </p>
            </div>
            <div>
              <h3 className="text-heading-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center text-caption font-bold">✓</span>
                Layering Considerations
              </h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                All SPORT gear is designed to work with or without layers. If you plan to layer, consider sizing up slightly for unrestricted movement.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Contact */}
      <PageSection className="bg-white">
        <div className="max-w-3xl bg-neutral-50 p-12 rounded-lg">
          <h3 className="text-heading-lg font-semibold mb-4">Still unsure?</h3>
          <p className="text-body text-neutral-600 mb-6">
            Our support team is here to help. Reach out with your measurements and we'll recommend the perfect size for you.
          </p>
          <a href="/contact" className="text-body font-medium transition-colors" style={{ color: 'var(--color-accent-primary)' }}>
            Contact Support →
          </a>
        </div>
      </PageSection>
    </main>
  )
}
