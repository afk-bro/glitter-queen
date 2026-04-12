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
