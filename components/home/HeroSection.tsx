import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/lifestyle/parasol-lifestyle.jpg"
        alt="Glitter Queen Creative"
        fill
        className="object-cover [object-position:50%_45%]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80" />

      <div className="relative z-10 section-inner text-center flex flex-col items-center gap-6 px-6">
        <p className="font-body text-xs tracking-widest uppercase text-accent">
          Handcrafted Accessories
        </p>
        <h1 className="font-script text-6xl sm:text-7xl md:text-9xl text-white leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Glitz and glam<br className="hidden sm:block" /> for any occasion
        </h1>
        <p className="font-body text-lg text-white/80 max-w-md leading-7">
          Jewelry and accessories made to shine — because everything looks better with a little sparkle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild variant="cta" size="lg" className="rounded-full px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-white text-white bg-white/15 hover:bg-white/25 hover:border-white px-8">
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  )
}
