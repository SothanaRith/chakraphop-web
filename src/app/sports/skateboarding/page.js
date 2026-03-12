import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Skateboarding - Street & Park Gear | SPORT',
  description: 'Durable gear for street and park. Shop skateboarding shoes, clothing, and accessories.',
}

export default function SkateboardingPage() {
  const sport = getSportBySlug('skateboarding')

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
