# Favourites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a curated Favourites section — dedicated `/favorites` page, navbar Favourites link and Categories dropdown, and a Favourites pill in the shop filter bar — backed by a `favorite` flag in `data/products.json`.

**Architecture:** `favorite?: boolean` is added to the `Product` type and `data/products.json` (5 existing products marked, 10 new stubs added). `getFavorites()` filters the array — the same pattern as `getFeaturedProducts()`. The `/favorites` page is a static server component. The navbar gains a click-to-open Categories dropdown and a Favourites link; the mobile menu gains matching links. The shop FilterBar gains a Favourites pill that navigates to `/favorites`.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, Vitest + Testing Library

---

## File Map

**Modified:**
- `types/product.ts` — add `favorite?: boolean`
- `lib/products.ts` — add `getFavorites()`
- `data/products.json` — mark 5 existing products as favorites, append 10 new stub products
- `__tests__/lib/products.test.ts` — add `getFavorites` tests, update `getProducts` count
- `components/layout/Navbar.tsx` — add Categories dropdown + Favourites link
- `components/layout/MobileMenu.tsx` — add CATEGORIES constant, Favourites link, category sub-links
- `components/shop/FilterBar.tsx` — add Favourites pill Link

**Created:**
- `app/(site)/favorites/page.tsx` — static favourites page

**Image copies (not committed via git add, just `cp`):**
- `products/favourites/*.jpg` → `public/products/{slug}/1.jpg` (new products) or `2.jpg` (supplementary)

---

## Task 1: Data layer — type, `getFavorites()`, products.json, images

**Files:**
- Modify: `types/product.ts`
- Modify: `lib/products.ts`
- Modify: `data/products.json`
- Test: `__tests__/lib/products.test.ts`

- [ ] **Step 1: Add `favorite` field to `types/product.ts`**

Replace the file with:

```ts
export type ProductCategory =
  | 'hats'
  | 'parasols'
  | 'earrings-jewelry'
  | 'sunglasses'
  | 'apparel'

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number       // dollars, e.g. 85.00
  category: ProductCategory
  images: string[]   // filenames relative to /public/products/{slug}/
  featured?: boolean
  favorite?: boolean
  badge?: string     // e.g. "New", "Limited"
  inStock?: boolean
}
```

- [ ] **Step 2: Write failing `getFavorites` tests in `__tests__/lib/products.test.ts`**

Add these imports and describe block at the end of the existing file:

```ts
import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
  getRelatedProducts,
  getFavorites,
} from '@/lib/products'
```

(Update the existing import line — add `getFavorites` to it.)

Then append at the end of the file:

```ts
describe('getFavorites', () => {
  it('returns only products with favorite true', () => {
    const result = getFavorites()
    expect(result.every(p => p.favorite === true)).toBe(true)
  })

  it('returns at least one product', () => {
    expect(getFavorites().length).toBeGreaterThan(0)
  })

  it('includes cookie-monster-rhinestone-cap', () => {
    const slugs = getFavorites().map(p => p.slug)
    expect(slugs).toContain('cookie-monster-rhinestone-cap')
  })
})
```

- [ ] **Step 3: Run tests to confirm failure**

```bash
npx vitest run __tests__/lib/products.test.ts
```

Expected: FAIL — `getFavorites is not a function`

- [ ] **Step 4: Add `getFavorites()` to `lib/products.ts`**

Add immediately after `getFeaturedProducts`:

```ts
export function getFavorites(): Product[] {
  return products.filter(p => p.favorite === true)
}
```

The full `lib/products.ts` after this change:

```ts
// lib/products.ts
import productsData from '@/data/products.json'
import type { Product, ProductCategory } from '@/types/product'

const products = productsData as Product[]

export function getProducts(category?: ProductCategory): Product[] {
  if (!category) return products
  return products.filter(p => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured === true)
}

export function getFavorites(): Product[] {
  return products.filter(p => p.favorite === true)
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.badge === 'New')
}

export function getRelatedProducts(current: Product): Product[] {
  return products
    .filter(p => p.category === current.category && p.slug !== current.slug)
    .slice(0, 3)
}
```

- [ ] **Step 5: Update `data/products.json`**

Replace the entire file. Changes to existing products: `cookie-monster-rhinestone-cap`, `rainbow-feather-ear-cuff`, `floral-sunglass-chain-set`, `lace-bunny-ear-headband`, and `pink-floral-parasol` each gain `"favorite": true` and `"2.jpg"` added to their `images` array. Ten new products are appended (IDs 15–24).

```json
[
  {
    "id": "1",
    "slug": "rainbow-parasol",
    "name": "Rainbow Fringe Parasol",
    "category": "parasols",
    "price": 95.00,
    "description": "A vibrant hand-dyed rainbow parasol with intricate lace detailing and dramatic black fringe trim. A true statement piece for festivals, events, or outdoor occasions.",
    "images": ["1.jpg"],
    "featured": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "2",
    "slug": "cookie-monster-rhinestone-cap",
    "name": "Cookie Monster Rhinestone Cap",
    "category": "hats",
    "price": 120.00,
    "description": "Hand-bedazzled snapback featuring a Cookie Monster face crafted from thousands of AB iridescent rhinestones, with gold braid trim and blue teardrop fringe brim.",
    "images": ["1.jpg", "2.jpg"],
    "featured": true,
    "favorite": true,
    "badge": "Limited",
    "inStock": true
  },
  {
    "id": "3",
    "slug": "midnight-lace-parasol",
    "name": "Midnight Lace Parasol",
    "category": "parasols",
    "price": 85.00,
    "description": "Gothic-inspired black parasol with rich lace overlay and velvet floral accents. Handcrafted for those who dare to be dramatic.",
    "images": ["1.jpg"],
    "featured": false,
    "inStock": true
  },
  {
    "id": "4",
    "slug": "rhinestone-flower-sunglasses-round",
    "name": "Rhinestone Floral Round Sunglasses",
    "category": "sunglasses",
    "price": 55.00,
    "description": "Round-frame sunglasses adorned with hand-placed rhinestones and fabric floral clusters. Available in lavender, dusty blue, and mixed colourways.",
    "images": ["1.jpg"],
    "featured": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "5",
    "slug": "rainbow-feather-ear-cuff",
    "name": "Rainbow Feather Ear Cuff",
    "category": "earrings-jewelry",
    "price": 38.00,
    "description": "Dramatic feather ear cuffs in bold rainbow or natural earth tones, accented with rhinestones and gold chain detail. No piercing required.",
    "images": ["1.jpg", "2.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "6",
    "slug": "gold-mirror-mosaic-top",
    "name": "Gold Mirror Mosaic Festival Top",
    "category": "apparel",
    "price": 145.00,
    "description": "Showstopping festival top handcrafted with individually placed gold mirror mosaic tiles and gold spike shoulder accents. Guaranteed to catch every light.",
    "images": ["1.jpg"],
    "featured": true,
    "badge": "Limited",
    "inStock": true
  },
  {
    "id": "7",
    "slug": "amethyst-moth-drop-earrings",
    "name": "Amethyst Moth Drop Earrings",
    "category": "earrings-jewelry",
    "price": 42.00,
    "description": "Statement drop earrings featuring a faceted amethyst gemstone and gold filigree moth with trailing chain detail. Approximately 10cm drop, hook fitting.",
    "images": ["1.jpg"],
    "featured": true,
    "inStock": true
  },
  {
    "id": "8",
    "slug": "moon-phase-amethyst-necklace",
    "name": "Moon Phase Amethyst Necklace",
    "category": "earrings-jewelry",
    "price": 48.00,
    "description": "Celestial gold moon phase pendant with a raw amethyst crystal point and cascading gold chain fringe. Worn on a simple black cord.",
    "images": ["1.jpg"],
    "featured": false,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "9",
    "slug": "floral-sunglass-chain-set",
    "name": "Floral Sunglass & Chain Set",
    "category": "sunglasses",
    "price": 65.00,
    "description": "Pink flower-frame sunglasses paired with a handcrafted eyeglass chain featuring amethyst cabochons, turquoise beads, and gold mandala charms.",
    "images": ["1.jpg", "2.jpg"],
    "featured": false,
    "favorite": true,
    "inStock": true
  },
  {
    "id": "10",
    "slug": "iridescent-rhinestone-cap",
    "name": "Iridescent Rhinestone Cap",
    "category": "hats",
    "price": 135.00,
    "description": "Midnight-base snapback encrusted in iridescent AB rhinestones with a hand-beaded lavender floral centrepiece and gold leaf fringe brim.",
    "images": ["1.jpg"],
    "featured": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "11",
    "slug": "lace-bunny-ear-headband",
    "name": "Lace Bunny Ear Headband",
    "category": "hats",
    "price": 58.00,
    "description": "Whimsical lace and organza bunny ear headband with a soft pink satin bow and hand-placed floral and pearl embellishments.",
    "images": ["1.jpg", "2.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "12",
    "slug": "gold-black-floral-sunglasses",
    "name": "Gold & Black Floral Sunglasses",
    "category": "sunglasses",
    "price": 62.00,
    "description": "Rectangular frames adorned with bold black and gold fabric flowers, gold filigree leaves, and rhinestone accents. Bold, editorial, unforgettable.",
    "images": ["1.jpg"],
    "featured": false,
    "inStock": true
  },
  {
    "id": "13",
    "slug": "mushroom-garden-sunglasses",
    "name": "Mushroom Garden Round Sunglasses",
    "category": "sunglasses",
    "price": 60.00,
    "description": "Oversized round frames with rhinestone rims, embellished with a whimsical hand-applied mushroom and wildflower garden in red, white, and blue.",
    "images": ["1.jpg"],
    "featured": false,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "14",
    "slug": "pink-floral-parasol",
    "name": "Pink Floral Garden Parasol",
    "category": "parasols",
    "price": 110.00,
    "description": "Utterly romantic parasol blanketed in hand-arranged silk roses, ranunculus, and wildflowers in blush and coral tones, finished with a delicate lace-trimmed hem.",
    "images": ["1.jpg", "2.jpg"],
    "featured": true,
    "favorite": true,
    "inStock": true
  },
  {
    "id": "15",
    "slug": "pink-unicorn-horn-headband",
    "name": "Pink Unicorn Horn Headband",
    "category": "hats",
    "price": 65.00,
    "description": "Whimsical rose gold unicorn horn headband with plush black faux-fur ears and metallic rose gold detailing. A magical finishing touch for any festival or event look.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "16",
    "slug": "grey-gold-unicorn-horn-headband",
    "name": "Grey & Gold Unicorn Horn Headband",
    "category": "hats",
    "price": 65.00,
    "description": "Handcrafted unicorn horn headband in slate grey with gold sequin accents and natural feather side details. Elegant and otherworldly.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "17",
    "slug": "amethyst-sunglass-chain",
    "name": "Amethyst Sunglass Chain",
    "category": "sunglasses",
    "price": 58.00,
    "description": "Luxurious sunglass chain featuring faceted black amethyst cabochons and delicate gold link chain. Doubles as a statement necklace.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "18",
    "slug": "labradorite-sunglass-chain",
    "name": "Labradorite & Gold Sunglass Chain",
    "category": "sunglasses",
    "price": 58.00,
    "description": "Elegant sunglass chain with faceted labradorite gemstone drops and matte gold hexagon charm accents. Sophisticated and versatile.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "19",
    "slug": "sapphire-flower-of-life-necklace",
    "name": "Sapphire Flower of Life Necklace",
    "category": "earrings-jewelry",
    "price": 72.00,
    "description": "Long statement necklace with faceted blue sapphire drops, emerald beads, and gold flower-of-life mandala charm accents. Approximately 80cm length.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "20",
    "slug": "dark-gemstone-bead-bracelet",
    "name": "Dark Gemstone Bead Bracelet",
    "category": "earrings-jewelry",
    "price": 45.00,
    "description": "Handstrung stretch bracelet featuring dark labradorite, amethyst, and smoky quartz beads with gold rondelle spacers.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "21",
    "slug": "ocean-gemstone-bead-bracelet",
    "name": "Ocean Gemstone Bead Bracelet",
    "category": "earrings-jewelry",
    "price": 45.00,
    "description": "Handstrung stretch bracelet with blue apatite, labradorite, and white howlite beads with silver rondelle spacers.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "22",
    "slug": "galaxy-resin-diamond-earrings",
    "name": "Galaxy Resin Diamond Earrings",
    "category": "earrings-jewelry",
    "price": 35.00,
    "description": "Diamond-shaped resin earrings in deep violet with embedded holographic glitter and iridescent foil details. Lightweight hook fitting.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "23",
    "slug": "fur-pom-pom-clips",
    "name": "Fur Pom-Pom Clips",
    "category": "earrings-jewelry",
    "price": 28.00,
    "description": "Set of mini faux-fur pom-pom clips in assorted colourways — mint, burgundy, taupe, lavender, and blue-pink. Clip onto hats, bags, or hair.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "New",
    "inStock": true
  },
  {
    "id": "24",
    "slug": "black-rhinestone-military-cap",
    "name": "Black Rhinestone Military Cap",
    "category": "hats",
    "price": 155.00,
    "description": "Dramatic military-peaked cap blanketed in silver and AB rhinestones with ornate silver filigree embellishments and chain detail. A statement piece for the bold.",
    "images": ["1.jpg"],
    "featured": false,
    "favorite": true,
    "badge": "Limited",
    "inStock": true
  }
]
```

- [ ] **Step 6: Update `getProducts` count test in `__tests__/lib/products.test.ts`**

Change the count from 14 to 24:

```ts
it('returns all 24 products when no category provided', () => {
  expect(getProducts()).toHaveLength(24)
})
```

- [ ] **Step 7: Run full test suite to confirm all pass**

```bash
npm run test:run
```

Expected: all tests pass (previous count was 36; the new `getFavorites` tests add 3 more, total 39)

- [ ] **Step 8: Copy favourites images to `public/products/`**

Run these commands from the project root:

```bash
# Supplementary images for existing products (→ 2.jpg)
cp products/favourites/bde0a69d-9e95-46af-97f4-afb18d839671.jpg public/products/cookie-monster-rhinestone-cap/2.jpg
cp products/favourites/482a258e-f6d9-4690-9e83-bff886244942.jpg public/products/floral-sunglass-chain-set/2.jpg
cp products/favourites/0bc4a549-6a7f-47a8-91a3-c6ed2ec275a9.jpg public/products/lace-bunny-ear-headband/2.jpg
cp products/favourites/19ac78f8-3f0d-41db-85ee-b5af46bb04c3.jpg public/products/pink-floral-parasol/2.jpg
cp products/favourites/82e09815-f426-4d8a-b6e2-a81d53c208ca.jpg public/products/rainbow-feather-ear-cuff/2.jpg

# New product images — create directories and copy as 1.jpg
mkdir -p public/products/pink-unicorn-horn-headband
cp products/favourites/39b51ff8-e95a-4da6-b040-492748568606.jpg public/products/pink-unicorn-horn-headband/1.jpg

mkdir -p public/products/grey-gold-unicorn-horn-headband
cp products/favourites/a565cb94-f416-4695-8bd3-8967becdf32c.jpg public/products/grey-gold-unicorn-horn-headband/1.jpg

mkdir -p public/products/amethyst-sunglass-chain
cp products/favourites/0a75480c-9d0e-415e-9568-be7a84e72786.jpg public/products/amethyst-sunglass-chain/1.jpg

mkdir -p public/products/labradorite-sunglass-chain
cp products/favourites/da1e95b1-e7fa-41db-b919-c77eae4c724e.jpg public/products/labradorite-sunglass-chain/1.jpg

mkdir -p public/products/sapphire-flower-of-life-necklace
cp products/favourites/7a2b632f-319e-4a0f-8904-3cd2fc43bbae.jpg public/products/sapphire-flower-of-life-necklace/1.jpg

mkdir -p public/products/dark-gemstone-bead-bracelet
cp products/favourites/53721d20-f9dd-4683-bf1e-5e497eff2368.jpg public/products/dark-gemstone-bead-bracelet/1.jpg

mkdir -p public/products/ocean-gemstone-bead-bracelet
cp products/favourites/d0f65ab5-8820-49f9-812e-0666d4fc6def.jpg public/products/ocean-gemstone-bead-bracelet/1.jpg

mkdir -p public/products/galaxy-resin-diamond-earrings
cp products/favourites/b06375df-798e-4aad-a688-56f86109d55c.jpg public/products/galaxy-resin-diamond-earrings/1.jpg

mkdir -p public/products/fur-pom-pom-clips
cp products/favourites/7dfdff9b-cba7-4104-a500-53086cf03a6b.jpg public/products/fur-pom-pom-clips/1.jpg

mkdir -p public/products/black-rhinestone-military-cap
cp products/favourites/623714da-35b2-4fff-b642-3853a7f30cdb.jpg public/products/black-rhinestone-military-cap/1.jpg
```

- [ ] **Step 9: Commit**

```bash
git add types/product.ts lib/products.ts data/products.json __tests__/lib/products.test.ts public/products/
git commit -m "feat: add favorite field, getFavorites(), 10 new products, and product images"
```

---

## Task 2: `/favorites` page

**Files:**
- Create: `app/(site)/favorites/page.tsx`

**Context:** Routes live under `app/(site)/`. The `(site)` route group applies the shared layout (AnnouncementBar → Navbar → `<main>` → Footer) without affecting the URL. This is a server component — no `'use client'` directive. `ProductGrid` is at `components/shop/ProductGrid.tsx` and accepts `{ products: Product[] }`.

- [ ] **Step 1: Create `app/(site)/favorites/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { getFavorites } from '@/lib/products'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProductGrid } from '@/components/shop/ProductGrid'

export const metadata: Metadata = {
  title: 'Favourites',
  description: 'Our curated selection of most-loved handcrafted pieces.',
}

export default function FavouritesPage() {
  const products = getFavorites()
  return (
    <>
      <PageHeader
        title="Favourites"
        subtitle="Our most-loved pieces, curated by the maker."
      />
      <div className="section-outer no-divider">
        <div className="section-inner">
          <ProductGrid products={products} />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify the build succeeds**

```bash
npm run build
```

Expected: no errors; `app/(site)/favorites` appears in the build output as a static route.

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/favorites/page.tsx
git commit -m "feat: add /favorites static page"
```

---

## Task 3: Navbar — Categories dropdown + Favourites link

**Files:**
- Modify: `components/layout/Navbar.tsx`

**Context:** `Navbar.tsx` is already `'use client'`. It currently maps over a static array of `{ href, label }` objects to render the desktop nav links. The `ChevronDown` icon from `lucide-react` is not yet imported. The component already imports `useState` and `useEffect` from `react`.

A click-to-open dropdown is used (not hover) for keyboard and touch accessibility. A full-page transparent overlay (`fixed inset-0`) sits below the panel and closes it on outside click — the same pattern used by `MobileMenu` and `CartDrawer`.

- [ ] **Step 1: Replace `components/layout/Navbar.tsx`**

```tsx
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
                aria-haspopup="true"
              >
                Categories <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {categoriesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setCategoriesOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute top-full left-0 mt-2 w-44 bg-popover border border-border rounded-lg shadow-lg z-40 py-1">
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
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Categories dropdown and Favourites link to navbar"
```

---

## Task 4: MobileMenu — Category links + Favourites link

**Files:**
- Modify: `components/layout/MobileMenu.tsx`

**Context:** The current mobile menu maps over `[{ href: '/shop', label: 'Shop' }, ...]` and renders `<Link>` elements with class `font-display text-2xl ...`. We replace this with explicit links plus a categories sub-section. `CATEGORIES` is defined at module scope (same values as in `Navbar.tsx` — duplicated per YAGNI rather than extracting a shared config file).

- [ ] **Step 1: Replace `components/layout/MobileMenu.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useEffect } from 'react'

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

const CATEGORIES = [
  { href: '/shop?category=parasols',          label: 'Parasols' },
  { href: '/shop?category=hats',              label: 'Hats' },
  { href: '/shop?category=sunglasses',        label: 'Sunglasses' },
  { href: '/shop?category=earrings-jewelry',  label: 'Jewelry' },
  { href: '/shop?category=apparel',           label: 'Apparel' },
]

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const mainLinkClass = "font-display text-2xl text-foreground hover:text-primary transition-colors leading-none"

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden={true} />
      <div className="relative ml-auto w-72 h-full bg-background flex flex-col p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <nav className="flex flex-col gap-7 mt-14" aria-label="Mobile navigation">
          <Link href="/shop" onClick={onClose} className={mainLinkClass}>Shop</Link>

          <div className="flex flex-col gap-3">
            <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Categories
            </span>
            {CATEGORIES.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="font-body text-lg text-foreground hover:text-primary transition-colors leading-none pl-2"
              >
                {label}
              </Link>
            ))}
          </div>

          <Link href="/favorites" onClick={onClose} className={mainLinkClass}>Favourites</Link>
          <Link href="/about" onClick={onClose} className={mainLinkClass}>About</Link>
          <Link href="/contact" onClick={onClose} className={mainLinkClass}>Contact</Link>
        </nav>

        <div className="mt-auto flex items-center gap-5 pb-4">
          <a href="https://www.instagram.com/glitterqueencreative?igsh=eWJ3MzlibGtoNHhi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/share/1AhWYYXde9/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <FacebookIcon />
          </a>
          <a href="https://www.tiktok.com/@glitterqueencreative?_r=1&_t=ZS-95MOzWoPvlt" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden={true}>
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.27 8.27 0 0 0 4.84 1.54V6.84a4.85 4.85 0 0 1-4.07-.15z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/layout/MobileMenu.tsx
git commit -m "feat: add Favourites link and category sub-links to mobile menu"
```

---

## Task 5: FilterBar — Favourites pill

**Files:**
- Modify: `components/shop/FilterBar.tsx`

**Context:** `FilterBar` renders a scrollable row of pill buttons that filter the shop by category. Adding a Favourites pill means appending a `<Link>` (not a `<button>`) styled identically to the inactive state of the existing pills. It navigates to `/favorites`; it does not toggle any filter state and has no `aria-pressed`.

- [ ] **Step 1: Replace `components/shop/FilterBar.tsx`**

```tsx
// components/shop/FilterBar.tsx
'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ProductCategory } from '@/types/product'

type FilterValue = ProductCategory | 'all'

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'hats', label: 'Hats' },
  { value: 'parasols', label: 'Parasols' },
  { value: 'earrings-jewelry', label: 'Jewelry' },
  { value: 'sunglasses', label: 'Sunglasses' },
  { value: 'apparel', label: 'Apparel' },
]

type FilterBarProps = {
  active: FilterValue
  onChange: (value: FilterValue) => void
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 -mb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by category">
      {FILTERS.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          aria-pressed={active === filter.value}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-body border transition-colors duration-200 shrink-0',
            active === filter.value
              ? 'bg-primary-soft text-primary border-primary'
              : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
          )}
        >
          {filter.label}
        </button>
      ))}
      <Link
        href="/favorites"
        className="px-4 py-1.5 rounded-full text-sm font-body border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors duration-200 shrink-0"
      >
        Favourites
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
npm run test:run
```

Expected: all 39 tests pass

- [ ] **Step 3: Commit**

```bash
git add components/shop/FilterBar.tsx
git commit -m "feat: add Favourites link pill to shop filter bar"
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| `favorite?: boolean` on `Product` type | Task 1 ✓ |
| `getFavorites()` in `lib/products.ts` | Task 1 ✓ |
| 5 existing products marked + 2nd image added | Task 1 ✓ |
| 10 new stub products added to `products.json` | Task 1 ✓ |
| Images copied from `products/favourites/` to `public/products/` | Task 1 ✓ |
| `getFavorites` tests + `getProducts` count updated | Task 1 ✓ |
| `/favorites` static page with `PageHeader` + `ProductGrid` | Task 2 ✓ |
| Navbar: Favourites link | Task 3 ✓ |
| Navbar: Categories click-to-open dropdown | Task 3 ✓ |
| MobileMenu: Favourites link + CATEGORIES sub-links | Task 4 ✓ |
| FilterBar: Favourites pill `<Link>` to `/favorites` | Task 5 ✓ |

**Placeholder scan:** No TBD, TODO, or incomplete steps. All code blocks are complete.

**Type consistency:** `Product.favorite` used as `p.favorite === true` in `getFavorites()` and in the test assertions — consistent. `CATEGORIES` array shape `{ href, label }` used identically in both Navbar and MobileMenu. `ProductGrid` accepts `{ products: Product[] }` — same as used in `FavouritesPage`.
