import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('sonner', () => {
  const mockToast = vi.fn()
  return { toast: mockToast }
})

import { QuickViewButton } from '@/components/shop/QuickViewButton'
import { toast } from 'sonner'

const mockToast = vi.mocked(toast)

describe('QuickViewButton', () => {
  beforeEach(() => {
    mockToast.mockClear()
  })

  it('renders a button with text "Quick view"', () => {
    render(<QuickViewButton />)
    expect(screen.getByRole('button', { name: 'Quick view' })).toBeInTheDocument()
  })

  it('calls toast with correct message on click', () => {
    render(<QuickViewButton />)
    fireEvent.click(screen.getByRole('button', { name: 'Quick view' }))
    expect(mockToast).toHaveBeenCalledWith('Quick view coming soon')
  })

  it('prevents default on click to avoid navigating the parent link', () => {
    render(<QuickViewButton />)
    const btn = screen.getByRole('button', { name: 'Quick view' })
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    btn.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })
})
