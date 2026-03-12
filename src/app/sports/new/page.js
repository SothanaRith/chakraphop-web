import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getFeaturedBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'New in Sports - Latest Releases | SPORT',
  description: 'Latest drops and newest releases across all sports. Be the first to get the newest gear.',
}

export default function NewPage() {
  const featured = getFeaturedBySlug('new')

  return (
    <PageWrapper>
      <SportPageTemplate
        featured={featured}
        layout="featured"
        showHero={true}
        heroHeight="large"
        heroImage="/images/sports/new-hero.jpg"
      />
    </PageWrapper>
  )
}
