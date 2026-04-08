import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center section-outer bg-muted">
      <div className="section-inner text-center flex flex-col items-center gap-6">
        <Image
          src="/logos/gq_light_logo_wreath.jpg"
          alt="Glitter Queen Creative"
          width={180}
          height={180}
          className="dark:hidden"
          priority
        />
        <Image
          src="/logos/gq_dark_logo.jpg"
          alt="Glitter Queen Creative"
          width={180}
          height={180}
          className="hidden dark:block"
          priority
        />
        <h1 className="font-script text-6xl md:text-8xl text-foreground leading-none mt-2">
          Glitz and glam for any occasion
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-md leading-7">
          Handcrafted jewelry and accessories made to shine — because everything looks better with a little sparkle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
