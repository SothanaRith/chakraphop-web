import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Football Accessories - Shin Guards, Bags & Equipment | SPORT',
  description: 'Essential football accessories including shin guards, training equipment, bags, and more. Complete your football kit.',
}

export default function FootballAccessoriesPage() {
  const sport = getSportBySlug('football')
  const category = getCategoryBySlug('football', 'accessories')

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
