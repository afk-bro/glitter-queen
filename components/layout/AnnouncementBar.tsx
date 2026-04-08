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
    <div className="relative bg-primary-soft text-primary text-center py-2 px-10 text-sm font-body tracking-wide">
      <span>{message}</span>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
