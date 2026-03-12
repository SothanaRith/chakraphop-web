import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Football - Boots, Kits & Training Gear | SPORT',
  description: 'Precision-engineered for the beautiful game. Shop football boots, kits, and training gear for every playing surface.',
}

export default function FootballPage() {
  const sport = getSportBySlug('football')

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
