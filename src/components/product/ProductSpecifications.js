'use client'

/**
 * ProductSpecifications Component
 * 
 * Displays technical specifications in a clean, scannable format
 * Material composition, weight, care instructions, etc.
 */
export default function ProductSpecifications({ specifications }) {
  if (!specifications || Object.keys(specifications).length === 0) return null

  return (
    <section className="container-section bg-neutral-50 rounded-2xl p-8 lg:p-12">
      <h2 className="text-heading-xl mb-8">Product Specifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* Materials */}
        {specifications.materials && (
          <div>
            <h3 className="text-body font-semibold mb-3 text-neutral-500 uppercase tracking-wide text-sm">
              Materials
            </h3>
            <p className="text-body text-neutral-900">
              {specifications.materials}
            </p>
          </div>
        )}

        {/* Fit */}
        {specifications.fit && (
          <div>
            <h3 className="text-body font-semibold mb-3 text-neutral-500 uppercase tracking-wide text-sm">
              Fit
            </h3>
            <p className="text-body text-neutral-900">
              {specifications.fit}
            </p>
          </div>
        )}

        {/* Weight */}
        {specifications.weight && (
          <div>
            <h3 className="text-body font-semibold mb-3 text-neutral-500 uppercase tracking-wide text-sm">
              Weight
            </h3>
            <p className="text-body text-neutral-900">
              {specifications.weight}
            </p>
          </div>
        )}

        {/* Origin */}
        {specifications.origin && (
          <div>
            <h3 className="text-body font-semibold mb-3 text-neutral-500 uppercase tracking-wide text-sm">
              Made In
            </h3>
            <p className="text-body text-neutral-900">
              {specifications.origin}
            </p>
          </div>
        )}

        {/* Care Instructions */}
        {specifications.care && (
          <div className="md:col-span-2">
            <h3 className="text-body font-semibold mb-3 text-neutral-500 uppercase tracking-wide text-sm">
              Care Instructions
            </h3>
            <ul className="space-y-2 text-body text-neutral-700">
              {specifications.care.map((instruction, index) => (
                <li key={index}>• {instruction}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Specs */}
        {specifications.additional && Object.keys(specifications.additional).map((key) => (
          <div key={key}>
            <h3 className="text-body font-semibold mb-3 text-neutral-500 uppercase tracking-wide text-sm">
              {key.replace(/_/g, ' ')}
            </h3>
            <p className="text-body text-neutral-900">
              {specifications.additional[key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
