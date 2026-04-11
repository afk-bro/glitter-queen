# Gold Shine — Design Spec

**Date:** 2026-04-11
**Scope:** Replace the flat `bg-accent` gold on solid background elements with metallic gradients — a static shine on badges, an animated shimmer sweep on the announcement bar. Three component class swaps; all gradient logic lives in `app/globals.css`.

---

## Guiding Principle

The gold trim introduced in PR #6 uses a flat `#c9a24a` fill. A directional highlight makes it read as metal rather than paint. The effect should be confident, not glittery — a single bright streak, not multiple bands. The announcement bar earns the animation because it spans the full page width and is the first thing a visitor sees. Badges are small enough that movement would feel fidgety; a static bevel is enough.

---

## CSS Changes (`app/globals.css`)

### `.gold-badge` — static metallic gradient

A 135° diagonal gradient that derives all stops from `var(--accent)` via `color-mix`, so both light-mode gold (`#c9a24a`) and dark-mode gold (`#d4af37`) get correct highlight/shadow ratios with no extra theme rules.

```css
.gold-badge {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--accent) 70%, black) 0%,
    color-mix(in srgb, var(--accent) 60%, white) 38%,
    var(--accent) 55%,
    color-mix(in srgb, var(--accent) 75%, black) 100%
  );
}
```

Stop breakdown:
- `0%` — shadowed corner (gold mixed 30% toward black)
- `38%` — highlight (gold mixed 40% toward white)
- `55%` — base gold
- `100%` — shadowed corner again

### `.gold-shimmer` — animated sweep

Same streak embedded in a 300%-wide gradient. Solid gold occupies the left third (0–35%) and right third (65–100%), so both endpoints of the animation are identical — the loop jump is invisible. A single bright streak lives in the middle third and sweeps across the element continuously.

```css
.gold-shimmer {
  background: linear-gradient(
    105deg,
    var(--accent) 35%,
    color-mix(in srgb, var(--accent) 40%, white) 46%,
    color-mix(in srgb, var(--accent) 5%, white)  50%,
    color-mix(in srgb, var(--accent) 40%, white) 54%,
    var(--accent) 65%
  );
  background-size: 300% 100%;
  animation: gold-shimmer 4s linear infinite;
}

@keyframes gold-shimmer {
  0%   { background-position: right center; }
  100% { background-position: left center; }
}
```

Animation: `linear` at 4 s produces a steady, unhurried gleam. `ease-in-out` would slow the streak at both the entry and exit edges — less natural for a continuous loop.

---

## Component Changes

No structural changes. Three `bg-accent` class swaps only.

| File | Element | Before | After |
|---|---|---|---|
| `components/layout/AnnouncementBar.tsx:16` | root `<div>` | `bg-accent` | `gold-shimmer` |
| `components/shop/ProductCard.tsx:39` | Badge className | `bg-accent` | `gold-badge` |
| `components/product/ProductInfo.tsx:23` | Badge className | `bg-accent` | `gold-badge` |

`text-[#1a1a1a]` stays on all three — contrast fix is unrelated to background treatment.

---

## Test Changes

| File | Assertion | Before | After |
|---|---|---|---|
| `__tests__/components/AnnouncementBar.test.tsx` | root bg class | `toHaveClass('bg-accent')` | `toHaveClass('gold-shimmer')` |
| `__tests__/components/AnnouncementBar.test.tsx` | does not have lavender | `not.toHaveClass('bg-primary')` | unchanged |
| `__tests__/components/ProductCard.test.tsx` | badge bg class | `toHaveClass('bg-accent')` | `toHaveClass('gold-badge')` |

The `not.toHaveClass('bg-accent')` guard should be added to AnnouncementBar to prevent silent regression back to the flat fill.

---

## What Stays Flat

Gold text elements (`text-accent`) — eyebrow labels, prices, star fills — are not changed. Gradients on text require `background-clip: text` which adds complexity, reduces readability on small text, and isn't what was asked for.

The section dividers (`color-mix` hairline in `.section-outer::after`) are also unchanged — a gradient on a 1px line adds nothing visible.
