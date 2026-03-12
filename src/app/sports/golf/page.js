import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Golf - Performance Apparel & Footwear | SPORT',
  description: 'Performance-driven golf apparel. Shop golf shoes, polos, and accessories.',
}

export default function GolfPage() {
  const sport = getSportBySlug('golf')

  return (
    <PageWrapper>
      <SportPageTemplate
        sport={sport}
        layout="landing"
        showHero={true}
        showCategoryNav={false}
        heroHeight="medium"
      />
    </PageWrapper>
  )
}
