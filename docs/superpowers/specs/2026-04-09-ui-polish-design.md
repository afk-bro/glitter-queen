# UI Polish — Design Spec

**Date:** 2026-04-09
**Scope:** Four targeted improvements to contrast, CTA hierarchy, hero punch, and product card interaction.

---

## 1. Contrast & Readability

### New tokens (`app/globals.css`)

```css
/* :root */
--primary-dark: #6d28d9;          /* deep violet — action & emphasis only */
--text-accent: var(--primary-dark); /* semantic: readable purple on light bg */
--text-brand:  var(--primary);      /* semantic: decorative lavender, not for body text */

/* .dark */
--primary-dark: #7c3aed;          /* slightly lighter for dark card backgrounds */
```

Register in `@theme inline`:
```css
--color-primary-dark: var(--primary-dark);
```

### AnnouncementBar (`components/layout/AnnouncementBar.tsx`)

- Background/text: change from `bg-primary-soft text-primary` → `bg-primary text-primary-foreground`
- Dismiss button: `hover:opacity-60 transition-opacity duration-200` (was `hover:opacity-70`, no transition)

### Product price (`components/shop/ProductCard.tsx`)

- Change price color from `text-primary` → `text-primary-dark`
- Rationale: `#a78bfa` on white = ~2.5:1 (WCAG fail). `#6d28d9` on white = ~7.4:1 (WCAG AAA pass).

---

## 2. CTA Hierarchy

### New `cta` button variant (`components/ui/button.tsx`)

Add to `buttonVariants` CVA alongside `default` and `outline`:

```
cta:
  bg-primary-dark
  text-white
  shadow-[0_4px_16px_color-mix(in_srgb,var(--primary-dark)_35%,transparent)]

  hover:-translate-y-0.5
  hover:shadow-[0_6px_24px_color-mix(in_srgb,var(--primary-dark)_50%,transparent)]

  focus-visible:ring-2
  focus-visible:ring-primary-dark/50

  active:translate-y-px
  active:shadow-[0_2px_8px_color-mix(in_srgb,var(--primary-dark)_25%,transparent)]
```

### Update call sites

Switch `variant` (or remove default) and keep existing `className` overrides for padding/shape:

- `components/home/HeroSection.tsx` — "Shop Now" button
- `components/shared/CTABanner.tsx` — primary action button
- `components/home/NewsletterSignup.tsx` — subscribe button

**Secondary/outline buttons stay lavender.** `variant="outline"` with `border-primary text-primary` is correct for secondary actions ("Our Story", "View Collection"). Deep violet is reserved for primary CTAs only.

---

## 3. Hero

**File:** `components/home/HeroSection.tsx`

### Gradient overlay

Strengthen from:
```
from-black/30 via-black/50 to-black/65
```
to:
```
from-black/10 via-black/50 to-black/80
```
Lighter at the top (image reads better), darker at the bottom (headline and buttons have solid backing).

### Headline

- Add `drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]` for crispness at the text edge
- Size scale: `text-6xl sm:text-7xl md:text-9xl`
  - Mobile (`< 640px`): `text-6xl` — unchanged, script font wraps safely
  - Small (`≥ 640px`): `text-7xl` — gentle ramp
  - Medium+ (`≥ 768px`): `text-9xl` — full impact at desktop widths

**Implementation note:** verify wrap behaviour at 1280px laptop and tablet portrait before committing. If `sm:text-7xl` causes awkward wrapping on any width, fall back to `text-6xl md:text-9xl` (skip the sm step).

---

## 4. Product Card — Quick View

**Files:** `components/shop/ProductCard.tsx` (server component stays server), new `components/shop/QuickViewButton.tsx` (client component)

### Composed interaction

All three layers share `duration-300 ease-out` so they feel like one movement, not three:

| Layer | Trigger | Transition |
|---|---|---|
| Image (`object-cover`) | `group-hover:scale-105` | `duration-300 ease-out` (already in place) |
| Scrim (gradient div) | `opacity-0 group-hover:opacity-100` | `duration-300 ease-out` |
| Quick View button | `opacity-0 group-hover:opacity-100` | `duration-300 ease-out` |

### Scrim

```jsx
<div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-end justify-center pb-4">
  <QuickViewButton />
</div>
```

- `pointer-events-none` on the container — hover state stays clean, no interference with card link
- `pb-4` positions the button slightly above the bottom edge, tied to the fade zone (not dead-centred)

### QuickViewButton

```tsx
'use client'
// Fires Sonner toast — Phase 1 stub
```

- `pointer-events-auto` to re-enable clicks on the button only
- Pill style: `rounded-full bg-white/90 text-foreground text-xs font-body px-4 py-1.5 hover:bg-white transition-colors`
- Toast: `toast("Quick view coming soon")`

---

## Out of scope

- Actual quick-view modal / drawer (Phase 2)
- Changing any token used by non-CTA UI elements
- Modifying card layout or grid
