import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/PageHeader'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Glitter Queen Creative handles your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <div className="section-outer">
        <div className="section-inner max-w-2xl mx-auto space-y-8 font-body text-sm text-muted-foreground leading-7">
          <p className="text-foreground text-base">Last updated: April 2026</p>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Information We Collect</h2>
            <p>We collect information you provide directly — such as your name, email address, and shipping address when you place an order or sign up for our newsletter. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">How We Use Your Information</h2>
            <p>Your information is used to process orders, send shipping updates, and — with your consent — send newsletters and promotional emails. You may unsubscribe at any time.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Cookies</h2>
            <p>This site uses essential cookies to operate correctly (theme preference, session state). No tracking or advertising cookies are used in Phase 1.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground tracking-tight mb-3">Contact</h2>
            <p>For privacy-related questions, reach us at <a href="/contact" className="text-primary underline underline-offset-2">our contact page</a>.</p>
          </section>
        </div>
      </div>
    </>
  )
}
