import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/PageHeader'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the Glitter Queen Creative website.',
}

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" />
      <div className="section-outer">
        <div className="section-inner max-w-2xl mx-auto space-y-8 font-body text-sm text-muted-foreground leading-7">
          <p className="text-foreground text-base">Last updated: April 2026</p>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Use of This Site</h2>
            <p>By accessing glitterqueencreative.com you agree to use the site for lawful purposes only. Unauthorised reproduction of product images or brand assets is prohibited.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Products & Pricing</h2>
            <p>All prices are listed in USD. Glitter Queen Creative reserves the right to modify pricing at any time. Orders are confirmed upon receipt of payment.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Intellectual Property</h2>
            <p>All product designs, photographs, and brand assets are the intellectual property of Glitter Queen Creative. No content may be reproduced without written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Limitation of Liability</h2>
            <p>Glitter Queen Creative is not liable for damages arising from the use of this site beyond the value of the order placed. All items are handmade — natural variations are not considered defects.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Contact</h2>
            <p>Questions about these terms? <a href="/contact" className="text-primary underline underline-offset-2">Get in touch.</a></p>
          </section>
        </div>
      </div>
    </>
  )
}
