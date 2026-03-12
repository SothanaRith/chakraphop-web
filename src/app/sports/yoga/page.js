import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getSportBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Yoga - Flexible, Comfortable Essentials | SPORT',
  description: 'Flexible, comfortable yoga essentials. Shop yoga clothing and accessories for your practice.',
}

export default function YogaPage() {
  const sport = getSportBySlug('yoga')

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
