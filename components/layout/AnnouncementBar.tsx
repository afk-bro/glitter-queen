'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type AnnouncementBarProps = {
  message: string
  dismissible?: boolean
}

export function AnnouncementBar({ message, dismissible = true }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    {/* text-[#1a1a1a] is hardcoded: --accent-foreground flips to light text in dark mode, failing contrast on gold */}
    <div className="relative bg-accent text-[#1a1a1a] text-center py-2 px-10 text-sm font-body tracking-wide">
      <span>{message}</span>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-80 hover:opacity-60 transition-opacity duration-200"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
