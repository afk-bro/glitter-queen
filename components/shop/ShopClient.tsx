// components/shop/ShopClient.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Product, ProductCategory } from '@/types/product'
import { FilterBar } from './FilterBar'
import { ProductGrid } from './ProductGrid'
import { EmptyState } from '@/components/shared/EmptyState'

const VALID_CATEGORIES: ProductCategory[] = ['hats', 'parasols', 'earrings-jewelry', 'sunglasses', 'apparel']

type ShopClientProps = {
  products: Product[]
}

export function ShopClient({ products }: ShopClientProps) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') as ProductCategory | null
  const initial = categoryParam && VALID_CATEGORIES.includes(categoryParam) ? categoryParam : 'all'
  const [active, setActive] = useState<ProductCategory | 'all'>(initial)

  useEffect(() => {
    const param = searchParams.get('category') as ProductCategory | null
    if (param && VALID_CATEGORIES.includes(param)) {
      setActive(param)
    } else {
      setActive('all')
    }
  }, [searchParams])

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
