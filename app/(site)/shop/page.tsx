// app/(site)/shop/page.tsx
import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import { PageHeader } from '@/components/shared/PageHeader'
import { ShopClient } from '@/components/shop/ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our full collection of handcrafted jewelry, accessories, hats, parasols, and sunglasses.',
}

export default function ShopPage() {
  const products = getProducts()
  return (
    <>
      <PageHeader
        title="Shop"
        subtitle="Handcrafted to shine — explore the full collection."
      />
      <div className="section-outer">
        <div className="section-inner">
          <ShopClient products={products} />
        </div>
      </div>
    </>
  )
}
