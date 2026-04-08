import Link from 'next/link'
import Image from 'next/image'

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden={true}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden={true}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.27 8.27 0 0 0 4.84 1.54V6.84a4.85 4.85 0 0 1-4.07-.15z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="section-inner section-outer">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Image
              src="/logos/gq_light_logo_wreath.jpg"
              alt="Glitter Queen Creative"
              width={90}
              height={90}
              className="mb-4 rounded-full"
            />
            <p className="font-body text-sm text-muted-foreground leading-7">
              Handcrafted jewelry and accessories made to shine. Glitz and glam for any occasion.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/shop?category=hats', label: 'Hats' },
                { href: '/shop?category=parasols', label: 'Parasols' },
                { href: '/shop?category=earrings-jewelry', label: 'Jewelry' },
                { href: '/shop?category=sunglasses', label: 'Sunglasses' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-foreground mb-4">Connect</h4>
            <div className="flex gap-4 mb-6">
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
            <ul className="space-y-2">
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/shipping-returns', label: 'Shipping & Returns' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Glitter Queen Creative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
