import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Football Kits & Clothing | SPORT',
  description: 'Shop football jerseys, shorts, training gear, and jackets. Performance apparel for match day and training.',
}

export default function FootballClothingPage() {
  const sport = getSportBySlug('football')
  const category = getCategoryBySlug('football', 'clothing')

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
