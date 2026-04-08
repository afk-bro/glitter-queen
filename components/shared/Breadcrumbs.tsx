import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = { label: string; href: string }

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 font-body text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i < items.length - 1 ? (
              <>
                <Link href={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
              </>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
