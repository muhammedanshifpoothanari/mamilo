'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useWishlist } from '@/context/wishlist-context'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { MobileProductCard } from '@/components/mobile-product-card'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingBag, ChevronRight, ArrowLeft } from 'lucide-react'

export default function WishlistPage() {
  const { user, loading } = useAuth()
  const { wishlist } = useWishlist()
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [loadingItems, setLoadingItems] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const allProducts = data.products || []
        const filtered = allProducts.filter((p: any) => wishlist.includes(p.slug))
        setWishlistItems(filtered)
        setLoadingItems(false)
      })
      .catch(err => {
        console.error(err)
        setLoadingItems(false)
      })
  }, [wishlist])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) return null;

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="hidden lg:block">
          <Navigation />
        </div>
        <MobileNavigation />

        <div className="flex-1 flex items-center justify-center py-16 lg:mt-0 mt-14">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8 text-pretty">
              Start adding dresses you love to create your dream collection
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">
                Discover Dresses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/shop" className="p-2 -ml-2 active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-serif font-bold">Wishlist ({wishlistItems.length})</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:mb-0 mb-20">
        {/* Header - Desktop */}
        <div className="mb-8 hidden lg:block">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'dress' : 'dresses'} saved for later
          </p>
        </div>

        {/* Products Grid */}
        <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mobile Products Grid */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {wishlistItems.map((product) => (
            <MobileProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center p-8 bg-secondary/30 rounded-2xl">
          <h3 className="text-2xl font-serif font-bold mb-3">Ready to Complete Your Collection?</h3>
          <p className="text-muted-foreground mb-6 text-pretty max-w-xl mx-auto">
            These beautiful dresses are waiting to make your little princess's special day unforgettable
          </p>
          <Button size="lg" asChild>
            <Link href="/shop">
              Continue Shopping
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Sticky Actions */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Items</p>
            <p className="text-lg font-bold text-primary">{wishlistItems.length}</p>
          </div>
          <div className="flex flex-1 gap-2 justify-end">
            <Button size="lg" variant="outline" className="px-3">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button size="lg" className="flex-1" asChild>
              <Link href="/checkout">
                Buy All Now
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
