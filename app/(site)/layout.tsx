// app/(site)/layout.tsx
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar message="Handcrafted Jewelry Made to Shine — 10% off your first order" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
