import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Training & Gym Clothing | SPORT',
  description: 'Flexible, durable training apparel. Shop workout shirts, shorts, leggings, and jackets built for the gym.',
}

export default function TrainingClothingPage() {
  const sport = getSportBySlug('training')
  const category = getCategoryBySlug('training', 'clothing')

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
