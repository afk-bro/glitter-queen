'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast('Thanks! Contact submissions are coming soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="font-body text-sm text-foreground mb-1.5 block">Name</label>
        <Input
          id="name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          className="rounded-xl border-border bg-background font-body"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-body text-sm text-foreground mb-1.5 block">Email</label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          className="rounded-xl border-border bg-background font-body"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-body text-sm text-foreground mb-1.5 block">Message</label>
        <Textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          required
          className="rounded-xl border-border bg-background font-body resize-none"
        />
      </div>
      <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-fit px-8">
        Send Message
      </Button>
      <p className="font-body text-xs text-muted-foreground">
        We'll get back to you as soon as possible.
      </p>
    </form>
  )
}
