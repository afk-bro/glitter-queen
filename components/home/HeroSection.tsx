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
        className="object-cover object-top"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/65" />

      <div className="relative z-10 section-inner text-center flex flex-col items-center gap-6 px-6">
        <p className="font-body text-xs tracking-widest uppercase text-white/70">
          Handcrafted Accessories
        </p>
        <h1 className="font-script text-6xl md:text-8xl text-white leading-none">
          Glitz and glam<br className="hidden sm:block" /> for any occasion
        </h1>
        <p className="font-body text-lg text-white/80 max-w-md leading-7">
          Jewelry and accessories made to shine — because everything looks better with a little sparkle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-white/70 text-white hover:bg-white/10 hover:border-white px-8">
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
