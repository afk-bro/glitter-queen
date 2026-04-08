// components/shop/ProductGrid.tsx
import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product'

type ProductGridProps = {
  products: Product[]
  variant?: 'default' | 'dense'
}

export function ProductGrid({ products, variant = 'default' }: ProductGridProps) {
  const gridClass =
    variant === 'dense'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'grid grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <div className={gridClass}>
      {products.map(product => (
        <ProductCard
          key={product.slug}
          product={product}
          variant={variant === 'dense' ? 'compact' : 'default'}
        />
      ))}
    </div>
  )
}
