export type ProductCategory =
  | 'hats'
  | 'parasols'
  | 'earrings-jewelry'
  | 'sunglasses'
  | 'apparel'

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number       // dollars, e.g. 85.00
  category: ProductCategory
  images: string[]   // filenames relative to /public/products/{slug}/
  featured?: boolean
  badge?: string     // e.g. "New", "Limited"
  inStock?: boolean
}
