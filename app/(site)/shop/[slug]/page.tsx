import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts, getProductBySlug, getRelatedProducts } from '@/lib/products'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { ImageGallery } from '@/components/product/ImageGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { RelatedProducts } from '@/components/product/RelatedProducts'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Glitter Queen Creative`,
      description: product.description,
      images: product.images[0]
        ? [`/products/${product.slug}/${product.images[0]}`]
        : ['/logos/gq_light_logo.jpg'],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <>
      <div className="section-outer">
        <div className="section-inner">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: product.name, href: `/shop/${product.slug}` },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <ImageGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      {related.length > 0 && <RelatedProducts products={related} />}
    </>
  )
}
