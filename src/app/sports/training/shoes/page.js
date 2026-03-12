import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Training & Gym Shoes | SPORT',
  description: 'Stable, supportive footwear for lifting, HIIT, and cross-training. Find your training shoes.',
}

export default function TrainingShoesPage() {
  const sport = getSportBySlug('training')
  const category = getCategoryBySlug('training', 'shoes')

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
