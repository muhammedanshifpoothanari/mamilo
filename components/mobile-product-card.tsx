'use client'

import { Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useWishlist } from '@/context/wishlist-context'
import { Badge } from "@/components/ui/badge"

interface MobileProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  occasion: string
}

export function MobileProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  occasion,
}: MobileProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { user } = useAuth()
  const router = useRouter()

  const isLiked = isInWishlist(slug)

  return (
    <div className="group relative active:scale-95 transition-transform duration-200">
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-3 cursor-pointer"
        onClick={() => router.push(`/product/${slug}`)}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-active:scale-95 transition-transform duration-200"
        />

        {/* Wishlist Button */}
        <button
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            await toggleWishlist(slug)
          }}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform z-10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'
              }`}
          />
        </button>
      </div>

      <Link href={`/product/${slug}`}>
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-tight line-clamp-2 text-balance">
            {name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">
              {price.toFixed(2)} SAR
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toFixed(2)} SAR
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {occasion}
          </p>
        </div>
      </Link>
    </div>
  )
}
