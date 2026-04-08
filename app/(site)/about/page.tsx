import type { Metadata } from 'next'
import Image from 'next/image'
import { CTABanner } from '@/components/shared/CTABanner'
import { Sparkles, Heart, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Emily and the story behind Glitter Queen Creative — handcrafted accessories made to shine.',
}

const values = [
  {
    icon: Sparkles,
    title: 'The Inspiration',
    desc: 'Golden light, vibrant colors, music and movement, and the freedom to express who you are. Every piece reflects a moment that feels alive.',
  },
  {
    icon: Heart,
    title: 'The Craft',
    desc: 'Every piece is handcrafted with care using thoughtfully selected materials. Nothing is mass-produced. Nothing is rushed. It is about quality, balance, and creating something that feels as good as it looks.',
  },
  {
    icon: Star,
    title: 'Why It Matters',
    desc: 'Jewelry and accessories should do more than complete an outfit — they should transform how you feel. Glitter Queen Creative exists to bring more confidence, creativity, and joy into everyday life.',
  },
]

const inspirationPills = [
  'Golden Light',
  'Vibrant Colors',
  'Music & Movement',
  'Freedom to Express',
]

export default function AboutPage() {
  return (
    <>
      <section className="section-outer bg-muted text-center">
        <div className="section-inner">
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
            Made to Shine.<br />Designed to Be You.
          </h1>
          <p className="mt-6 font-body text-lg text-muted-foreground leading-7 max-w-2xl mx-auto">
            Glitter Queen Creative is a celebration of self-expression — bold, playful, and unapologetically radiant. Each piece is designed to elevate how you feel: confident, expressive, and just a little bit magical.
          </p>
        </div>
      </section>

      <section className="section-outer">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src="/lifestyle/parasol-lifestyle.jpg"
                alt="Emily, founder of Glitter Queen Creative"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-body text-xs tracking-widest uppercase text-accent">The Story</p>
              <h2 className="font-display text-3xl text-foreground leading-[1.15] tracking-tight">
                Hi, I'm Emily.
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-7 max-w-prose">
                <p>
                  What started as a personal creative outlet quickly became something more: a way to turn colour, texture, and sparkle into pieces that help people feel like their most authentic selves.
                </p>
                <p>
                  From festival-inspired designs to everyday statement accessories, every item is made with intention — blending creativity with craftsmanship to create something truly unique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-outer bg-muted">
        <div className="section-inner text-center">
          <h2 className="font-display text-2xl md:text-3xl text-foreground leading-[1.15] tracking-tight mb-8">
            Inspired by moments that feel alive
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {inspirationPills.map(pill => (
              <span
                key={pill}
                className="px-5 py-2 rounded-full bg-primary-soft text-primary font-body text-sm border border-primary/30"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-outer">
        <div className="section-inner">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                <div className="p-3 w-fit rounded-full bg-primary-soft text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-foreground leading-[1.2] tracking-tight">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-outer bg-muted">
        <div className="section-inner">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-foreground leading-[1.15] tracking-tight">
              The Collection
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/products/iridescent-rhinestone-cap/1.jpg', alt: 'Iridescent rhinestone cap' },
              { src: '/products/pink-floral-parasol/1.jpg', alt: 'Pink floral parasol' },
              { src: '/products/amethyst-moth-drop-earrings/1.jpg', alt: 'Amethyst moth earrings' },
              { src: '/products/mushroom-garden-sunglasses/1.jpg', alt: 'Mushroom garden sunglasses' },
            ].map(({ src, alt }) => (
              <div key={src} className="relative aspect-square rounded-2xl overflow-hidden bg-background">
                <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to find your next statement piece?"
        subtext="Because everything really does look better with a little sparkle."
        href="/shop"
        label="Shop Now"
      />
    </>
  )
}
