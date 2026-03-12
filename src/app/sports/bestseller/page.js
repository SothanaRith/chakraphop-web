import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getFeaturedBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Bestsellers - Top Performing Products | SPORT',
  description: 'Top-performing products athletes love. Discover what the community is buying.',
}

export default function BestsellerPage() {
  const featured = getFeaturedBySlug('bestseller')

  return (
    <PageWrapper>
      <SportPageTemplate
        featured={featured}
        layout="featured"
        showHero={true}
        heroHeight="large"
        heroImage="/images/sports/bestseller-hero.jpg"
      />
    </PageWrapper>
  )
}
