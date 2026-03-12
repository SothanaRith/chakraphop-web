import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Chakraphop | Professional Software Development Services',
  description: 'We build exceptional web, mobile, and business systems tailored to your needs.',
}

export default function DevelopmentLayout({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
