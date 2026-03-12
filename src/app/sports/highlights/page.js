import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getFeaturedBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Sport Highlights - Featured Collections | SPORT',
  description: 'The best of the best across all sports. Discover our curated collection of standout products.',
}

export default function HighlightsPage() {
  const featured = getFeaturedBySlug('highlights')

  return (
    <PageWrapper>
      <SportPageTemplate
        featured={featured}
        layout="featured"
        showHero={true}
        heroHeight="large"
        heroImage="/images/sports/highlights-hero.jpg"
      />
    </PageWrapper>
  )
}
