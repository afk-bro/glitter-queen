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
