// __tests__/lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats a whole number as USD currency', () => {
    expect(formatPrice(85)).toBe('$85.00')
  })

  it('formats a decimal price correctly', () => {
    expect(formatPrice(42.5)).toBe('$42.50')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats a large price with correct separators', () => {
    expect(formatPrice(1200)).toBe('$1,200.00')
  })
})
