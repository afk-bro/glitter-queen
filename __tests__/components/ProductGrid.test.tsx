// __tests__/components/ProductGrid.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductGrid } from '@/components/shop/ProductGrid'
import type { Product } from '@/types/product'

const make = (n: number): Product => ({
  id: String(n),
  slug: `product-${n}`,
  name: `Product ${n}`,
  description: '',
  price: 50 + n,
  category: 'hats',
  images: ['1.jpg'],
})

describe('ProductGrid', () => {
  it('renders all products', () => {
    render(<ProductGrid products={[make(1), make(2), make(3)]} />)
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('Product 3')).toBeInTheDocument()
  })

  it('renders the correct number of links', () => {
    render(<ProductGrid products={[make(1), make(2)]} />)
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('renders no links when products array is empty', () => {
    render(<ProductGrid products={[]} />)
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
