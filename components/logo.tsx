
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'text-only' | 'icon-only'
  className?: string
  showTagline?: boolean
}

export function Logo({ variant = 'text-only', className = '', showTagline = false }: LogoProps) {
  // Using generic cursive fallback or the variable we injected
  const cursiveClass = "font-[family-name:var(--font-cursive)]"

  if (variant === 'full') {
    return (
      <Link href="/" className={`flex flex-col items-center gap-1 ${className}`}>
        <span className={`text-5xl ${cursiveClass} font-bold tracking-tight text-pink-500`}>
          Mamilo
        </span>
        <p className="text-sm text-muted-foreground font-medium tracking-wide pt-1">
          Mother's Favorite Girl
        </p>
      </Link>
    )
  }

  if (variant === 'icon-only') {
    return (
      <Link href="/" className={`flex items-center justify-center bg-pink-100 text-pink-500 w-10 h-10 rounded-full ${className}`}>
        <span className={`${cursiveClass} font-bold text-2xl`}>M</span>
      </Link>
    )
  }

  // text-only variant (default)
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="flex flex-col">
        <span className={`text-4xl md:text-5xl ${cursiveClass} font-bold tracking-tight text-pink-500 group-hover:opacity-90 transition-opacity`}>
          Mamilo
        </span>
        {showTagline && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest pl-1">Mother's Favorite Girl</p>
        )}
      </div>
    </Link>
  )
}
