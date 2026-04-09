'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast('Thanks! Newsletter coming soon.')
    setEmail('')
  }

  return (
    <section className="section-outer bg-muted">
      <div className="section-inner text-center">
        <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
          Stay in the Sparkle Loop
        </h2>
        <p className="mt-3 font-body text-muted-foreground leading-7 max-w-sm mx-auto">
          New pieces, behind-the-scenes, and exclusive offers — straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="rounded-full border-border bg-background font-body"
            aria-label="Email address"
          />
          <Button type="submit" variant="cta" className="rounded-full whitespace-nowrap">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
