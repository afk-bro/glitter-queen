# Glitter Queen Creative

Storefront for [Glitter Queen Creative](https://www.instagram.com/glitterqueencreative) — Emily's handmade accessories brand. Statically generated display site built with Next.js, Tailwind CSS v4, and shadcn/ui.

## Stack

- **Next.js 16.2.2** — App Router, fully static (`output: 'export'`-ready)
- **Tailwind CSS v4** — CSS-first config, custom design tokens
- **shadcn/ui** — radix-nova style, Radix UI primitives
- **next-themes** — dark/light mode (class strategy)
- **Vitest + Testing Library** — unit and component tests
- **Sonner** — toast notifications

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Run tests (watch) |
| `npm run test:run` | Run tests once |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for OG metadata | `https://glitterqueencreative.com` |

## Project Structure

```
app/
  (site)/           ← storefront routes (layout, home, shop, about, contact, faq, legal)
  layout.tsx        ← root layout: fonts, theme provider, toaster
  globals.css       ← Tailwind v4 + brand design tokens
components/
  layout/           ← Navbar, Footer, AnnouncementBar, MobileMenu, CartDrawer
  home/             ← page sections (Hero, FeaturedCollection, Testimonials, etc.)
  shop/             ← ProductCard, ProductGrid, FilterBar, ShopClient
  product/          ← ImageGallery, ProductInfo, RelatedProducts
  shared/           ← PageHeader, SectionHeading, CTABanner, EmptyState, Breadcrumbs
  ui/               ← shadcn primitives (Button, Badge, Accordion, Sheet, etc.)
data/
  products.json     ← 14 mock products across 5 categories
lib/
  products.ts       ← synchronous product selectors
  utils.ts          ← cn(), formatPrice()
types/
  product.ts        ← Product and ProductCategory types
public/
  logos/            ← brand logos
  products/         ← product images (one folder per slug)
  lifestyle/        ← lifestyle photography
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop (filterable by category) |
| `/shop/[slug]` | Product detail |
| `/about` | Brand story |
| `/contact` | Contact form |
| `/faq` | FAQ |
| `/shipping-returns` | Shipping & returns policy |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |

## Phase 1 Scope

This is a **display-only** site — all ecommerce interactions (cart, checkout, contact form, newsletter) are stubbed with toast notifications. Phase 2 will add Square payment integration, a real cart, and form backends.
