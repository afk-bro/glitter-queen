'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex flex-col gap-6">
      {product.badge && (
        {/* text-[#1a1a1a] hardcoded: --accent-foreground flips to light in dark mode, failing contrast on gold */}
        <Badge className="w-fit bg-accent text-[#1a1a1a] tracking-widest uppercase text-xs rounded-full">
          {product.badge}
        </Badge>
      )}

      <div>
        <h1 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] tracking-tight">
          {product.name}
        </h1>
        <p className="mt-3 font-body text-2xl text-primary font-medium">
          {formatPrice(product.price)}
        </p>
      </div>

      <p className="font-body text-muted-foreground leading-7 max-w-prose">
        {product.description}
      </p>

      <div className="flex items-center gap-4">
        <span className="font-body text-sm text-foreground">Qty</span>
        <div className="flex items-center border border-border rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 text-foreground hover:text-primary transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-2 font-body text-foreground border-x border-border min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-4 py-2 text-foreground hover:text-primary transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <Button
        size="lg"
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        onClick={() => toast('Shopping cart coming soon.')}
      >
        Add to Bag
      </Button>

      <p className="font-body text-xs text-muted-foreground">
        Free shipping on orders over $75 · Handcrafted with care
      </p>

      <Accordion type="single" collapsible className="border-t border-border">
        <AccordionItem value="details">
          <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline">
            Product Details
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
            Each piece is individually handcrafted. No two items are exactly alike — slight variations are part of the handmade character.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline">
            Care Instructions
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
            Handle with care. Keep away from moisture and direct sunlight. Store in a cool, dry place.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="font-body text-sm text-foreground hover:no-underline">
            Shipping & Returns
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-7">
            Orders ship within 3–5 business days. Returns accepted within 14 days for unworn items.{' '}
            <a href="/shipping-returns" className="text-primary underline underline-offset-2">
              Full policy →
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
