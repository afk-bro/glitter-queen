import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'

describe('AnnouncementBar', () => {
  it('renders the message', () => {
    render(<AnnouncementBar message="Free shipping over $50" />)
    expect(screen.getByText('Free shipping over $50')).toBeInTheDocument()
  })

  it('has bg-accent class on root element', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).toHaveClass('bg-accent')
  })

  it('does not have bg-primary class', () => {
    const { container } = render(<AnnouncementBar message="Test" />)
    expect(container.firstChild).not.toHaveClass('bg-primary')
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
