import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Training & Gym - Performance Gear | SPORT',
  description: 'Built to push limits and maximize performance. Shop training shoes, gym clothing, and workout accessories.',
}

export default function TrainingPage() {
  const sport = getSportBySlug('training')

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
