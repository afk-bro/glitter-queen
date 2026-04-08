'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-foreground">Your Bag</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center h-[60%] gap-4 text-center px-4">
          <p className="font-body text-muted-foreground text-sm leading-7">
            Your bag is coming soon — check back soon!
          </p>
          <Button
            disabled
            variant="outline"
            className="w-full rounded-full border-border text-muted-foreground"
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
