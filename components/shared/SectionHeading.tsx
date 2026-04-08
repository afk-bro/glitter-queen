import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({ title, subtitle, align = 'center', as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left')}>
      <Tag className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
        {title}
      </Tag>
      {subtitle && (
        <p className={cn('mt-3 font-body text-base text-muted-foreground leading-7', align === 'center' && 'max-w-xl mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
