'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MobileMenu } from './MobileMenu'
import { CartDrawer } from './CartDrawer'

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const logoSrc = mounted && resolvedTheme === 'dark'
    ? '/logos/gq_dark_logo.jpg'
    : '/logos/gq_light_logo.jpg'

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
            {[
              { href: '/shop', label: 'Shop' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-sm text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            ))}
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
