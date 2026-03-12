import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getFeaturedBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Jordan Sport - Premium Performance | SPORT',
  description: 'Premium performance from the Jordan line. Iconic style meets elite athleticism.',
}

export default function JordanPage() {
  const featured = getFeaturedBySlug('jordan')

  return (
    <PageWrapper>
      <SportPageTemplate
        featured={featured}
        layout="featured"
        showHero={true}
        heroHeight="large"
        heroImage="/images/sports/jordan-hero.jpg"
      />
    </PageWrapper>
  )
}
