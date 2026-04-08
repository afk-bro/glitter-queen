import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-outer bg-muted">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <Image
          src="/logos/gq_light_logo_wreath.jpg"
          alt="Glitter Queen Creative"
          width={120}
          height={120}
          className="dark:hidden"
        />
        <Image
          src="/logos/gq_dark_logo.jpg"
          alt="Glitter Queen Creative"
          width={120}
          height={120}
          className="hidden dark:block"
        />
        <h1 className="font-display text-4xl text-foreground leading-[1.1] tracking-tight">
          Page Not Found
        </h1>
        <p className="font-body text-muted-foreground leading-7">
          This page seems to have wandered off — let's get you back to the sparkle.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
