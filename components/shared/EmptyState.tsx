type EmptyStateProps = {
  message?: string
}

export function EmptyState({ message = 'No products found in this category — try another filter ✨' }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-24 text-center">
      <p className="font-body text-muted-foreground text-base leading-7">{message}</p>
    </div>
  )
}
