import SportPageTemplate from '@/components/sport/SportPageTemplate'
import { getFeaturedBySlug } from '@/config/sports.config'
import PageWrapper from '@/components/ui/PageWrapper'

export const metadata = {
  title: 'The Locker Room - Exclusive Collections | SPORT',
  description: 'Exclusive athlete collections and collaborations. Premium performance from signature lines.',
}

export default function LockerRoomPage() {
  const featured = getFeaturedBySlug('locker-room')

  return (
    <PageWrapper>
      <SportPageTemplate
        featured={featured}
        layout="featured"
        showHero={true}
        heroHeight="large"
        heroImage="/images/sports/locker-room-hero.jpg"
      />
    </PageWrapper>
  )
}
