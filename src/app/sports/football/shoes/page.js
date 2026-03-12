import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Football Boots & Cleats | SPORT',
  description: 'Shop football boots and cleats for firm ground, artificial grass, and indoor surfaces. Find your perfect match.',
}

export default function FootballShoesPage() {
  const sport = getSportBySlug('football')
  const category = getCategoryBySlug('football', 'shoes')

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
