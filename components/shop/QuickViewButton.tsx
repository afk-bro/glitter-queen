'use client'

import { toast } from 'sonner'

export function QuickViewButton() {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        toast('Quick view coming soon')
      }}
      className="pointer-events-auto rounded-full bg-white/90 text-foreground text-xs font-body px-4 py-1.5 hover:bg-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Quick view"
    >
      Quick view
    </button>
  )
}
