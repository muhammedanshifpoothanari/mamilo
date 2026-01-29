import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-[#D6D3CD] animate-pulse rounded-md', className)}
      {...props}
      {...props}
    />
  )
}

export { Skeleton }
