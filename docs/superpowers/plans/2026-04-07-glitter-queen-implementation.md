# Glitter Queen Creative — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full Phase 1 Glitter Queen Creative storefront — a statically generated Next.js 15 site with 14 mock products, dark/light mode, and ecommerce placeholders.

**Architecture:** App Router with a `(site)` route group for the site shell (AnnouncementBar, Navbar, Footer). All routes are statically generated. Product data is served from a static JSON file via pure functions in `lib/products.ts`. UI primitives come from shadcn/ui, styled with Tailwind CSS v4 custom properties.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, next-themes, Allura + Playfair Display + DM Sans (next/font/google), Vitest + Testing Library, Vercel deployment.

---

## File Map

**New files:**
- `types/product.ts`
- `data/products.json`
- `lib/utils.ts`
- `lib/products.ts`
- `vitest.config.ts`
- `vitest.setup.ts`
- `__tests__/lib/utils.test.ts`
- `__tests__/lib/products.test.ts`
- `__tests__/components/ProductCard.test.tsx`
- `__tests__/components/ProductGrid.test.tsx`
- `components/providers/theme-provider.tsx`
- `components/layout/AnnouncementBar.tsx`
- `components/layout/CartDrawer.tsx`
- `components/layout/MobileMenu.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/shared/Breadcrumbs.tsx`
- `components/shared/CTABanner.tsx`
- `components/shared/EmptyState.tsx`
- `components/shared/PageHeader.tsx`
- `components/shared/SectionHeading.tsx`
- `components/shop/FilterBar.tsx`
- `components/shop/ProductCard.tsx`
- `components/shop/ProductGrid.tsx`
- `components/shop/ShopClient.tsx`
- `components/home/BrandStoryPreview.tsx`
- `components/home/FeaturedCollection.tsx`
- `components/home/HeroSection.tsx`
- `components/home/LifestyleSection.tsx`
- `components/home/NewArrivals.tsx`
- `components/home/NewsletterSignup.tsx`
- `components/home/Testimonials.tsx`
- `components/home/ValueProps.tsx`
- `components/product/ImageGallery.tsx`
- `components/product/ProductInfo.tsx`
- `components/product/RelatedProducts.tsx`
- `app/layout.tsx`
- `app/not-found.tsx`
- `app/(site)/layout.tsx`
- `app/(site)/page.tsx`
- `app/(site)/shop/page.tsx`
- `app/(site)/shop/[slug]/page.tsx`
- `app/(site)/about/page.tsx`
- `app/(site)/contact/page.tsx`
- `app/(site)/faq/page.tsx`
- `app/(site)/shipping-returns/page.tsx`
- `app/(site)/privacy-policy/page.tsx`
- `app/(site)/terms/page.tsx`
- `public/logos/gq_light_logo.jpg`
- `public/logos/gq_dark_logo.jpg`
- `public/logos/gq_light_logo_wreath.jpg`
- `public/products/{14 slugs}/1.jpg`
- `public/products/placeholder.jpg`
- `public/lifestyle/parasol-lifestyle.jpg`

**Modified files:**
- `app/globals.css` — full replacement with brand tokens + Tailwind v4 theme
- `package.json` — add test scripts

---

## Product Catalogue Reference

All 14 products mapped from repo filename → slug → category:

| Repo filename (prefix) | Slug | Category |
|---|---|---|
| `659773879` | `rainbow-parasol` | parasols |
| `642700874` | `cookie-monster-rhinestone-cap` | hats |
| `662368389` | `midnight-lace-parasol` | parasols |
| `664396018` | `rhinestone-flower-sunglasses-round` | sunglasses |
| `662512739` | `rainbow-feather-ear-cuff` | earrings-jewelry |
| `662453402` | `gold-mirror-mosaic-top` | apparel |
| `667723978` | `amethyst-moth-drop-earrings` | earrings-jewelry |
| `662938687` | `moon-phase-amethyst-necklace` | earrings-jewelry |
| `662524001` | `floral-sunglass-chain-set` | sunglasses |
| `666797259` | `iridescent-rhinestone-cap` | hats |
| `659515898` | `lace-bunny-ear-headband` | hats |
| `662026765` | `gold-black-floral-sunglasses` | sunglasses |
| `664427123` | `mushroom-garden-sunglasses` | sunglasses |
| `663835417` | `pink-floral-parasol` | parasols |

Note: `apparel` has been added to the `ProductCategory` union (one product: gold mirror mosaic top). The `662368389` file is also copied to `public/lifestyle/parasol-lifestyle.jpg` for the homepage lifestyle section.

---

## Task 1: Bootstrap Next.js + Install Dependencies

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts` (via create-next-app)
- Modify: `package.json` (add test scripts)

- [ ] **Step 1: Scaffold Next.js in current directory**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*"
```

When prompted about existing files, answer yes to continue. Choose: TypeScript ✓, ESLint ✓, Tailwind ✓, App Router ✓, no src/ dir, `@/*` alias.

Expected: Next.js project scaffolded, `node_modules/` installed, `app/`, `public/`, `next.config.ts`, `tailwind.config.ts` created.

- [ ] **Step 2: Install additional runtime dependencies**

```bash
npm install next-themes lucide-react sonner
```

Expected: `next-themes`, `lucide-react`, `sonner` appear in `package.json` dependencies.

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Expected: Test packages appear in `devDependencies`.

- [ ] **Step 4: Initialise shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted: Style → radix-nova (the new shadcn v4 default), Base color → Neutral, CSS variables → Yes.

Expected: `components/ui/` directory created, `globals.css` updated with shadcn tokens, `components.json` created.

- [ ] **Step 5: Add shadcn component primitives**

```bash
npx shadcn@latest add button input textarea select accordion badge sheet sonner breadcrumb skeleton
```

Expected: `components/ui/button.tsx`, `accordion.tsx`, `badge.tsx`, `sheet.tsx`, `sonner.tsx`, etc. all created.

- [ ] **Step 6: Add test scripts to package.json**

Open `package.json` and add to the `"scripts"` block:

```json
"test": "vitest",
"test:run": "vitest run",
"test:ui": "vitest --ui"
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js 15 with shadcn/ui, next-themes, Vitest"
```

---

## Task 2: Configure Design Tokens

**Files:**
- Modify: `app/globals.css` (full replacement)

- [ ] **Step 1: Replace globals.css with brand token system**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ─── Brand design tokens ─── */
:root {
  --background:         #ffffff;
  --foreground:         #1a1a1a;
  --card:               #ffffff;
  --card-foreground:    #1a1a1a;
  --primary:            #a78bfa;
  --primary-foreground: #ffffff;
  --primary-soft:       #ede9fe;
  --secondary:          #faf9f7;
  --secondary-foreground: #1a1a1a;
  --muted:              #faf9f7;
  --muted-foreground:   #6b6b6b;
  --accent:             #c9a24a;
  --accent-foreground:  #1a1a1a;
  --accent-soft:        #f5e7c6;
  --border:             #e5e5e5;
  --ring:               #a78bfa;
  --radius:             0.75rem;
}

.dark {
  --background:         #0b0b0f;
  --foreground:         #f5f5f5;
  --card:               #1c1c24;
  --card-foreground:    #f5f5f5;
  --primary:            #c4b5fd;
  --primary-foreground: #0b0b0f;
  --primary-soft:       #2e2a4a;
  --secondary:          #121217;
  --secondary-foreground: #f5f5f5;
  --muted:              #121217;
  --muted-foreground:   #a1a1aa;
  --accent:             #d4af37;
  --accent-foreground:  #f5f5f5;
  --accent-soft:        #3a2f0b;
  --border:             #2a2a2a;
  --ring:               #c4b5fd;
}

/* ─── Tailwind v4 theme mapping ─── */
@theme inline {
  /* Colors → Tailwind utilities */
  --color-background:    var(--background);
  --color-foreground:    var(--foreground);
  --color-card:          var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary:       var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-soft:  var(--primary-soft);
  --color-secondary:     var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:         var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent:        var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-soft:   var(--accent-soft);
  --color-border:        var(--border);
  --color-ring:          var(--ring);

  /* Font families */
  --font-script:  var(--font-allura),   cursive;
  --font-display: var(--font-playfair), serif;
  --font-body:    var(--font-dm-sans),  sans-serif;

  /* Border radius scale */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* ─── Base styles ─── */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-body antialiased;
  }
}

/* ─── Layout utilities ─── */
@layer utilities {
  .section-outer {
    @apply py-20 md:py-28 px-6 md:px-10;
  }
  .section-inner {
    @apply mx-auto max-w-screen-xl;
  }
  .section-gap {
    @apply mt-12 md:mt-16;
  }
}
```

- [ ] **Step 2: Verify Tailwind builds without error**

```bash
npm run dev
```

Visit `http://localhost:3000`. Expected: page loads without CSS errors in console. Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: configure Tailwind v4 brand design tokens and section utilities"
```

---

## Task 3: Types + Mock Product Data

**Files:**
- Create: `types/product.ts`
- Create: `data/products.json`

- [ ] **Step 1: Create types/product.ts**

```typescript
// types/product.ts
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
  badge?: string     // e.g. "New", "Limited"
  inStock?: boolean
}
```

- [ ] **Step 2: Create data/products.json**

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
    "images": ["1.jpg"],
    "featured": true,
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
    "images": ["1.jpg"],
    "featured": false,
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
    "images": ["1.jpg"],
    "featured": false,
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
    "images": ["1.jpg"],
    "featured": false,
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
    "images": ["1.jpg"],
    "featured": true,
    "inStock": true
  }
]
```

- [ ] **Step 3: Commit**

```bash
git add types/product.ts data/products.json
git commit -m "feat: add ProductCategory type, Product type, and 14 mock product entries"
```

---

## Task 4: Testing Infrastructure

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `__tests__/` directory

- [ ] **Step 1: Create vitest.config.ts**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 2: Create vitest.setup.ts**

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Verify test runner starts**

```bash
npm run test:run
```

Expected: `No test files found` (not an error — no tests yet). Exit 0.

- [ ] **Step 4: Commit**

```bash
git add vitest.config.ts vitest.setup.ts
git commit -m "feat: add Vitest + Testing Library test infrastructure"
```

---

## Task 5: Data Access Layer (TDD)

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/products.ts`
- Create: `__tests__/lib/utils.test.ts`
- Create: `__tests__/lib/products.test.ts`

- [ ] **Step 1: Write failing tests for utils**

```typescript
// __tests__/lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats a whole number as USD currency', () => {
    expect(formatPrice(85)).toBe('$85.00')
  })

  it('formats a decimal price correctly', () => {
    expect(formatPrice(42.5)).toBe('$42.50')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats a large price with correct separators', () => {
    expect(formatPrice(1200)).toBe('$1,200.00')
  })
})
```

- [ ] **Step 2: Run utils tests — expect failure**

```bash
npm run test:run -- __tests__/lib/utils.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/utils'`

- [ ] **Step 3: Implement lib/utils.ts**

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
```

- [ ] **Step 4: Run utils tests — expect pass**

```bash
npm run test:run -- __tests__/lib/utils.test.ts
```

Expected: PASS — 4 tests passing.

- [ ] **Step 5: Write failing tests for products**

```typescript
// __tests__/lib/products.test.ts
import { describe, it, expect } from 'vitest'
import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
  getRelatedProducts,
} from '@/lib/products'

describe('getProducts', () => {
  it('returns all 14 products when no category provided', () => {
    expect(getProducts()).toHaveLength(14)
  })

  it('returns only hats', () => {
    const result = getProducts('hats')
    expect(result.every(p => p.category === 'hats')).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns only parasols', () => {
    const result = getProducts('parasols')
    expect(result.every(p => p.category === 'parasols')).toBe(true)
  })

  it('returns only sunglasses', () => {
    const result = getProducts('sunglasses')
    expect(result.every(p => p.category === 'sunglasses')).toBe(true)
  })
})

describe('getProductBySlug', () => {
  it('returns the correct product', () => {
    const product = getProductBySlug('rainbow-parasol')
    expect(product?.name).toBe('Rainbow Fringe Parasol')
    expect(product?.category).toBe('parasols')
  })

  it('returns undefined for unknown slug', () => {
    expect(getProductBySlug('does-not-exist')).toBeUndefined()
  })
})

describe('getFeaturedProducts', () => {
  it('returns only featured products', () => {
    const result = getFeaturedProducts()
    expect(result.every(p => p.featured === true)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getNewArrivals', () => {
  it('returns only products with badge New', () => {
    const result = getNewArrivals()
    expect(result.every(p => p.badge === 'New')).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getRelatedProducts', () => {
  it('returns at most 3 products', () => {
    const product = getProductBySlug('rainbow-parasol')!
    expect(getRelatedProducts(product).length).toBeLessThanOrEqual(3)
  })

  it('excludes the current product', () => {
    const product = getProductBySlug('rainbow-parasol')!
    const result = getRelatedProducts(product)
    expect(result.find(p => p.slug === 'rainbow-parasol')).toBeUndefined()
  })

  it('returns products in the same category', () => {
    const product = getProductBySlug('rainbow-parasol')!
    const result = getRelatedProducts(product)
    expect(result.every(p => p.category === 'parasols')).toBe(true)
  })
})
```

- [ ] **Step 6: Run products tests — expect failure**

```bash
npm run test:run -- __tests__/lib/products.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/products'`

- [ ] **Step 7: Implement lib/products.ts**

```typescript
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

export function getNewArrivals(): Product[] {
  return products.filter(p => p.badge === 'New')
}

export function getRelatedProducts(current: Product): Product[] {
  return products
    .filter(p => p.category === current.category && p.slug !== current.slug)
    .slice(0, 3)
}
```

- [ ] **Step 8: Run all tests — expect pass**

```bash
npm run test:run
```

Expected: PASS — 14 tests passing across both files.

- [ ] **Step 9: Commit**

```bash
git add lib/utils.ts lib/products.ts __tests__/lib/utils.test.ts __tests__/lib/products.test.ts
git commit -m "feat: implement data access layer with full test coverage"
```

---

## Task 6: Organise Public Assets

**Files:**
- Create: `public/logos/` (3 logo files)
- Create: `public/products/{14 slugs}/1.jpg`
- Create: `public/products/placeholder.jpg`
- Create: `public/lifestyle/parasol-lifestyle.jpg`

- [ ] **Step 1: Copy logos**

```bash
mkdir -p public/logos
cp logos/gq_light_logo.jpg public/logos/
cp logos/gq_dark_logo.jpg public/logos/
cp logos/gq_light_logo_wreath.jpg public/logos/
```

- [ ] **Step 2: Create product image directories and copy files**

```bash
mkdir -p public/products/rainbow-parasol
cp "products/659773879_2152692432143004_2899326149127173360_n.jpg" public/products/rainbow-parasol/1.jpg

mkdir -p public/products/cookie-monster-rhinestone-cap
cp "products/642700874_1114374657516470_8976072465679305069_n.jpg" public/products/cookie-monster-rhinestone-cap/1.jpg

mkdir -p public/products/midnight-lace-parasol
cp "products/662368389_1633593974507825_1552438472741064684_n.jpg" public/products/midnight-lace-parasol/1.jpg

mkdir -p public/products/rhinestone-flower-sunglasses-round
cp "products/664396018_1801949744459542_1505345855617609846_n.jpg" public/products/rhinestone-flower-sunglasses-round/1.jpg

mkdir -p public/products/rainbow-feather-ear-cuff
cp "products/662512739_831316300009330_6759558653499605587_n.jpg" public/products/rainbow-feather-ear-cuff/1.jpg

mkdir -p public/products/gold-mirror-mosaic-top
cp "products/662453402_966888922357289_4984910878199709317_n.jpg" public/products/gold-mirror-mosaic-top/1.jpg

mkdir -p public/products/amethyst-moth-drop-earrings
cp "products/667723978_1498420771998677_5048504749316603341_n.jpg" public/products/amethyst-moth-drop-earrings/1.jpg

mkdir -p public/products/moon-phase-amethyst-necklace
cp "products/662938687_826115519898992_987351225185860389_n.jpg" public/products/moon-phase-amethyst-necklace/1.jpg

mkdir -p public/products/floral-sunglass-chain-set
cp "products/662524001_1240198638096714_7292071858764527031_n.jpg" public/products/floral-sunglass-chain-set/1.jpg

mkdir -p public/products/iridescent-rhinestone-cap
cp "products/666797259_1995222361073074_5513325013899059629_n.jpg" public/products/iridescent-rhinestone-cap/1.jpg

mkdir -p public/products/lace-bunny-ear-headband
cp "products/659515898_1606752387044939_338959057582677109_n.jpg" public/products/lace-bunny-ear-headband/1.jpg

mkdir -p public/products/gold-black-floral-sunglasses
cp "products/662026765_1973090526633737_1751077277293036913_n.jpg" public/products/gold-black-floral-sunglasses/1.jpg

mkdir -p public/products/mushroom-garden-sunglasses
cp "products/664427123_941246288687926_10441621098511995_n.jpg" public/products/mushroom-garden-sunglasses/1.jpg

mkdir -p public/products/pink-floral-parasol
cp "products/663835417_2017800492413458_8326356110865608459_n.jpg" public/products/pink-floral-parasol/1.jpg
```

- [ ] **Step 3: Create placeholder and lifestyle images**

```bash
# Placeholder: reuse wreath logo (square-ish, brand-consistent)
cp public/logos/gq_light_logo_wreath.jpg public/products/placeholder.jpg

# Lifestyle image: midnight parasol in garden setting
mkdir -p public/lifestyle
cp public/products/midnight-lace-parasol/1.jpg public/lifestyle/parasol-lifestyle.jpg
```

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "feat: organise product images and logos into public/ structure"
```

---

## Task 7: Root App Shell + ThemeProvider

**Files:**
- Create: `components/providers/theme-provider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create theme-provider.tsx**

```tsx
// components/providers/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 2: Create app/layout.tsx**

```tsx
// app/layout.tsx
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
```

- [ ] **Step 3: Verify it compiles**

```bash
npm run build
```

Expected: build succeeds. If font names cause TypeScript errors, confirm `Allura`, `Playfair_Display`, `DM_Sans` are correct exports from `next/font/google` (they are as of Next.js 14+).

- [ ] **Step 4: Commit**

```bash
git add components/providers/theme-provider.tsx app/layout.tsx
git commit -m "feat: add root layout with fonts, ThemeProvider, and Toaster"
```

---

## Task 8: Layout Components

**Files:**
- Create: `components/layout/AnnouncementBar.tsx`
- Create: `components/layout/CartDrawer.tsx`
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create AnnouncementBar.tsx**

```tsx
// components/layout/AnnouncementBar.tsx
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type AnnouncementBarProps = {
  message: string
  dismissible?: boolean
}

export function AnnouncementBar({ message, dismissible = true }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative bg-primary-soft text-primary text-center py-2 px-10 text-sm font-body tracking-wide">
      <span>{message}</span>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create CartDrawer.tsx**

```tsx
// components/layout/CartDrawer.tsx
'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-foreground">Your Bag</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center h-[60%] gap-4 text-center px-4">
          <p className="font-body text-muted-foreground text-sm leading-7">
            Your bag is coming soon — check back soon!
          </p>
          <Button
            disabled
            variant="outline"
            className="w-full rounded-full border-border text-muted-foreground"
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 3: Create MobileMenu.tsx**

```tsx
// components/layout/MobileMenu.tsx
'use client'

import Link from 'next/link'
import { X, Instagram, Facebook } from 'lucide-react'
import { useEffect } from 'react'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative ml-auto w-72 h-full bg-background flex flex-col p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <nav className="flex flex-col gap-7 mt-14" aria-label="Mobile navigation">
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="font-display text-2xl text-foreground hover:text-primary transition-colors leading-none"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-5 pb-4">
          <a href="https://www.instagram.com/glitterqueencreative" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.facebook.com/share/1AhWYYXde9/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://www.tiktok.com/@glitterqueencreative" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.27 8.27 0 0 0 4.84 1.54V6.84a4.85 4.85 0 0 1-4.07-.15z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Navbar.tsx**

```tsx
// components/layout/Navbar.tsx
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
        <div className="section-inner flex items-center justify-between h-16">
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
```

- [ ] **Step 5: Create Footer.tsx**

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
              <a href="https://www.instagram.com/glitterqueencreative" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1AhWYYXde9/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@glitterqueencreative" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
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
```

- [ ] **Step 6: Commit**

```bash
git add components/layout/
git commit -m "feat: add AnnouncementBar, Navbar, MobileMenu, CartDrawer, Footer layout components"
```

---

## Task 9: Site Shell Layout

**Files:**
- Create: `app/(site)/layout.tsx`

- [ ] **Step 1: Create app/(site)/layout.tsx**

```tsx
// app/(site)/layout.tsx
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar message="Handcrafted Jewelry Made to Shine — 10% off your first order" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Move/create home page placeholder and verify routing**

Create `app/(site)/page.tsx` temporarily:

```tsx
// app/(site)/page.tsx
export default function HomePage() {
  return <div className="section-outer section-inner"><h1 className="font-display text-4xl">Coming soon</h1></div>
}
```

Run `npm run dev` and visit `http://localhost:3000`. Expected: AnnouncementBar + Navbar + "Coming soon" + Footer all render correctly with fonts and colours applied. Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/
git commit -m "feat: add (site) route group layout with AnnouncementBar, Navbar, Footer"
```

---

## Task 10: Shared Components

**Files:**
- Create: `components/shared/PageHeader.tsx`
- Create: `components/shared/SectionHeading.tsx`
- Create: `components/shared/CTABanner.tsx`
- Create: `components/shared/EmptyState.tsx`
- Create: `components/shared/Breadcrumbs.tsx`

- [ ] **Step 1: Create shared components**

```tsx
// components/shared/PageHeader.tsx
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function PageHeader({ title, subtitle, align = 'center' }: PageHeaderProps) {
  return (
    <div className={cn('section-outer bg-muted border-b border-border', align === 'center' && 'text-center')}>
      <div className="section-inner">
        <h1 className="font-display text-4xl md:text-5xl text-foreground leading-[1.1] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className={cn('mt-4 font-body text-base text-muted-foreground leading-7', align === 'center' && 'max-w-2xl mx-auto')}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
```

```tsx
// components/shared/SectionHeading.tsx
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({ title, subtitle, align = 'center', as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left')}>
      <Tag className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
        {title}
      </Tag>
      {subtitle && (
        <p className={cn('mt-3 font-body text-base text-muted-foreground leading-7', align === 'center' && 'max-w-xl mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

```tsx
// components/shared/CTABanner.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type CTABannerProps = {
  heading: string
  subtext?: string
  href: string
  label: string
}

export function CTABanner({ heading, subtext, href, label }: CTABannerProps) {
  return (
    <section className="section-outer bg-primary-soft">
      <div className="section-inner text-center">
        <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-3 font-body text-muted-foreground leading-7">{subtext}</p>
        )}
        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10">
            <Link href={href}>{label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/shared/EmptyState.tsx
type EmptyStateProps = {
  message?: string
}

export function EmptyState({ message = 'No products found in this category — try another filter ✨' }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-24 text-center">
      <p className="font-body text-muted-foreground text-base leading-7">{message}</p>
    </div>
  )
}
```

```tsx
// components/shared/Breadcrumbs.tsx
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = { label: string; href: string }

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 font-body text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i < items.length - 1 ? (
              <>
                <Link href={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
              </>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/
git commit -m "feat: add PageHeader, SectionHeading, CTABanner, EmptyState, Breadcrumbs shared components"
```

---

## Task 11: Shop Components (TDD)

**Files:**
- Create: `components/shop/ProductCard.tsx`
- Create: `components/shop/ProductGrid.tsx`
- Create: `components/shop/FilterBar.tsx`
- Create: `components/shop/ShopClient.tsx`
- Create: `__tests__/components/ProductCard.test.tsx`
- Create: `__tests__/components/ProductGrid.test.tsx`

- [ ] **Step 1: Write failing ProductCard test**

```tsx
// __tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductCard } from '@/components/shop/ProductCard'
import type { Product } from '@/types/product'

const mockProduct: Product = {
  id: '1',
  slug: 'test-hat',
  name: 'Test Hat',
  description: 'A test hat',
  price: 85,
  category: 'hats',
  images: ['1.jpg'],
  featured: true,
  badge: 'New',
  inStock: true,
}

describe('ProductCard', () => {
  it('renders the product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Hat')).toBeInTheDocument()
  })

  it('renders the formatted price via formatPrice', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$85.00')).toBeInTheDocument()
  })

  it('renders the badge when present', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('links to /shop/test-hat', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/shop/test-hat')
  })

  it('does not render badge when absent', () => {
    const { badge: _b, ...noBadge } = mockProduct
    render(<ProductCard product={noBadge} />)
    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run ProductCard test — expect failure**

```bash
npm run test:run -- __tests__/components/ProductCard.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/shop/ProductCard'`

- [ ] **Step 3: Implement ProductCard.tsx**

```tsx
// components/shop/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type ProductCardProps = {
  product: Product
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const imageSrc = product.images[0]
    ? `/products/${product.slug}/${product.images[0]}`
    : '/products/placeholder.jpg'

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-2xl overflow-hidden bg-card border border-border transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className={`relative overflow-hidden bg-muted ${variant === 'compact' ? 'aspect-square' : 'aspect-[3/4]'}`}>
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={
            variant === 'compact'
              ? '(max-width: 768px) 50vw, 25vw'
              : '(max-width: 768px) 50vw, 33vw'
          }
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground text-xs tracking-widest uppercase rounded-full">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>
      <div className={variant === 'compact' ? 'p-3' : 'p-4'}>
        <h3 className={`font-display text-foreground leading-[1.2] tracking-tight ${variant === 'compact' ? 'text-sm' : 'text-base'}`}>
          {product.name}
        </h3>
        <p className="mt-1 font-body text-primary font-medium text-sm">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 4: Run ProductCard test — expect pass**

```bash
npm run test:run -- __tests__/components/ProductCard.test.tsx
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Write failing ProductGrid test**

```tsx
// __tests__/components/ProductGrid.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductGrid } from '@/components/shop/ProductGrid'
import type { Product } from '@/types/product'

const make = (n: number): Product => ({
  id: String(n),
  slug: `product-${n}`,
  name: `Product ${n}`,
  description: '',
  price: 50 + n,
  category: 'hats',
  images: ['1.jpg'],
})

describe('ProductGrid', () => {
  it('renders all products', () => {
    render(<ProductGrid products={[make(1), make(2), make(3)]} />)
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('Product 3')).toBeInTheDocument()
  })

  it('renders the correct number of links', () => {
    render(<ProductGrid products={[make(1), make(2)]} />)
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('renders no links when products array is empty', () => {
    render(<ProductGrid products={[]} />)
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
```

- [ ] **Step 6: Run ProductGrid test — expect failure**

```bash
npm run test:run -- __tests__/components/ProductGrid.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/shop/ProductGrid'`

- [ ] **Step 7: Implement ProductGrid.tsx and FilterBar.tsx**

```tsx
// components/shop/ProductGrid.tsx
import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product'

type ProductGridProps = {
  products: Product[]
  variant?: 'default' | 'dense'
  // default: 2-col mobile → 3-col desktop
  // dense:   2-col mobile → 4-col desktop (related products strip)
}

export function ProductGrid({ products, variant = 'default' }: ProductGridProps) {
  const gridClass =
    variant === 'dense'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'grid grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <div className={gridClass}>
      {products.map(product => (
        <ProductCard
          key={product.slug}
          product={product}
          variant={variant === 'dense' ? 'compact' : 'default'}
        />
      ))}
    </div>
  )
}
```

```tsx
// components/shop/FilterBar.tsx
'use client'

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
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {FILTERS.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          aria-pressed={active === filter.value}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-body border transition-colors duration-200',
            active === filter.value
              ? 'bg-primary-soft text-primary border-primary'
              : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
```

```tsx
// components/shop/ShopClient.tsx
'use client'

import { useState } from 'react'
import type { Product, ProductCategory } from '@/types/product'
import { FilterBar } from './FilterBar'
import { ProductGrid } from './ProductGrid'
import { EmptyState } from '@/components/shared/EmptyState'

type ShopClientProps = {
  products: Product[]
}

export function ShopClient({ products }: ShopClientProps) {
  const [active, setActive] = useState<ProductCategory | 'all'>('all')

  const filtered =
    active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <>
      <FilterBar active={active} onChange={setActive} />
      <div className="section-gap">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 8: Run all tests — expect pass**

```bash
npm run test:run
```

Expected: PASS — 22 tests passing across all test files.

- [ ] **Step 9: Commit**

```bash
git add components/shop/ __tests__/components/
git commit -m "feat: add ProductCard, ProductGrid, FilterBar, ShopClient with full test coverage"
```

---

## Task 12: Home Page Sections

**Files:**
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/FeaturedCollection.tsx`
- Create: `components/home/NewArrivals.tsx`
- Create: `components/home/BrandStoryPreview.tsx`
- Create: `components/home/ValueProps.tsx`
- Create: `components/home/LifestyleSection.tsx`
- Create: `components/home/Testimonials.tsx`
- Create: `components/home/NewsletterSignup.tsx`

- [ ] **Step 1: Create hero and product sections**

```tsx
// components/home/HeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center section-outer bg-muted">
      <div className="section-inner text-center flex flex-col items-center gap-6">
        <Image
          src="/logos/gq_light_logo_wreath.jpg"
          alt="Glitter Queen Creative"
          width={180}
          height={180}
          className="dark:hidden"
          priority
        />
        <Image
          src="/logos/gq_dark_logo.jpg"
          alt="Glitter Queen Creative"
          width={180}
          height={180}
          className="hidden dark:block"
          priority
        />
        <h1 className="font-script text-6xl md:text-8xl text-foreground leading-none mt-2">
          Glitz and glam for any occasion
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-md leading-7">
          Handcrafted jewelry and accessories made to shine — because everything looks better with a little sparkle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/home/FeaturedCollection.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { getFeaturedProducts } from '@/lib/products'

export function FeaturedCollection() {
  const products = getFeaturedProducts().slice(0, 4)
  return (
    <section className="section-outer">
      <div className="section-inner">
        <SectionHeading
          title="Featured Pieces"
          subtitle="Handcrafted statement pieces that stop the show."
        />
        <div className="section-gap">
          <ProductGrid products={products} />
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/home/NewArrivals.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { getNewArrivals } from '@/lib/products'

export function NewArrivals() {
  const products = getNewArrivals().slice(0, 3)
  if (products.length === 0) return null
  return (
    <section className="section-outer bg-muted">
      <div className="section-inner">
        <SectionHeading
          title="New Arrivals"
          subtitle="Fresh from the studio — just added to the collection."
        />
        <div className="section-gap">
          <ProductGrid products={products} />
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create brand story, value props, and lifestyle sections**

```tsx
// components/home/BrandStoryPreview.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function BrandStoryPreview() {
  return (
    <section className="section-outer">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/lifestyle/parasol-lifestyle.jpg"
              alt="A model wearing a handcrafted Glitter Queen parasol"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-body text-xs tracking-widest uppercase text-accent">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
              Made to Shine.<br />Designed to Be You.
            </h2>
            <p className="font-body text-muted-foreground leading-7 max-w-prose">
              Glitter Queen Creative is a celebration of self-expression — bold, playful, and unapologetically radiant. Every piece is handcrafted with intention, blending creativity with craftsmanship to create something truly unique.
            </p>
            <Button asChild variant="outline" className="w-fit rounded-full border-primary text-primary hover:bg-primary-soft px-8">
              <Link href="/about">Meet Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/home/ValueProps.tsx
import { Sparkles, Heart, Package, Star } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Handcrafted with Love', desc: 'Every piece is made by hand, with care and intention.' },
  { icon: Sparkles, title: 'Made to Shine', desc: 'Designed to catch the light — and every eye in the room.' },
  { icon: Package, title: 'Ships with Care', desc: 'Your order is packed with the same love it was made with.' },
  { icon: Star, title: 'One of a Kind', desc: 'No two pieces are exactly alike. You get something truly yours.' },
]

export function ValueProps() {
  return (
    <section className="section-outer bg-muted">
      <div className="section-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-soft text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-foreground leading-[1.2] tracking-tight">{title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-7">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/home/LifestyleSection.tsx
import Image from 'next/image'

export function LifestyleSection() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src="/lifestyle/parasol-lifestyle.jpg"
        alt="Glitter Queen lifestyle"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
}
```

- [ ] **Step 3: Create testimonials and newsletter sections**

```tsx
// components/home/Testimonials.tsx
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "I wore my parasol to a festival and could not take two steps without someone asking where I got it. Absolutely stunning.",
    name: "Sarah M.",
    location: "Austin, TX",
  },
  {
    quote: "The rhinestone cap I ordered is even more beautiful in person. The craftsmanship is unreal — worth every penny.",
    name: "Jade L.",
    location: "New Orleans, LA",
  },
  {
    quote: "Got the amethyst moth earrings and I've already received so many compliments. Glitter Queen never misses.",
    name: "Priya K.",
    location: "Brooklyn, NY",
  },
]

export function Testimonials() {
  return (
    <section className="section-outer">
      <div className="section-inner">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
            What Our Queens Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, location }) => (
            <div key={name} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-muted-foreground leading-7 text-sm flex-1">"{quote}"</p>
              <div>
                <p className="font-display text-sm text-foreground">{name}</p>
                <p className="font-body text-xs text-muted-foreground">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/home/NewsletterSignup.tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast('Thanks! Newsletter coming soon.')
    setEmail('')
  }

  return (
    <section className="section-outer bg-muted">
      <div className="section-inner text-center">
        <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
          Stay in the Sparkle Loop
        </h2>
        <p className="mt-3 font-body text-muted-foreground leading-7 max-w-sm mx-auto">
          New pieces, behind-the-scenes, and exclusive offers — straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="rounded-full border-border bg-background font-body"
            aria-label="Email address"
          />
          <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/home/
git commit -m "feat: add all home page section components"
```

---

## Task 13: Home Page Assembly

**Files:**
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: Replace placeholder home page with full assembly**

```tsx
// app/(site)/page.tsx
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { NewArrivals } from '@/components/home/NewArrivals'
import { BrandStoryPreview } from '@/components/home/BrandStoryPreview'
import { ValueProps } from '@/components/home/ValueProps'
import { LifestyleSection } from '@/components/home/LifestyleSection'
import { Testimonials } from '@/components/home/Testimonials'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'
import { CTABanner } from '@/components/shared/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollection />
      <NewArrivals />
      <BrandStoryPreview />
      <ValueProps />
      <LifestyleSection />
      <Testimonials />
      <CTABanner
        heading="Ready to Shine?"
        subtext="Find your next statement piece in our handcrafted collection."
        href="/shop"
        label="Shop Now"
      />
      <NewsletterSignup />
    </>
  )
}
```

- [ ] **Step 2: Smoke test in browser**

```bash
npm run dev
```

Visit `http://localhost:3000`. Verify:
- All sections render in correct order
- Fonts display correctly (script hero, display headings, body copy)
- Light/dark toggle in Navbar switches palette
- Product cards show images and formatted prices
- "Shop Now" CTA buttons are lavender pill shape
- Mobile menu opens on small screens and includes social icons
- Cart drawer opens with stub content
- Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

## Task 14: Shop Page

**Files:**
- Create: `app/(site)/shop/page.tsx`

- [ ] **Step 1: Create shop page**

```tsx
// app/(site)/shop/page.tsx
import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import { PageHeader } from '@/components/shared/PageHeader'
import { ShopClient } from '@/components/shop/ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our full collection of handcrafted jewelry, accessories, hats, parasols, and sunglasses.',
}

export default function ShopPage() {
  const products = getProducts()
  return (
    <>
      <PageHeader
        title="Shop"
        subtitle="Handcrafted to shine — explore the full collection."
      />
      <div className="section-outer">
        <div className="section-inner">
          <ShopClient products={products} />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Visit `http://localhost:3000/shop`. Verify:
- All 14 products render in the grid
- Category filter pills work — "Hats" shows 3 hats, "Sunglasses" shows 4, etc.
- "All" pill restores full grid
- Empty state shows if a category somehow has no results
- Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/shop/page.tsx
git commit -m "feat: add shop page with category filtering"
```

---

## Task 15: Product Detail Page

**Files:**
- Create: `components/product/ImageGallery.tsx`
- Create: `components/product/ProductInfo.tsx`
- Create: `components/product/RelatedProducts.tsx`
- Create: `app/(site)/shop/[slug]/page.tsx`

- [ ] **Step 1: Create ImageGallery.tsx**

```tsx
// components/product/ImageGallery.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '@/types/product'

export function ImageGallery({ product }: { product: Product }) {
  const images = product.images.length > 0 ? product.images : []
  const [activeIndex, setActiveIndex] = useState(0)

  const mainSrc = images[activeIndex]
    ? `/products/${product.slug}/${images[activeIndex]}`
    : '/products/placeholder.jpg'

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
        <Image
          src={mainSrc}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-primary' : 'border-border'
              }`}
            >
              <Image
                src={`/products/${product.slug}/${img}`}
                alt={`${product.name} — view ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create ProductInfo.tsx**

```tsx
// components/product/ProductInfo.tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex flex-col gap-6">
      {product.badge && (
        <Badge className="w-fit bg-primary text-primary-foreground tracking-widest uppercase text-xs rounded-full">
          {product.badge}
        </Badge>
      )}

      <div>
        <h1 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] tracking-tight">
          {product.name}
        </h1>
        <p className="mt-3 font-body text-2xl text-primary font-medium">
          {formatPrice(product.price)}
        </p>
      </div>

      <p className="font-body text-muted-foreground leading-7 max-w-prose">
        {product.description}
      </p>

      <div className="flex items-center gap-4">
        <span className="font-body text-sm text-foreground">Qty</span>
        <div className="flex items-center border border-border rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 text-foreground hover:text-primary transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-2 font-body text-foreground border-x border-border min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-4 py-2 text-foreground hover:text-primary transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <Button
        size="lg"
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        onClick={() => toast('Shopping cart coming soon! 🛍️')}
      >
        Add to Bag
      </Button>

      <p className="font-body text-xs text-muted-foreground">
        Free shipping on orders over $75 · Handcrafted with care
      </p>

      <Accordion type="single" collapsible className="border-t border-border">
        <AccordionItem value="details">
          <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline">
            Product Details
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
            Each piece is individually handcrafted. No two items are exactly alike — slight variations are part of the handmade character.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline">
            Care Instructions
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
            Handle with care. Keep away from moisture and direct sunlight. Store in a cool, dry place.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline">
            Shipping & Returns
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
            Orders ship within 3–5 business days. Returns accepted within 14 days for unworn items.{' '}
            <a href="/shipping-returns" className="text-primary underline underline-offset-2">
              Full policy →
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
```

- [ ] **Step 3: Create RelatedProducts.tsx**

```tsx
// components/product/RelatedProducts.tsx
import type { Product } from '@/types/product'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProductGrid } from '@/components/shop/ProductGrid'

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section-outer border-t border-border">
      <div className="section-inner">
        <SectionHeading title="You Might Also Love" align="left" />
        <div className="section-gap">
          <ProductGrid products={products} variant="dense" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create the product detail page**

```tsx
// app/(site)/shop/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts, getProductBySlug, getRelatedProducts } from '@/lib/products'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { ImageGallery } from '@/components/product/ImageGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { RelatedProducts } from '@/components/product/RelatedProducts'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Glitter Queen Creative`,
      description: product.description,
      images: product.images[0]
        ? [`/products/${product.slug}/${product.images[0]}`]
        : ['/logos/gq_light_logo.jpg'],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <>
      <div className="section-outer">
        <div className="section-inner">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: product.name, href: `/shop/${product.slug}` },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <ImageGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      {related.length > 0 && <RelatedProducts products={related} />}
    </>
  )
}
```

- [ ] **Step 5: Verify product pages**

```bash
npm run dev
```

Visit `http://localhost:3000/shop/rainbow-parasol`. Verify:
- Breadcrumbs render: Home → Shop → Rainbow Fringe Parasol
- Image displays correctly
- Name, formatted price, description render
- Quantity selector increments/decrements
- "Add to Bag" shows toast
- Accordions expand/collapse
- Related products strip shows other parasols
- Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add components/product/ app/\(site\)/shop/\[slug\]/
git commit -m "feat: add product detail page with ImageGallery, ProductInfo, RelatedProducts"
```

---

## Task 16: About Page

**Files:**
- Create: `app/(site)/about/page.tsx`

- [ ] **Step 1: Create about page**

```tsx
// app/(site)/about/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { CTABanner } from '@/components/shared/CTABanner'
import { Sparkles, Heart, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Emily and the story behind Glitter Queen Creative — handcrafted accessories made to shine.',
}

const values = [
  {
    icon: Sparkles,
    title: 'The Inspiration',
    desc: 'Golden light, vibrant colors, music and movement, and the freedom to express who you are. Every piece reflects a moment that feels alive.',
  },
  {
    icon: Heart,
    title: 'The Craft',
    desc: 'Every piece is handcrafted with care using thoughtfully selected materials. Nothing is mass-produced. Nothing is rushed. It is about quality, balance, and creating something that feels as good as it looks.',
  },
  {
    icon: Star,
    title: 'Why It Matters',
    desc: 'Jewelry and accessories should do more than complete an outfit — they should transform how you feel. Glitter Queen Creative exists to bring more confidence, creativity, and joy into everyday life.',
  },
]

const inspirationPills = [
  'Golden Light',
  'Vibrant Colors',
  'Music & Movement',
  'Freedom to Express',
]

export default function AboutPage() {
  return (
    <>
      {/* Brand story hero */}
      <section className="section-outer bg-muted text-center">
        <div className="section-inner">
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground leading-[1.1] tracking-tight">
            Made to Shine.<br />Designed to Be You.
          </h1>
          <p className="mt-6 font-body text-lg text-muted-foreground leading-7 max-w-2xl mx-auto">
            Glitter Queen Creative is a celebration of self-expression — bold, playful, and unapologetically radiant. Each piece is designed to elevate how you feel: confident, expressive, and just a little bit magical.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="section-outer">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src="/lifestyle/parasol-lifestyle.jpg"
                alt="Emily, founder of Glitter Queen Creative"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-body text-xs tracking-widest uppercase text-accent">The Story</p>
              <h2 className="font-display text-3xl text-foreground leading-[1.15] tracking-tight">
                Hi, I'm Emily.
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-7 max-w-prose">
                <p>
                  What started as a personal creative outlet quickly became something more: a way to turn colour, texture, and sparkle into pieces that help people feel like their most authentic selves.
                </p>
                <p>
                  From festival-inspired designs to everyday statement accessories, every item is made with intention — blending creativity with craftsmanship to create something truly unique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration pills */}
      <section className="section-outer bg-muted">
        <div className="section-inner text-center">
          <h2 className="font-display text-2xl md:text-3xl text-foreground leading-[1.15] tracking-tight mb-8">
            Inspired by moments that feel alive
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {inspirationPills.map(pill => (
              <span
                key={pill}
                className="px-5 py-2 rounded-full bg-primary-soft text-primary font-body text-sm border border-primary/30"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / values */}
      <section className="section-outer">
        <div className="section-inner">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                <div className="p-3 w-fit rounded-full bg-primary-soft text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-foreground leading-[1.2] tracking-tight">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product gallery */}
      <section className="section-outer bg-muted">
        <div className="section-inner">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-foreground leading-[1.15] tracking-tight">
              The Collection
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/products/iridescent-rhinestone-cap/1.jpg', alt: 'Iridescent rhinestone cap' },
              { src: '/products/pink-floral-parasol/1.jpg', alt: 'Pink floral parasol' },
              { src: '/products/amethyst-moth-drop-earrings/1.jpg', alt: 'Amethyst moth earrings' },
              { src: '/products/mushroom-garden-sunglasses/1.jpg', alt: 'Mushroom garden sunglasses' },
            ].map(({ src, alt }) => (
              <div key={src} className="relative aspect-square rounded-2xl overflow-hidden bg-background">
                <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to find your next statement piece?"
        subtext="Because everything really does look better with a little sparkle."
        href="/shop"
        label="Shop Now"
      />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(site\)/about/page.tsx
git commit -m "feat: add about page with Emily's story, values, inspiration, and gallery"
```

---

## Task 17: Contact Page

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Create: `app/(site)/contact/page.tsx`

- [ ] **Step 1: Create ContactForm client component**

The contact page needs `useState` for the form. Extract that into a dedicated client component so the page itself can remain a server component and export `metadata`.

```tsx
// components/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast('Thanks! Contact submissions are coming soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="font-body text-sm text-foreground mb-1.5 block">Name</label>
        <Input
          id="name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          className="rounded-xl border-border bg-background font-body"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-body text-sm text-foreground mb-1.5 block">Email</label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          className="rounded-xl border-border bg-background font-body"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-body text-sm text-foreground mb-1.5 block">Message</label>
        <Textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          required
          className="rounded-xl border-border bg-background font-body resize-none"
        />
      </div>
      <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-fit px-8">
        Send Message
      </Button>
      <p className="font-body text-xs text-muted-foreground">
        We'll get back to you as soon as possible.
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Create contact page (server component)**

```tsx
// app/(site)/contact/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Glitter Queen Creative — questions, custom requests, or just to say hello.',
}

const faqPreview = [
  {
    q: 'How long does shipping take?',
    a: 'Orders ship within 3–5 business days. Delivery typically takes 3–7 additional days depending on your location.',
  },
  {
    q: 'Can I return or exchange my order?',
    a: 'Yes — returns are accepted within 14 days of delivery for unworn items in original condition.',
  },
  {
    q: 'Are the products truly handmade?',
    a: 'Absolutely. Every piece is handcrafted by Emily. No mass production, no shortcuts.',
  },
]

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.27 8.27 0 0 0 4.84 1.54V6.84a4.85 4.85 0 0 1-4.07-.15z" />
  </svg>
)

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="Have a question, custom request, or just want to say hello? We'd love to hear from you."
      />
      <div className="section-outer">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-2xl text-foreground leading-[1.15] tracking-tight mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-display text-2xl text-foreground leading-[1.15] tracking-tight mb-6">
                  Find Us
                </h2>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:hello@glitterqueencreative.com"
                    className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    hello@glitterqueencreative.com
                  </a>
                  <div className="flex items-center gap-4 pt-2">
                    <a href="https://www.instagram.com/glitterqueencreative" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/share/1AhWYYXde9/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://www.tiktok.com/@glitterqueencreative" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                      <TikTokIcon />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-foreground leading-[1.15] tracking-tight mb-4">
                  Common Questions
                </h2>
                <Accordion type="single" collapsible>
                  {faqPreview.map(({ q, a }) => (
                    <AccordionItem key={q} value={q}>
                      <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline text-left">
                        {q}
                      </AccordionTrigger>
                      <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
                        {a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Link href="/faq" className="font-body text-sm text-primary hover:underline underline-offset-2 mt-4 inline-block">
                  View all FAQs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Add ContactForm to the file map at the top of this plan**

Add `components/contact/ContactForm.tsx` to the **New files** list in the File Map section.

- [ ] **Step 4: Commit**

```bash
git add components/contact/ app/\(site\)/contact/page.tsx
git commit -m "feat: add contact page with ContactForm client component, social links, FAQ preview"
```

---

## Task 18: Content Pages + 404

**Files:**
- Create: `app/(site)/faq/page.tsx`
- Create: `app/(site)/shipping-returns/page.tsx`
- Create: `app/(site)/privacy-policy/page.tsx`
- Create: `app/(site)/terms/page.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create FAQ page**

```tsx
// app/(site)/faq/page.tsx
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
```

- [ ] **Step 2: Create Shipping & Returns page**

```tsx
// app/(site)/shipping-returns/page.tsx
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
        <div className="section-inner max-w-2xl mx-auto prose-custom">
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
```

- [ ] **Step 3: Create Privacy Policy and Terms pages**

```tsx
// app/(site)/privacy-policy/page.tsx
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
```

```tsx
// app/(site)/terms/page.tsx
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
```

- [ ] **Step 4: Create 404 page**

```tsx
// app/not-found.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-outer bg-muted">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <Image
          src="/logos/gq_light_logo_wreath.jpg"
          alt="Glitter Queen Creative"
          width={120}
          height={120}
          className="dark:hidden"
        />
        <Image
          src="/logos/gq_dark_logo.jpg"
          alt="Glitter Queen Creative"
          width={120}
          height={120}
          className="hidden dark:block"
        />
        <h1 className="font-display text-4xl text-foreground leading-[1.1] tracking-tight">
          Page Not Found
        </h1>
        <p className="font-body text-muted-foreground leading-7">
          This page seems to have wandered off — let's get you back to the sparkle.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run full build to verify all pages**

```bash
npm run build
```

Expected: Build succeeds with all 18 routes statically generated. No TypeScript or import errors. Review the build output — all routes should appear as static (○).

- [ ] **Step 6: Run all tests**

```bash
npm run test:run
```

Expected: All 22 tests pass.

- [ ] **Step 7: Final commit**

```bash
git add app/\(site\)/faq/ app/\(site\)/shipping-returns/ app/\(site\)/privacy-policy/ app/\(site\)/terms/ app/not-found.tsx
git commit -m "feat: add FAQ, Shipping & Returns, Privacy Policy, Terms, and 404 pages — Phase 1 complete"
```

---

## Done

Phase 1 is complete when:
- [ ] `npm run build` exits 0 with all 18 routes statically generated
- [ ] `npm run test:run` passes all 22 tests
- [ ] `npm run dev` loads the site with correct fonts, palette, dark/light toggle
- [ ] All 14 products display with images, correct names, and formatted prices
- [ ] Shop filter pills correctly filter the product grid client-side
- [ ] Product detail pages have breadcrumbs, image, info, and related products
- [ ] Add to Bag, newsletter, and contact form all show intentional toasts
- [ ] Mobile menu opens, cart drawer opens with stub content
- [ ] Announcement bar is dismissible

Deploy to Vercel: connect the GitHub repo at vercel.com → import → no configuration needed (Next.js auto-detected).
