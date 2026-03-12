import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Running Clothing - Performance Apparel | SPORT',
  description: 'Lightweight, breathable running apparel for every distance. Shop running shirts, shorts, tights, and jackets.',
}

export default function RunningClothingPage() {
  const sport = getSportBySlug('running')
  const category = getCategoryBySlug('running', 'clothing')

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
