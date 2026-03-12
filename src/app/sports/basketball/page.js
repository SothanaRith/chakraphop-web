import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Basketball - Court Performance Gear | SPORT',
  description: 'Court-ready performance gear. Shop basketball shoes, jerseys, and accessories.',
}

export default function BasketballPage() {
  const sport = getSportBySlug('basketball')

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
