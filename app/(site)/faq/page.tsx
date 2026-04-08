import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/PageHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about Glitter Queen Creative — shipping, returns, care, and more.',
}

const faqs = [
  { q: 'How long does shipping take?', a: 'Orders are processed within 3–5 business days. Once shipped, delivery typically takes 3–7 additional business days within the US.' },
  { q: 'Do you ship internationally?', a: 'International shipping is available for select countries. Shipping times and rates vary by location — contact us for details.' },
  { q: 'Can I return or exchange my order?', a: 'Returns and exchanges are accepted within 14 days of delivery for unworn items in their original condition. Custom or personalised pieces are non-refundable.' },
  { q: 'How do I care for my piece?', a: 'Handle with care — keep away from moisture, direct sunlight, and perfume. Store flat or in a soft pouch when not in use. Rhinestone pieces should not be submerged in water.' },
  { q: 'Are all pieces truly handmade?', a: 'Yes. Every single piece is handcrafted by Emily. No mass production, no shortcuts. Slight variations between pieces are a natural part of handmade work.' },
  { q: 'Can I request a custom piece?', a: 'Custom requests are occasionally available. Reach out via the Contact page to discuss your idea, timeline, and pricing.' },
  { q: 'What materials do you use?', a: 'Materials vary by piece but commonly include AB rhinestones, real and faux feathers, fabric flowers, gemstones, gold-tone hardware, and quality hat bases. Full material details will be listed in future product descriptions.' },
  { q: 'My item arrived damaged — what do I do?', a: 'Please contact us within 48 hours of delivery with photos of the damage and we will make it right.' },
]

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ordering, shipping, and caring for your pieces."
      />
      <div className="section-outer">
        <div className="section-inner max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map(({ q, a }) => (
              <AccordionItem key={q} value={q} className="border border-border rounded-xl px-4">
                <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline text-left">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
