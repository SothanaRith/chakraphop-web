import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Tennis - Court Performance Gear | SPORT',
  description: 'Precision gear for the court. Shop tennis shoes, apparel, and accessories.',
}

export default function TennisPage() {
  const sport = getSportBySlug('tennis')

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
