// app/(site)/page.tsx
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { NewArrivals } from '@/components/home/NewArrivals'
import { BrandStoryPreview } from '@/components/home/BrandStoryPreview'
import { ValueProps } from '@/components/home/ValueProps'
import { LifestyleSection } from '@/components/home/LifestyleSection'
import { Testimonials } from '@/components/home/Testimonials'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'
import { CTABanner } from '@/components/shared/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollection />
      <NewArrivals />
      <BrandStoryPreview />
      <ValueProps />
      <LifestyleSection />
      <Testimonials />
      <CTABanner
        heading="Ready to Shine?"
        subtext="Find your next statement piece in our handcrafted collection."
        href="/shop"
        label="Shop Now"
      />
      <NewsletterSignup />
    </>
  )
}
