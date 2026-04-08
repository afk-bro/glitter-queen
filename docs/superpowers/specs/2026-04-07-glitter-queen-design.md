# Glitter Queen Creative — Site Design Spec

**Date:** 2026-04-07
**Brand:** Glitter Queen Creative
**Owner:** Emily
**Stack:** Next.js 15, App Router, TypeScript, Tailwind CSS, shadcn/ui, next-themes
**Hosting:** Vercel (free tier)
**Phase:** 1 — Full UI, ecommerce placeholders, no backend

---

## 1. Architecture & Project Structure

All routes are statically generated at build time. Zero server cost on Vercel free tier.

```
app/
  layout.tsx              ← root HTML shell + ThemeProvider only
  not-found.tsx           ← global 404

  (site)/
    layout.tsx            ← AnnouncementBar, Navbar, Footer
    page.tsx              ← Home
    about/page.tsx
    contact/page.tsx
    faq/page.tsx
    shipping-returns/page.tsx
    privacy-policy/page.tsx
    terms/page.tsx
    shop/
      page.tsx
      [slug]/page.tsx     ← generateStaticParams + generateMetadata + notFound() fallback

lib/
  utils.ts                ← cn(), formatPrice()
  products.ts             ← getProducts(), getProductBySlug(), getFeaturedProducts(), getNewArrivals(), getRelatedProducts()

types/
  product.ts              ← Product type

data/
  products.json           ← 14 mock product entries (one per repo image)

public/
  logos/                  ← gq_light_logo.jpg, gq_dark_logo.jpg, gq_light_logo_wreath.jpg
  products/
    {slug}/
      1.jpg
      2.jpg               ← additional images per product if available

components/
  layout/                 ← Navbar, MobileMenu, Footer, AnnouncementBar
  providers/
    theme-provider.tsx    ← next-themes wrapper
  home/                   ← HeroSection, FeaturedCollection, NewArrivals, BrandStoryPreview,
                             ValueProps, LifestyleSection, Testimonials, NewsletterSignup
  shop/                   ← CollectionHeader, ProductGrid, ProductCard, FilterBar
  product/                ← ImageGallery, ProductInfo, RelatedProducts
  shared/                 ← PageHeader, SectionHeading, CTABanner, EmptyState, CartDrawer
  ui/                     ← shadcn/ui primitives (Button, Input, Textarea, Select, Accordion,
                             Breadcrumbs, Badge, Toast, Sheet)
```

### Product route
- `generateStaticParams` — builds one route per product slug
- `generateMetadata` — per-product SEO title, description, OG tags
- `notFound()` — called if slug is absent from `getProductBySlug()`

---

## 2. Design System

### Color tokens

```css
:root {
  --bg: #ffffff;
  --bg-soft: #faf9f7;
  --card: #ffffff;
  --text: #1a1a1a;
  --text-muted: #6b6b6b;
  --primary: #a78bfa;
  --primary-soft: #ede9fe;
  --accent: #c9a24a;
  --accent-soft: #f5e7c6;
  --border: #e5e5e5;
  --ring: #a78bfa;
}

.dark {
  --bg: #0b0b0f;
  --bg-soft: #121217;
  --card: #1c1c24;
  --text: #f5f5f5;
  --text-muted: #a1a1aa;
  --primary: #c4b5fd;
  --primary-soft: #2e2a4a;
  --accent: #d4af37;
  --accent-soft: #3a2f0b;
  --border: #2a2a2a;
  --ring: #c4b5fd;
}
```

next-themes uses `class` strategy — `dark` class applied to `<html>`.
All tokens mapped to Tailwind via `tailwind.config.ts` `extend.colors`.

### Typography — three-font system

| Role | Font | Tailwind utility |
|---|---|---|
| Script accent | Allura | `font-script` |
| Display / headings | Playfair Display | `font-display` |
| Body / UI | DM Sans | `font-body` |

All three loaded via `next/font/google` in `app/layout.tsx`. CSS variables injected at root:

```css
:root {
  --font-body: var(--font-dm-sans);
  --font-display: var(--font-playfair);
  --font-script: var(--font-allura);
}
```

```js
// tailwind.config.ts
fontFamily: {
  body:    ['var(--font-body)',    'sans-serif'],
  display: ['var(--font-display)', 'serif'],
  script:  ['var(--font-script)',  'cursive'],
}
```

Allura used sparingly — hero headline and at most one section callout per page.

### Type scale & rhythm

| Token | Size | Font | Line height | Tracking |
|---|---|---|---|---|
| Hero | 56–72px | `font-script` | `leading-none` | `tracking-normal` |
| H1 / display | 40–48px | `font-display` | `leading-[1.1]` | `tracking-tight` |
| H2 | 28–32px | `font-display` | `leading-[1.15]` | `tracking-tight` |
| H3 | 20–24px | `font-display` | `leading-[1.2]` | `tracking-tight` |
| Body | 16px | `font-body` | `leading-7` | `tracking-normal` |
| Label / caps | 12–13px | `font-body` | `leading-5` | `tracking-widest` |
| Long text max | — | — | — | `max-w-2xl` (~65ch) |

### Spacing & shape

- Section vertical padding: `py-20 md:py-28`
- Content max-width: `max-w-screen-xl`, centered, `px-6 md:px-10`
- Gap between section heading and content: `mt-12 md:mt-16`
- Cards: `rounded-2xl`, `shadow-sm`
- Buttons: `rounded-full` (pill)
- Transitions: `200ms ease` — hover lifts on cards, color shifts on buttons

### Section container utilities

```css
/* globals.css */
.section-outer { @apply py-20 md:py-28 px-6 md:px-10; }
.section-inner  { @apply mx-auto max-w-screen-xl; }
.section-gap    { @apply mt-12 md:mt-16; }
```

### Button variants (extend shadcn)

| Variant | Style |
|---|---|
| `primary` | Lavender fill (`--primary`), white text, pill |
| `secondary` | Outline (`--primary` border), pill |
| `ghost` | Text only, for nav / inline links |

Gold (`--accent`) is never used for interactive elements — decorative only.

---

## 3. Data Model

### `types/product.ts`

```typescript
export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number          // dollars, e.g. 48.00
  category: string       // 'hats' | 'parasols' | 'earrings-jewelry' | 'sunglasses'
  images: string[]       // filenames relative to /public/products/{slug}/
  featured?: boolean
  badge?: string         // e.g. "New", "Limited"
  inStock?: boolean
}
```

### `data/products.json` — entry shape

```json
{
  "id": "1",
  "slug": "iridescent-rhinestone-cap",
  "name": "Iridescent Rhinestone Cap",
  "category": "hats",
  "price": 85.00,
  "description": "Handcrafted snapback covered in iridescent AB rhinestones with a hand-beaded lavender floral centrepiece and gold fringe brim.",
  "images": ["1.jpg"],
  "featured": true,
  "badge": "New",
  "inStock": true
}
```

14 entries total — one per product image in the repo.

### `lib/products.ts`

```typescript
import products from '@/data/products.json'
import type { Product } from '@/types/product'

export function getProducts(category?: string): Product[]
export function getProductBySlug(slug: string): Product | undefined
export function getFeaturedProducts(): Product[]
export function getNewArrivals(): Product[]
export function getRelatedProducts(current: Product): Product[]  // same category, exclude current, max 3
```

All functions are pure and synchronous. No network calls in Phase 1. Swap the import for an API call when Square is integrated in Phase 2.

---

## 4. Pages & Sections

### Announcement bar
Full-bleed lavender (`--primary-soft`) strip above Navbar. Dismissible.
Content: "Handcrafted Jewelry Made to Shine — 10% off your first order"

### Home (`/`)

| Section | Notes |
|---|---|
| Hero | Full-viewport. Wreath logo + Allura headline "Glitz and glam for any occasion". Subtext + primary CTA "Shop Now" + secondary CTA "Our Story". Background `--bg-soft`. |
| Featured collection | 3–4 cards from `getFeaturedProducts()`. |
| New arrivals | Same grid, different slice. "New" badge on cards. |
| Brand story preview | Two-column: lifestyle image + short copy + "Meet Us" link. |
| Value props | 3–4 icon + text tiles: "Handcrafted with Love", "Ships with Care", "Made to Shine", "One of a Kind". `--bg-soft` band. |
| Lifestyle image | Full-bleed parasol lifestyle shot. Minimal overlay text or none. |
| Testimonials | 3 quote cards. Stars in `--accent` gold. Static mock copy. |
| CTA banner | `--primary-soft` bg. "Ready to Shine?" + Shop Now button. |
| Newsletter | Email input + submit. Toast on submit: "Thanks! Newsletter coming soon." |

### Shop (`/shop`)

- `PageHeader` with "Shop" + optional subtitle
- Filter bar: 4 category pills (All, Hats, Parasols, Earrings & Jewelry, Sunglasses) — client component, filters `products` state client-side
- Sort dropdown — UI renders, no-op in Phase 1
- `ProductGrid` with `variant="default"` (2-col mobile → 3-col desktop)
- `EmptyState` if filter returns zero results
- Load More placeholder button

### Product Detail (`/shop/[slug]`)

- Breadcrumbs: Home → Shop → Product Name
- Left: `ImageGallery` — main image + thumbnail strip, click to swap. No lightbox in Phase 1.
- Right: Name (H1), `Badge` if present, price, description, quantity selector, "Add to Bag" button (toast: "Shopping cart coming soon"), shipping snippet
- Below fold: `Accordion` — Details, Care Instructions, Shipping & Returns
- `RelatedProducts` strip — 3 cards, same category, `variant="compact"`

SEO: `generateMetadata` returns title = product name, description = product description, OG title/description/image, canonical URL.

### About (`/about`)

| Section | Content source |
|---|---|
| Brand story hero | Tagline "Made to Shine. Designed to Be You." + opening brand copy |
| Founder / Emily's story | "The Story" — personal origin, creative outlet → accessories |
| Mission / values | Three tiles from "The Inspiration", "The Craft", "Why It Matters" |
| Inspiration strip | Four phrases as styled pills: "Golden Light", "Vibrant Colors", "Music & Movement", "Freedom to Express" |
| Image gallery | Lifestyle product shots |
| CTA | "Ready to find your next statement piece? → Shop the Collection" |

### Contact (`/contact`)

- `PageHeader`
- Contact form: Name, Email, Message (`Input`, `Textarea`, `Button`)
- Helper text below form: "We'll get back to you as soon as possible."
- Submit: toast "Thanks! Contact submissions are coming soon."
- Below form: business email (placeholder), social links row (Instagram, Facebook, TikTok)
- FAQ preview: 3 accordion items linking to full `/faq`

### FAQ, Shipping & Returns, Privacy Policy, Terms of Service

All share the same layout pattern:
- `PageHeader` with page title
- Prose content in `max-w-2xl` container, `leading-7`, `font-body`
- FAQ uses shadcn `Accordion`
- Others are static formatted prose

### 404 (`app/not-found.tsx`)

Centered layout: wreath logo, "Page Not Found" (H1), short copy, "Go Home" (primary) + "Shop" (secondary) buttons.

---

## 5. Component Contracts

### Key shared components

```typescript
// components/shared/PageHeader.tsx
type PageHeaderProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

// components/shared/SectionHeading.tsx
type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
}

// components/shared/CTABanner.tsx
type CTABannerProps = {
  heading: string
  subtext?: string
  href: string
  label: string
}

// components/layout/AnnouncementBar.tsx
type AnnouncementBarProps = {
  message: string
  dismissible?: boolean
}
```

### Shop components

```typescript
// components/shop/ProductCard.tsx
type ProductCardProps = {
  product: Product
  variant?: 'default' | 'compact'
}

// components/shop/ProductGrid.tsx
type ProductGridProps = {
  products: Product[]
  variant?: 'default' | 'dense'
  // 'default': 2-col mobile → 3-col desktop
  // 'dense':   2-col mobile → 4-col desktop (related products strip)
}
```

---

## 6. Cart (Phase 1 Stub)

- Cart icon always visible in Navbar, badge hidden when count = 0
- Click opens `CartDrawer` (shadcn `Sheet`)
- Drawer content: "Your bag is coming soon — check back soon!"
- Disabled "Checkout" button inside drawer
- No cart state management in Phase 1

---

## 7. SEO

Minimum fields per page via `generateMetadata()`:

| Field | Value |
|---|---|
| `title` | Page/product name + " — Glitter Queen Creative" |
| `description` | Page or product description |
| `og:title` | Same as title |
| `og:description` | Same as description |
| `og:image` | Product first image or brand logo |
| `canonical` | Set on shop page if filter params are added to URL |

---

## 8. Form Placeholders

All forms render and feel complete. No dead buttons.

| Form | Behaviour |
|---|---|
| Contact | Submit shows toast: "Thanks! Contact submissions are coming soon." |
| Newsletter | Submit shows toast: "Thanks! Newsletter coming soon." |
| Add to Bag | Button enabled, shows toast: "Shopping cart coming soon." |

Helper text under each form reinforces that it's intentional, not broken.

---

## 9. Performance Expectations

- All images via `next/image` (lazy load, optimised, correct `sizes` prop)
- All routes statically generated — no SSR, no edge functions
- `'use client'` only where interaction is required: theme toggle, mobile menu, filter pills, cart drawer, toasts
- No unnecessary global client JS
- Fonts preloaded via `next/font/google` with `display: 'swap'`

---

## 10. Phase 1 Scope Summary

**In scope:**
- All 10 pages, fully built, responsive (mobile-first)
- Dark / light mode toggle
- 14 mock products across 4 categories
- Client-side category filtering on Shop
- SEO metadata on all pages
- Social links (Instagram, Facebook, TikTok)
- Accessible UI (focus rings, keyboard nav, semantic HTML)

**Deferred to Phase 2:**
- Square payment integration
- Real cart / checkout flow
- Contact / newsletter backend
- Product inventory management
- User accounts / auth
- CMS for product management
