import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Glitter Queen Creative — questions, custom requests, or just to say hello.',
}

const faqPreview = [
  {
    q: 'How long does shipping take?',
    a: 'Orders ship within 3–5 business days. Delivery typically takes 3–7 additional days depending on your location.',
  },
  {
    q: 'Can I return or exchange my order?',
    a: 'Yes — returns are accepted within 14 days of delivery for unworn items in original condition.',
  },
  {
    q: 'Are the products truly handmade?',
    a: 'Absolutely. Every piece is handcrafted by Emily. No mass production, no shortcuts.',
  },
]

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.27 8.27 0 0 0 4.84 1.54V6.84a4.85 4.85 0 0 1-4.07-.15z" />
  </svg>
)

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="Have a question, custom request, or just want to say hello? We'd love to hear from you."
      />
      <div className="section-outer">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-2xl text-foreground leading-[1.15] tracking-tight mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-display text-2xl text-foreground leading-[1.15] tracking-tight mb-6">
                  Find Us
                </h2>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:hello@glitterqueencreative.com"
                    className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    hello@glitterqueencreative.com
                  </a>
                  <div className="flex items-center gap-4 pt-2">
                    <a href="https://www.instagram.com/glitterqueencreative?igsh=eWJ3MzlibGtoNHhi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                      <InstagramIcon />
                    </a>
                    <a href="https://www.facebook.com/share/1AhWYYXde9/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                      <FacebookIcon />
                    </a>
                    <a href="https://www.tiktok.com/@glitterqueencreative?_r=1&_t=ZS-95MOzWoPvlt" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                      <TikTokIcon />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-foreground leading-[1.15] tracking-tight mb-4">
                  Common Questions
                </h2>
                <Accordion type="single" collapsible>
                  {faqPreview.map(({ q, a }) => (
                    <AccordionItem key={q} value={q}>
                      <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline text-left">
                        {q}
                      </AccordionTrigger>
                      <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
                        {a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Link href="/faq" className="font-body text-sm text-primary hover:underline underline-offset-2 mt-4 inline-block">
                  View all FAQs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
