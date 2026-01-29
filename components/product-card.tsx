'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { useWishlist } from '@/context/wishlist-context'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  occasion: string
  isNew?: boolean
  isBestseller?: boolean
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  occasion,
  isNew,
  isBestseller,
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { user } = useAuth()
  const router = useRouter()
  const { addItem } = useCart()

  const isWishlisted = isInWishlist(slug)

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
        onClick={() => router.push(`/product/${slug}`)}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {isBestseller && (
            <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            await toggleWishlist(slug)
          }}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${isWishlisted ? 'fill-current text-red-500 animate-like' : ''
              }`}
          />
        </Button>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (!user) {
                router.push('/login')
                return
              }
              addItem({
                id,
                name,
                slug,
                price,
                image,
                size: '2T', // Default
                color: 'Default',
                quantity: 1
              })
            }}
          >
            Quick Add
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <Link href={`/product/${slug}`}>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {occasion}
            </p>
            <h3 className="font-medium text-sm leading-snug text-balance hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">{price.toFixed(2)} SAR</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toFixed(2)} SAR
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
