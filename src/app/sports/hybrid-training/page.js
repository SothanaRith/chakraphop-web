import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getFeaturedBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'Hybrid Training - Cross-Sport Performance | SPORT',
  description: 'Cross-training gear for multi-sport athletes. Versatile performance for every workout.',
}

export default function HybridTrainingPage() {
  const featured = getFeaturedBySlug('hybrid-training')

  return (
    <PageWrapper>
      <SportPageTemplate
        featured={featured}
        layout="featured"
        showHero={true}
        heroHeight="large"
        heroImage="/images/sports/hybrid-training-hero.jpg"
      />
    </PageWrapper>
  )
}
