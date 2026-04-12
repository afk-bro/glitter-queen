import type { Metadata } from 'next'
import { getFavorites } from '@/lib/products'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProductGrid } from '@/components/shop/ProductGrid'

export const metadata: Metadata = {
  title: 'Favourites',
  description: 'Our curated selection of most-loved handcrafted pieces.',
}

export default function FavouritesPage() {
  const products = getFavorites()
  return (
    <>
      <PageHeader
        title="Favourites"
        subtitle="Our most-loved pieces, curated by the maker."
      />
      <div className="section-outer">
        <div className="section-inner">
          <ProductGrid products={products} />
        </div>
      </div>
    </>
  )
}
