// lib/products.ts
import productsData from '@/data/products.json'
import type { Product, ProductCategory } from '@/types/product'

const products = productsData as Product[]

export function getProducts(category?: ProductCategory): Product[] {
  if (!category) return products
  return products.filter(p => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured === true)
}

export function getFavorites(): Product[] {
  return products.filter(p => p.favorite === true)
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.badge === 'New')
}

export function getRelatedProducts(current: Product): Product[] {
  return products
    .filter(p => p.category === current.category && p.slug !== current.slug)
    .slice(0, 3)
}
