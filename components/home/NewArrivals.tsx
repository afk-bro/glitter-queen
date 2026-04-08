import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { getNewArrivals } from '@/lib/products'

export function NewArrivals() {
  const products = getNewArrivals().slice(0, 3)
  if (products.length === 0) return null
  return (
    <section className="section-outer bg-muted">
      <div className="section-inner">
        <SectionHeading
          title="New Arrivals"
          subtitle="Fresh from the studio — just added to the collection."
        />
        <div className="section-gap">
          <ProductGrid products={products} />
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-soft px-8">
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
