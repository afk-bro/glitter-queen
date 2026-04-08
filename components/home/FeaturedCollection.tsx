import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { getFeaturedProducts } from '@/lib/products'

export function FeaturedCollection() {
  const products = getFeaturedProducts().slice(0, 4)
  return (
    <section className="section-outer">
      <div className="section-inner">
        <SectionHeading
          title="Featured Pieces"
          subtitle="Handcrafted statement pieces that stop the show."
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
