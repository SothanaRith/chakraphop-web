import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Training & Gym Accessories | SPORT',
  description: 'Essential training accessories including gloves, belts, bags, and workout equipment. Elevate your training.',
}

export default function TrainingAccessoriesPage() {
  const sport = getSportBySlug('training')
  const category = getCategoryBySlug('training', 'accessories')

  return (
    <PageWrapper>
      <SportPageTemplate
        sport={sport}
        category={category}
        layout="catalog"
        showHero={false}
        showFilters={true}
      />
    </PageWrapper>
  )
}
