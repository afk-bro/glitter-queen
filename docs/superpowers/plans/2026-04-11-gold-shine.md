# Gold Shine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat gold fill on the announcement bar and product badges with metallic gradient classes — a static bevel on badges, an animated shimmer sweep on the announcement bar.

**Architecture:** Two new CSS utility classes (`.gold-badge`, `.gold-shimmer`) and one `@keyframes` block are added to `app/globals.css`. Three components swap `bg-accent` for the appropriate class. Tests are updated to assert the new class names.

**Tech Stack:** Next.js 16 App Router, Tailwind v4 CSS-first config (`app/globals.css`), Vitest + Testing Library

---

## File Map

**Modified:**
- `app/globals.css` — add `.gold-badge`, `.gold-shimmer`, `@keyframes gold-shimmer`
- `components/layout/AnnouncementBar.tsx:16` — `bg-accent` → `gold-shimmer`
- `components/shop/ProductCard.tsx:39` — badge `bg-accent` → `gold-badge`
- `components/product/ProductInfo.tsx:23` — badge `bg-accent` → `gold-badge`

**Tests modified:**
- `__tests__/components/AnnouncementBar.test.tsx` — `bg-accent` assertions → `gold-shimmer`; add `not.toHaveClass('bg-accent')`
- `__tests__/components/ProductCard.test.tsx` — badge `bg-accent` assertion → `gold-badge`

---

### Task 1: Add gold CSS utility classes to `globals.css`

**Files:**
- Modify: `app/globals.css`

No Vitest test covers CSS rendering — the tests in Tasks 2 and 3 verify class *presence* on DOM elements. This task just adds the classes so the component tasks can reference them.

- [ ] **Step 1: Add `.gold-badge`, `.gold-shimmer`, and `@keyframes` to `app/globals.css`**

Append the following **after the closing `}` of the existing `@layer utilities` block** (currently the last line of the file, line 142):

```css

/* ─── Gold shine utilities ─── */
@layer utilities {
  .gold-badge {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 70%, black) 0%,
      color-mix(in srgb, var(--accent) 60%, white) 38%,
      var(--accent) 55%,
      color-mix(in srgb, var(--accent) 75%, black) 100%
    );
  }
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
}

@keyframes gold-shimmer {
  0%   { background-position: right center; }
  100% { background-position: left center; }
}
```

**Why a second `@layer utilities` block?** Tailwind v4 merges all `@layer utilities` declarations. A separate block with a comment keeps the gold utilities visually distinct from the layout utilities above.

**Why `@keyframes` outside any `@layer`?** `@keyframes` is a top-level CSS rule — nesting it inside a layer causes it to be scoped to that layer in some browsers, which breaks the animation reference. Declaring it at the top level ensures it is always reachable.

**Why `color-mix` stops?** All gradient stops are derived from `var(--accent)`, which is `#c9a24a` in light mode and `#d4af37` in dark mode. Using `color-mix` means no separate dark-mode overrides are needed — the gradient adapts automatically.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add gold-badge and gold-shimmer CSS utilities"
```

---

### Task 2: AnnouncementBar → gold-shimmer

**Files:**
- Modify: `components/layout/AnnouncementBar.tsx:16`
- Test: `__tests__/components/AnnouncementBar.test.tsx`

- [ ] **Step 1: Update the tests (write failing assertions)**

In `__tests__/components/AnnouncementBar.test.tsx`, replace the two bg-class tests:

From:
```tsx
  it('has bg-accent class on root element', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).toHaveClass('bg-accent')
  })

  it('does not have bg-primary class', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).not.toHaveClass('bg-primary')
  })
```

To:
```tsx
  it('has gold-shimmer class on root element', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).toHaveClass('gold-shimmer')
  })

  it('does not have bg-accent or bg-primary class', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).not.toHaveClass('bg-accent')
    expect(container.firstChild).not.toHaveClass('bg-primary')
  })
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run __tests__/components/AnnouncementBar.test.tsx
```

Expected: FAIL — `has gold-shimmer class on root element` fails (element has `bg-accent`, not `gold-shimmer`); `does not have bg-accent or bg-primary class` fails for the same reason.

- [ ] **Step 3: Update the component**

In `components/layout/AnnouncementBar.tsx`, line 16:

From:
```tsx
    <div className="relative bg-accent text-[#1a1a1a] text-center py-2 px-10 text-sm font-body tracking-wide">
```

To:
```tsx
    <div className="relative gold-shimmer text-[#1a1a1a] text-center py-2 px-10 text-sm font-body tracking-wide">
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run __tests__/components/AnnouncementBar.test.tsx
```

Expected: all 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add components/layout/AnnouncementBar.tsx __tests__/components/AnnouncementBar.test.tsx
git commit -m "feat: announcement bar bg-accent → gold-shimmer animated gradient"
```

---

### Task 3: Product badges → gold-badge

**Files:**
- Modify: `components/shop/ProductCard.tsx:39`
- Modify: `components/product/ProductInfo.tsx:23`
- Test: `__tests__/components/ProductCard.test.tsx`

- [ ] **Step 1: Update the test (write failing assertion)**

In `__tests__/components/ProductCard.test.tsx`, replace the badge class test:

From:
```tsx
  it('renders badge with bg-accent and dark text classes', () => {
    render(<ProductCard product={mockProduct} />)
    const badge = screen.getByText('New')
    expect(badge).toHaveClass('bg-accent')
    expect(badge).toHaveClass('text-[#1a1a1a]')
  })
```

To:
```tsx
  it('renders badge with gold-badge and dark text classes', () => {
    render(<ProductCard product={mockProduct} />)
    const badge = screen.getByText('New')
    expect(badge).toHaveClass('gold-badge')
    expect(badge).toHaveClass('text-[#1a1a1a]')
  })
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run __tests__/components/ProductCard.test.tsx
```

Expected: FAIL — `renders badge with gold-badge and dark text classes` fails (badge has `bg-accent`, not `gold-badge`).

- [ ] **Step 3: Update ProductCard**

In `components/shop/ProductCard.tsx`, line 39:

From:
```tsx
              <Badge className="bg-accent text-[#1a1a1a] text-xs tracking-widest uppercase rounded-full">
```

To:
```tsx
              <Badge className="gold-badge text-[#1a1a1a] text-xs tracking-widest uppercase rounded-full">
```

- [ ] **Step 4: Update ProductInfo**

In `components/product/ProductInfo.tsx`, line 23:

From:
```tsx
        <Badge className="w-fit bg-accent text-[#1a1a1a] tracking-widest uppercase text-xs rounded-full">
```

To:
```tsx
        <Badge className="w-fit gold-badge text-[#1a1a1a] tracking-widest uppercase text-xs rounded-full">
```

- [ ] **Step 5: Run full test suite to verify all pass**

```bash
npm run test:run
```

Expected: all 36 tests PASS

- [ ] **Step 6: Commit**

```bash
git add components/shop/ProductCard.tsx components/product/ProductInfo.tsx __tests__/components/ProductCard.test.tsx
git commit -m "feat: product badges bg-accent → gold-badge metallic gradient"
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| `.gold-badge` static 135° metallic gradient in `globals.css` | Task 1 ✓ |
| `.gold-shimmer` animated 300%-wide gradient + `@keyframes` in `globals.css` | Task 1 ✓ |
| `AnnouncementBar.tsx` `bg-accent` → `gold-shimmer` | Task 2 ✓ |
| `ProductCard.tsx` badge `bg-accent` → `gold-badge` | Task 3 ✓ |
| `ProductInfo.tsx` badge `bg-accent` → `gold-badge` | Task 3 ✓ |
| `AnnouncementBar.test.tsx` updated + `not.toHaveClass('bg-accent')` added | Task 2 ✓ |
| `ProductCard.test.tsx` badge assertion updated | Task 3 ✓ |
| `text-[#1a1a1a]` left untouched on all three elements | Tasks 2 & 3 ✓ |

**Placeholder scan:** No TBD, TODO, or vague steps. All code blocks are complete and copy-paste-ready.

**Class name consistency:** `gold-badge` and `gold-shimmer` are used consistently across globals.css, component edits, and test assertions. No drift.
