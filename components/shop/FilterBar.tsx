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
