import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with cta variant classes', () => {
    render(<Button variant="cta">Shop Now</Button>)
    const btn = screen.getByRole('button', { name: 'Shop Now' })
    expect(btn).toHaveClass('bg-primary-vivid')
    expect(btn).toHaveClass('text-white')
  })
})
