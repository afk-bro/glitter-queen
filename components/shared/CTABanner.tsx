import Link from 'next/link'
import { Button } from '@/components/ui/button'

type CTABannerProps = {
  heading: string
  subtext?: string
  href: string
  label: string
}

export function CTABanner({ heading, subtext, href, label }: CTABannerProps) {
  return (
    <section className="section-outer bg-primary-soft">
      <div className="section-inner text-center">
        <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-3 font-body text-muted-foreground leading-7">{subtext}</p>
        )}
        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10">
            <Link href={href}>{label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
