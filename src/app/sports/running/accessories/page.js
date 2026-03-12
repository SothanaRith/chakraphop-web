import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug, getCategoryBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Running Accessories - Gear & Equipment | SPORT',
  description: 'Essential running accessories including socks, hats, hydration packs, and more. Complete your running kit.',
}

export default function RunningAccessoriesPage() {
  const sport = getSportBySlug('running')
  const category = getCategoryBySlug('running', 'accessories')

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
