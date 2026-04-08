import type { Metadata } from 'next'
import { Allura, Playfair_Display, DM_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://glitterqueencreative.com'),
  title: {
    default: 'Glitter Queen Creative',
    template: '%s — Glitter Queen Creative',
  },
  description:
    'Handcrafted jewelry and accessories made to shine. Glitz and glam for any occasion.',
  openGraph: {
    siteName: 'Glitter Queen Creative',
    images: ['/logos/gq_light_logo.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${allura.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-body bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
