# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build
npm run lint         # ESLint
npm test             # Vitest in watch mode
npm run test:run     # Vitest single run (CI)
```

Run a single test file:
```bash
npx vitest run __tests__/lib/products.test.ts
```

## Architecture

This is a **statically generated Next.js 16.2.2 storefront** using the App Router. All routes are server components by default; client components are opt-in with `'use client'`.

### Routing

Routes live under `app/(site)/` — the `(site)` route group applies the shared layout (AnnouncementBar → Navbar → `<main>` → Footer) without affecting URLs. The root `app/layout.tsx` handles fonts, theme provider, and the global Sonner toaster.

Dynamic product pages at `/shop/[slug]` use `generateStaticParams` to pre-render all 24 product slugs at build time. Because this is Next.js 16, `params` is a `Promise` and must be awaited:

```ts
type Props = { params: Promise<{ slug: string }> }
export default async function Page({ params }: Props) {
  const { slug } = await params
```

### Data Layer

Products are stored in `data/products.json` and accessed through pure synchronous functions in `lib/products.ts`. There is no API, no database, no server actions. `getProducts()`, `getProductBySlug()`, `getFeaturedProducts()`, `getNewArrivals()`, and `getRelatedProducts()` are the full data API.

Product images are served from `public/products/{slug}/{filename}`. The `images` array in each product object contains filenames (e.g. `["1.jpg"]`), not full paths.

### Styling

**Tailwind v4 — CSS-first config.** There is no `tailwind.config.ts`. All tokens are defined in `app/globals.css` as CSS custom properties in `:root` / `.dark`, then mapped to Tailwind utilities via `@theme inline`. To add a new color utility, add a CSS variable to `:root`/`.dark` and a corresponding `--color-*` entry in `@theme inline`.

Brand tokens: `--primary` (lavender `#a78bfa`), `--accent` (gold `#c9a24a`), plus `-soft` variants for backgrounds.

Three font families are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables: `--font-allura` → `font-script`, `--font-playfair` → `font-display`, `--font-dm-sans` → `font-body`.

Section layout utilities: `.section-outer` (padding), `.section-inner` (max-width + centering), `.section-gap` (top margin between sections).

### Dark Mode

Handled by `next-themes` with `attribute="class"`. The `<html>` element gets class `dark`. The `ThemeProvider` wrapper is at `components/providers/theme-provider.tsx`. Components that render differently based on theme need a `mounted` guard (check `useTheme().resolvedTheme` only after mount) to avoid hydration mismatches.

### shadcn/ui

Components are in `components/ui/`. The project uses the **radix-nova** style with the **neutral** base color. shadcn primitives rely on the CSS variables in `globals.css` — do not remove `--input`, `--popover`, `--popover-foreground`, or `--destructive`.

### Client Components

`lucide-react@1.7.0` dropped branded icons (Instagram, Facebook). Use inline SVGs for social icons — see `components/layout/Footer.tsx` for the established pattern. All other needed icons (Sun, Moon, ShoppingBag, Menu, X, Star, Heart, Sparkles, Package, ChevronRight, Mail) remain available.

`ShopClient` uses `useSearchParams` to read `?category=` from the URL, enabling footer category links to pre-filter the shop. It must be wrapped in `<Suspense>` on the shop page (already done in `app/(site)/shop/page.tsx`).

### Ecommerce Placeholders

Cart, checkout, contact form, and newsletter are all Phase 1 stubs. They show Sonner toasts rather than doing anything real. Toast copy is specified in the design spec at `docs/superpowers/specs/2026-04-07-glitter-queen-design.md` — keep UI and spec in sync.

### Tests

Tests live in `__tests__/` mirroring the source structure. Vitest uses jsdom, globals, and the `@` path alias. `@testing-library/jest-dom` matchers are available via `vitest.setup.ts`.
