import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function BrandStoryPreview() {
  return (
    <section className="section-outer">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/lifestyle/parasol-lifestyle.jpg"
              alt="A model wearing a handcrafted Glitter Queen parasol"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-body text-xs tracking-widest uppercase text-accent">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
              Made to Shine.<br />Designed to Be You.
            </h2>
            <p className="font-body text-muted-foreground leading-7 max-w-prose">
              Glitter Queen Creative is a celebration of self-expression — bold, playful, and unapologetically radiant. Every piece is handcrafted with intention, blending creativity with craftsmanship to create something truly unique.
            </p>
            <Button asChild variant="outline" className="w-fit rounded-full border-primary text-primary hover:bg-primary-soft px-8">
              <Link href="/about">Meet Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
