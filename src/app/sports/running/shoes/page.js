import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Running Shoes - Performance Footwear | SPORT',
  description: 'Shop running shoes designed for speed, distance, and comfort. Find the perfect pair for your running style.',
}

export default function RunningShoesPage() {
  const sport = getSportBySlug('running')
  const category = getCategoryBySlug('running', 'shoes')

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
