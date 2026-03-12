import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Running - Performance Footwear & Apparel | SPORT',
  description: 'Built for speed, distance, and every run in between. Shop running shoes, clothing, and accessories designed for runners.',
}

export default function RunningPage() {
  const sport = getSportBySlug('running')

  return (
    <PageWrapper>
      <SportPageTemplate
        sport={sport}
        layout="landing"
        showHero={true}
        showCategoryNav={true}
        heroHeight="large"
      />
    </PageWrapper>
  )
}
