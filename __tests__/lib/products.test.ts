// __tests__/lib/products.test.ts
import { describe, it, expect } from 'vitest'
import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
  getRelatedProducts,
} from '@/lib/products'

describe('getProducts', () => {
  it('returns all 14 products when no category provided', () => {
    expect(getProducts()).toHaveLength(14)
  })

  it('returns only hats', () => {
    const result = getProducts('hats')
    expect(result.every(p => p.category === 'hats')).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns only parasols', () => {
    const result = getProducts('parasols')
    expect(result.every(p => p.category === 'parasols')).toBe(true)
  })

  it('returns only sunglasses', () => {
    const result = getProducts('sunglasses')
    expect(result.every(p => p.category === 'sunglasses')).toBe(true)
  })
})

describe('getProductBySlug', () => {
  it('returns the correct product', () => {
    const product = getProductBySlug('rainbow-parasol')
    expect(product?.name).toBe('Rainbow Fringe Parasol')
    expect(product?.category).toBe('parasols')
  })

  it('returns undefined for unknown slug', () => {
    expect(getProductBySlug('does-not-exist')).toBeUndefined()
  })
})

describe('getFeaturedProducts', () => {
  it('returns only featured products', () => {
    const result = getFeaturedProducts()
    expect(result.every(p => p.featured === true)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getNewArrivals', () => {
  it('returns only products with badge New', () => {
    const result = getNewArrivals()
    expect(result.every(p => p.badge === 'New')).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getRelatedProducts', () => {
  it('returns at most 3 products', () => {
    const product = getProductBySlug('rainbow-parasol')!
    expect(getRelatedProducts(product).length).toBeLessThanOrEqual(3)
  })

  it('excludes the current product', () => {
    const product = getProductBySlug('rainbow-parasol')!
    const result = getRelatedProducts(product)
    expect(result.find(p => p.slug === 'rainbow-parasol')).toBeUndefined()
  })

  it('returns products in the same category', () => {
    const product = getProductBySlug('rainbow-parasol')!
    const result = getRelatedProducts(product)
    expect(result.every(p => p.category === 'parasols')).toBe(true)
  })
})
