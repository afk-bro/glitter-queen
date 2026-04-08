'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '@/types/product'

export function ImageGallery({ product }: { product: Product }) {
  const images = product.images.length > 0 ? product.images : []
  const [activeIndex, setActiveIndex] = useState(0)

  const mainSrc = images[activeIndex]
    ? `/products/${product.slug}/${images[activeIndex]}`
    : '/products/placeholder.jpg'

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
        <Image
          src={mainSrc}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-primary' : 'border-border'
              }`}
            >
              <Image
                src={`/products/${product.slug}/${img}`}
                alt={`${product.name} — view ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
