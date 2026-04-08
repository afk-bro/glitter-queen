import type { Product } from '@/types/product'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProductGrid } from '@/components/shop/ProductGrid'

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section-outer border-t border-border">
      <div className="section-inner">
        <SectionHeading title="You Might Also Love" align="left" />
        <div className="section-gap">
          <ProductGrid products={products} variant="dense" />
        </div>
      </div>
    </section>
  )
}
