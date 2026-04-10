# Gold Trim — Design Spec

**Date:** 2026-04-10
**Scope:** Introduce gold (`--accent`) as visible warm trim throughout the site to create a purple-and-gold brand identity. Seven targeted element changes; no layout, button hierarchy, or typography scale changes.

---

## Guiding Principle

Gold is the *warm trim* of the site — the element the eye catches at edges, accents, and value signals. Lavender (`--primary`) remains the dominant brand color. Every gold touch either signals **value** (prices, badges) or **warmth** (eyebrows, dividers, backgrounds). The pairing reads regal and intentional rather than busy.

**Tokens in use:**
- `--accent`: `#c9a24a` light / `#d4af37` dark — the gold
- `--accent-foreground`: `#1a1a1a` light / `#f5f5f5` dark — text on gold backgrounds
- `--accent-soft`: `#f5e7c6` light / `#3a2f0b` dark — warm tinted section background

---

## Changes

### 1. Announcement Bar (`components/layout/AnnouncementBar.tsx`)

**Before:** `bg-primary text-primary-foreground`
**After:** `bg-accent text-accent-foreground`

The dismiss button currently uses `text-primary-foreground opacity-80`. Change to `text-accent-foreground opacity-80`.

Contrast check: `#1a1a1a` on `#c9a24a` ≈ 8.2:1 (WCAG AAA). Dark mode: `#d4af37` (bright gold) also needs dark text — `#f5f5f5` on `#d4af37` ≈ 1.9:1, which fails.

**Implementation:** Use `text-[#1a1a1a]` directly on the message text and dismiss button instead of `text-accent-foreground`. This hardcodes dark text on the bar in both modes, which is correct since both gold values are light enough for dark text. Do not change `--accent-foreground` globally — it's used elsewhere.

---

### 2. Hero Eyebrow (`components/home/HeroSection.tsx`)

**Before:** `text-white/70`
**After:** `text-accent`

The small "HANDCRAFTED ACCESSORIES" label above the headline. Warm gold on the dark hero overlay reads like a jeweler's hallmark and establishes the pairing at the top of the page.

---

### 3. Section Eyebrow Labels (multiple components)

Standardize all section eyebrow labels to `text-accent tracking-widest uppercase text-xs font-body`. Currently some are already `text-accent`, others use `text-muted-foreground` or similar.

**Components to audit and update:**
- `components/home/FeaturedCollection.tsx`
- `components/home/NewArrivals.tsx`
- `components/home/BrandStoryPreview.tsx` — already `text-accent`, confirm
- `components/home/Testimonials.tsx`
- `components/home/ValueProps.tsx`
- `components/home/LifestyleSection.tsx`
- `app/(site)/about/page.tsx` — already `text-accent` in places, confirm consistency

Pattern: any short all-caps label that sits above a section heading gets `text-accent`.

---

### 4. Product Card Badges (`components/shop/ProductCard.tsx`)

**Before:** `bg-primary text-primary-foreground`
**After:** `bg-accent text-accent-foreground`

Applies to the "NEW" and "LIMITED" badge overlays on product card images. Gold badges on photography are more visible than lavender and signal scarcity/freshness clearly.

Same change applies to the badge in `components/product/ProductInfo.tsx` on the detail page.

---

### 5. Product Card Prices (`components/shop/ProductCard.tsx`)

**Before:** `text-primary-vivid`
**After:** `text-accent`

Every price across the shop grid and home page product sections glints gold. Reinforces value signalling and adds warmth across the product layout without touching any structure.

---

### 6. CTABanner Background (`components/shared/CTABanner.tsx`)

**Before:** `bg-primary-soft` (pale lavender — `#ede9fe`)
**After:** `bg-accent-soft` (warm cream — `#f5e7c6`)

Creates a warm visual pause in the scroll rhythm. The section currently blends into surrounding lavender sections; gold-tinted cream makes it a distinct moment without being loud.

No text color changes needed — `text-foreground` remains readable on `--accent-soft` in both modes.

---

### 7. Section Dividers (`app/globals.css`)

**Before:** `color-mix(in srgb, var(--accent) 55%, transparent)`
**After:** `color-mix(in srgb, var(--accent) 85%, transparent)`

Bumping opacity from 55% to 85% makes the gold hairline between sections register as an intentional design element rather than a near-invisible artifact.

---

## What Stays Lavender

To preserve button hierarchy and brand clarity, these elements are **not changed:**

- All buttons (`default`, `outline`, `cta` variants)
- Navigation links and hover states
- Page headings (`font-display`)
- Body text
- Card backgrounds
- Footer text and links
- Testimonial card borders
- Star fills in Testimonials (already `fill-accent` — no change needed)

---

## Tests to Update

- `__tests__/components/ProductCard.test.tsx` — price class assertion: `text-primary-vivid` → `text-accent`
- Badge class assertion if present: `bg-primary` → `bg-accent`
- `__tests__/components/AnnouncementBar.test.tsx` — bg class assertion: `bg-primary` → `bg-accent`
