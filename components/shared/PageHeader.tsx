import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function PageHeader({ title, subtitle, align = 'center' }: PageHeaderProps) {
  return (
    <div className={cn('section-outer bg-muted border-b border-border', align === 'center' && 'text-center')}>
      <div className="section-inner">
        <h1 className="font-display text-4xl md:text-5xl text-foreground leading-[1.1] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className={cn('mt-4 font-body text-base text-muted-foreground leading-7', align === 'center' && 'max-w-2xl mx-auto')}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
