import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/PageHeader'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Glitter Queen Creative shipping times, costs, and return policy.',
}

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader title="Shipping & Returns" />
      <div className="section-outer">
        <div className="section-inner max-w-2xl mx-auto">
          <div className="space-y-10 font-body text-foreground leading-7">
            <section>
              <h2 className="font-display text-2xl tracking-tight mb-3">Shipping</h2>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Orders are processed within <strong className="text-foreground">3–5 business days</strong> of purchase.</li>
                <li>Standard US delivery: <strong className="text-foreground">3–7 business days</strong> after dispatch.</li>
                <li>Free standard shipping on orders over <strong className="text-foreground">$75</strong>.</li>
                <li>Expedited shipping is available at checkout (coming in Phase 2).</li>
                <li>International shipping is available to select countries — rates calculated at checkout.</li>
                <li>A tracking number will be emailed once your order ships.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl tracking-tight mb-3">Returns</h2>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Returns are accepted within <strong className="text-foreground">14 days</strong> of delivery.</li>
                <li>Items must be unworn and in original condition.</li>
                <li>Custom or personalised pieces are non-refundable.</li>
                <li>To initiate a return, contact us at <a href="/contact" className="text-primary underline underline-offset-2">our contact page</a>.</li>
                <li>Return shipping costs are the responsibility of the customer unless the item arrived damaged or incorrect.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl tracking-tight mb-3">Damaged or Incorrect Items</h2>
              <p className="text-muted-foreground text-sm">
                If your order arrives damaged or incorrect, please contact us within <strong className="text-foreground">48 hours</strong> of delivery with photos and we will make it right — replacement or full refund, your choice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
