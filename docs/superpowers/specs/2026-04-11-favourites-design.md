# Favourites — Design Spec

**Date:** 2026-04-11
**Scope:** Add a curated Favourites section to the site — dedicated page, navbar link, categories dropdown, and a Favourites pill in the shop filter bar. Fifteen client-supplied images are mapped to the product catalog; 5 existing products gain a supplementary image and a `favorite` flag; 10 new placeholder product entries are added.

---

## Guiding Principle

The client sent 15 images as her personal curated picks. Rather than a separate image gallery, the Favourites section surfaces products from the existing catalog. Every favourites image maps to a product page. The `favorite` field in `products.json` is the single source of truth — the same pattern already used by `featured`.

---

## Data Layer

### `types/product.ts`

Add one optional field:

```ts
favorite?: boolean
```

### `lib/products.ts`

Add one function immediately after `getFeaturedProducts`:

```ts
export function getFavorites(): Product[] {
  return products.filter(p => p.favorite === true)
}
```

### `data/products.json`

**Existing products — add `"favorite": true` and supplementary image:**

| slug | supplementary image (source → dest) |
|---|---|
| `cookie-monster-rhinestone-cap` | `bde0a69d…jpg` → `public/products/cookie-monster-rhinestone-cap/2.jpg` |
| `floral-sunglass-chain-set` | `482a258e…jpg` → `public/products/floral-sunglass-chain-set/2.jpg` |
| `lace-bunny-ear-headband` | `0bc4a549…jpg` → `public/products/lace-bunny-ear-headband/2.jpg` |
| `pink-floral-parasol` | `19ac78f8…jpg` → `public/products/pink-floral-parasol/2.jpg` |
| `rainbow-feather-ear-cuff` | `82e09815…jpg` → `public/products/rainbow-feather-ear-cuff/2.jpg` |

Each of these products gets `"favorite": true` added and their `images` array extended from `["1.jpg"]` to `["1.jpg", "2.jpg"]`.

**New placeholder products — all with `"favorite": true`:**

| id | slug | name | category | price | badge | source image → dest |
|---|---|---|---|---|---|---|
| 15 | `pink-unicorn-horn-headband` | Pink Unicorn Horn Headband | hats | 65.00 | New | `39b51ff8…jpg` → `1.jpg` |
| 16 | `grey-gold-unicorn-horn-headband` | Grey & Gold Unicorn Horn Headband | hats | 65.00 | New | `a565cb94…jpg` → `1.jpg` |
| 17 | `amethyst-sunglass-chain` | Amethyst Sunglass Chain | sunglasses | 58.00 | New | `0a75480c…jpg` → `1.jpg` |
| 18 | `labradorite-sunglass-chain` | Labradorite & Gold Sunglass Chain | sunglasses | 58.00 | New | `da1e95b1…jpg` → `1.jpg` |
| 19 | `sapphire-flower-of-life-necklace` | Sapphire Flower of Life Necklace | earrings-jewelry | 72.00 | New | `7a2b632f…jpg` → `1.jpg` |
| 20 | `dark-gemstone-bead-bracelet` | Dark Gemstone Bead Bracelet | earrings-jewelry | 45.00 | New | `53721d20…jpg` → `1.jpg` |
| 21 | `ocean-gemstone-bead-bracelet` | Ocean Gemstone Bead Bracelet | earrings-jewelry | 45.00 | New | `d0f65ab5…jpg` → `1.jpg` |
| 22 | `galaxy-resin-diamond-earrings` | Galaxy Resin Diamond Earrings | earrings-jewelry | 35.00 | New | `b06375df…jpg` → `1.jpg` |
| 23 | `fur-pom-pom-clips` | Fur Pom-Pom Clips | earrings-jewelry | 28.00 | New | `7dfdff9b…jpg` → `1.jpg` |
| 24 | `black-rhinestone-military-cap` | Black Rhinestone Military Cap | hats | 155.00 | Limited | `623714da…jpg` → `1.jpg` |

Placeholder descriptions are best-guess from the images; the client should review and update prices, descriptions, and `inStock` before launch.

---

## Image Handling

Source folder: `products/favourites/` (project root, not served)
Destination: `public/products/{slug}/` (Next.js static serving)

Copy (not move) so the source folder remains as a reference. Rename to `1.jpg` for new products, `2.jpg` for supplementary shots on existing products.

No changes to the `ProductDetail` image gallery — it already iterates `product.images`, so adding `"2.jpg"` to the array automatically surfaces the second image there.

---

## `/favorites` Page

**File:** `app/(site)/favorites/page.tsx`

Server component. No `Suspense` needed (no `useSearchParams`). Mirrors the shop page layout but without `FilterBar`.

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

---

## Navigation Changes

### Desktop Navbar (`components/layout/Navbar.tsx`)

Three additions to the existing client component:

**1. `categoriesOpen` state + `ChevronDown` import**

```tsx
import { ShoppingBag, Menu, Sun, Moon, ChevronDown } from 'lucide-react'
// ...
const [categoriesOpen, setCategoriesOpen] = useState(false)
```

**2. Categories dropdown + Favourites link** replace the current static link list:

```tsx
<div className="hidden md:flex items-center gap-8">
  <Link href="/shop" className={navLinkClass}>Shop</Link>

  {/* Categories dropdown */}
  <div className="relative">
    <button
      onClick={() => setCategoriesOpen(o => !o)}
      className={cn(navLinkClass, 'flex items-center gap-1')}
      aria-expanded={categoriesOpen}
      aria-haspopup="true"
    >
      Categories <ChevronDown className="w-3.5 h-3.5" />
    </button>
    {categoriesOpen && (
      <>
        <div className="fixed inset-0 z-30" onClick={() => setCategoriesOpen(false)} aria-hidden />
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
```

Where `navLinkClass` is extracted as a top-level `const` inside the `Navbar` function scope (not module scope, to avoid exporting it):

```tsx
const navLinkClass = "font-body text-sm text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
```

And `CATEGORIES` is defined at module scope (outside the component, since it never changes):

```tsx
const CATEGORIES = [
  { href: '/shop?category=parasols',        label: 'Parasols' },
  { href: '/shop?category=hats',            label: 'Hats' },
  { href: '/shop?category=sunglasses',      label: 'Sunglasses' },
  { href: '/shop?category=earrings-jewelry',label: 'Jewelry' },
  { href: '/shop?category=apparel',         label: 'Apparel' },
]
```

Close the dropdown on Escape — add to the existing `useEffect` or a new one watching `categoriesOpen`.

### Mobile Menu (`components/layout/MobileMenu.tsx`)

Replace the static link array with individual `<Link>` entries plus category sub-links:

```tsx
<nav className="flex flex-col gap-7 mt-14" aria-label="Mobile navigation">
  <Link href="/shop" onClick={onClose} className={mobileNavClass}>Shop</Link>

  <div className="flex flex-col gap-3">
    <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">Categories</span>
    {CATEGORIES.map(({ href, label }) => (
      <Link key={href} href={href} onClick={onClose}
        className="font-body text-lg text-foreground hover:text-primary transition-colors leading-none pl-2">
        {label}
      </Link>
    ))}
  </div>

  <Link href="/favorites" onClick={onClose} className={mobileNavClass}>Favourites</Link>
  <Link href="/about" onClick={onClose} className={mobileNavClass}>About</Link>
  <Link href="/contact" onClick={onClose} className={mobileNavClass}>Contact</Link>
</nav>
```

`CATEGORIES` is defined once in a shared constant or duplicated in MobileMenu (YAGNI — no shared nav config file for just two consumers).

---

## Shop Page — FilterBar

**File:** `components/shop/FilterBar.tsx`

Add a `<Link>` to `/favorites` styled as a pill, appended after the existing category pills. It is not a toggle button — it navigates away.

```tsx
import Link from 'next/link'
// ...
// After the FILTERS.map(...)
<Link
  href="/favorites"
  className="px-4 py-1.5 rounded-full text-sm font-body border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors duration-200 shrink-0"
>
  Favourites
</Link>
```

No `aria-pressed` — it is a link, not a toggle.

---

## Tests

### `__tests__/lib/products.test.ts`

- Update `getProducts` count assertion: `14` → `24`
- Add `describe('getFavorites', ...)`:

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

### No new component tests

`FavouritesPage` is a simple server component wrapping `ProductGrid` (already tested indirectly). `FilterBar` link addition is presentational and covered by the data-layer tests confirming products exist.

---

## What Stays the Same

- `generateStaticParams` in `app/(site)/shop/[slug]/page.tsx` already iterates `getProducts()` — new products are automatically pre-rendered at build time once added to the JSON.
- `ProductCard`, `ProductGrid`, `ProductDetail` — no changes.
- `ShopClient` filtering — no changes; `getFavorites()` is only called from the new favourites page.
