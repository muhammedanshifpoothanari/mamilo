'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { X, Plus, Minus, ShoppingBag, Heart, ChevronRight, ArrowLeft } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  slug: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  inStock: boolean
}

import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'

export default function CartPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { items: cartItems, removeItem, updateQuantity, cartTotal: subtotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) return null;



  const discount = promoApplied ? subtotal * 0.15 : 0
  const shipping = subtotal > 200 ? 0 : 25 // SAR 200 threshold, 25 SAR shipping
  const taxableAmount = Math.max(0, subtotal - discount)
  const tax = taxableAmount * 0.15 // 15% VAT
  const total = taxableAmount + shipping + tax

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome15') {
      setPromoApplied(true)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8 text-pretty">
              Looks like you haven't added any beautiful dresses to your cart yet.
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">
                Continue Shopping
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
          <h1 className="text-lg font-serif font-bold">My Cart ({cartItems.length})</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:mb-0 mb-20">
        {/* Header - Desktop */}
        <div className="mb-8 hidden lg:block">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 md:p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-32 md:w-32 md:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors text-balance">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)} SAR</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} SAR each</p>
                        )}
                      </div>
                    </div>

                    {/* Stock status removed for now as static data assumes stock */}
                  </div>
                </div>
              </Card>
            ))}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/shop">
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Heart className="mr-2 h-4 w-4" />
                Save for Later
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(2)} SAR</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount (15%)</span>
                    <span className="font-medium text-green-600">-{discount.toFixed(2)} SAR</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} SAR`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (15%)</span>
                  <span className="font-medium">{tax.toFixed(2)} SAR</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{total.toFixed(2)} SAR</span>
                </div>
              </div>

              {/* Promo Code */}
              {!promoApplied && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Have a promo code?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: WELCOME15 for 15% off
                  </p>
                </div>
              )}

              {promoApplied && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    Promo code applied! You're saving {discount.toFixed(2)} SAR
                  </p>
                </div>
              )}

              {/* Free Shipping Notice */}
              {subtotal < 200 && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium text-accent">
                    Add {(200 - subtotal).toFixed(2)} SAR more for free shipping!
                  </p>
                </div>
              )}

              <Button size="lg" className="w-full mb-4" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Secure checkout
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  30-day easy returns
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Free shipping over 200 SAR
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Checkout */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-primary">{total.toFixed(2)} SAR</p>
          </div>
          <Button size="lg" className="flex-1" asChild>
            <Link href="/checkout">
              Proceed to Checkout
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="hidden  lg:block">
        <Footer />
      </div>
    </div>
  )
}
