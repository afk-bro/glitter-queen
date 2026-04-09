// components/shop/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type ProductCardProps = {
  product: Product
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const imageSrc = product.images[0]
    ? `/products/${product.slug}/${product.images[0]}`
    : '/products/placeholder.jpg'

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    >
      <div className={`relative overflow-hidden bg-muted ${variant === 'compact' ? 'aspect-square' : 'aspect-[3/4]'}`}>
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={
            variant === 'compact'
              ? '(max-width: 768px) 50vw, 25vw'
              : '(max-width: 768px) 50vw, 33vw'
          }
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground text-xs tracking-widest uppercase rounded-full">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>
      <div className={variant === 'compact' ? 'p-3' : 'p-4'}>
        <h3 className={`font-display text-foreground leading-[1.2] tracking-tight ${variant === 'compact' ? 'text-sm' : 'text-base'}`}>
          {product.name}
        </h3>
        <p className="mt-1 font-body text-primary-dark font-medium text-sm">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
