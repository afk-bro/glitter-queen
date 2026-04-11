import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'

describe('AnnouncementBar', () => {
  it('renders the message', () => {
    render(<AnnouncementBar message="Free shipping over $50" />)
    expect(screen.getByText('Free shipping over $50')).toBeInTheDocument()
  })

  it('has gold-shimmer class on root element', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).toHaveClass('gold-shimmer')
  })

  it('does not have bg-accent or bg-primary class', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).not.toHaveClass('bg-accent')
    expect(container.firstChild).not.toHaveClass('bg-primary')
  })

  it('uses hardcoded dark text for contrast on gold background', () => {
    const { container } = render(<AnnouncementBar message="Test" dismissible />)
    expect(container.firstChild).toHaveClass('text-[#1a1a1a]')
    expect(screen.getByLabelText('Dismiss announcement')).toHaveClass('text-[#1a1a1a]')
  })

  it('dismisses when the dismiss button is clicked', () => {
    render(<AnnouncementBar message="Test" dismissible />)
    fireEvent.click(screen.getByLabelText('Dismiss announcement'))
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })

  it('does not render dismiss button when dismissible is false', () => {
    render(<AnnouncementBar message="Test" dismissible={false} />)
    expect(screen.queryByLabelText('Dismiss announcement')).not.toBeInTheDocument()
  })
})
