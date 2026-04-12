'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MobileMenu } from './MobileMenu'
import { CartDrawer } from './CartDrawer'

const CATEGORIES = [
  { href: '/shop?category=parasols',          label: 'Parasols' },
  { href: '/shop?category=hats',              label: 'Hats' },
  { href: '/shop?category=sunglasses',        label: 'Sunglasses' },
  { href: '/shop?category=earrings-jewelry',  label: 'Jewelry' },
  { href: '/shop?category=apparel',           label: 'Apparel' },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!categoriesOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setCategoriesOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [categoriesOpen])

  const logoSrc = mounted && resolvedTheme === 'dark'
    ? '/logos/gq_dark_logo.jpg'
    : '/logos/gq_light_logo.jpg'

  const navLinkClass = "font-body text-sm text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="section-inner flex items-center justify-between h-16 px-6 md:px-10">
          <Link href="/" className="flex-shrink-0" aria-label="Glitter Queen Creative home">
            {mounted && (
              <Image
                src={logoSrc}
                alt="Glitter Queen Creative"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className={navLinkClass}>Shop</Link>

            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(o => !o)}
                className={`${navLinkClass} flex items-center gap-1`}
                aria-expanded={categoriesOpen}
              >
                Categories <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {categoriesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCategoriesOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute top-full left-0 mt-2 w-44 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
                    {CATEGORIES.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2 text-sm font-body text-foreground hover:text-primary hover:bg-muted transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/favorites" className={navLinkClass}>Favourites</Link>
            <Link href="/about" className={navLinkClass}>About</Link>
            <Link href="/contact" className={navLinkClass}>Contact</Link>
          </div>

          <div className="flex items-center gap-1">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full"
                aria-label="Toggle colour scheme"
              >
                {resolvedTheme === 'dark'
                  ? <Sun className="w-4 h-4" />
                  : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors rounded-full"
              aria-label="Open bag"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-foreground rounded-full"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
