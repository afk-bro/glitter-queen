// __tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductCard } from '@/components/shop/ProductCard'
import type { Product } from '@/types/product'

const mockProduct: Product = {
  id: '1',
  slug: 'test-hat',
  name: 'Test Hat',
  description: 'A test hat',
  price: 85,
  category: 'hats',
  images: ['1.jpg'],
  featured: true,
  badge: 'New',
  inStock: true,
}

describe('ProductCard', () => {
  it('renders the product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Hat')).toBeInTheDocument()
  })

  it('renders the formatted price via formatPrice', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$85.00')).toBeInTheDocument()
  })

  it('renders the badge when present', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('links to /shop/test-hat', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/shop/test-hat')
  })

  it('does not render badge when absent', () => {
    const { badge: _b, ...noBadge } = mockProduct
    render(<ProductCard product={noBadge} />)
    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })

  it('renders the price with text-accent class', () => {
    render(<ProductCard product={mockProduct} />)
    const price = screen.getByText('$85.00')
    expect(price).toHaveClass('text-accent')
  })

  it('renders badge with bg-accent class', () => {
    render(<ProductCard product={mockProduct} />)
    const badge = screen.getByText('New')
    expect(badge).toHaveClass('bg-accent')
  })

  it('renders a Quick view button', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByRole('button', { name: 'Quick view' })).toBeInTheDocument()
  })
})
