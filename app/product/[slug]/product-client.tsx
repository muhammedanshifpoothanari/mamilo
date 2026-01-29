'use client'

import React from "react"
import { useState } from 'react'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { MobileProductGallery } from '@/components/mobile-product-gallery'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { MobileProductCard } from '@/components/mobile-product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter, notFound } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { useWishlist } from '@/context/wishlist-context'
import { products } from '@/lib/data'
import { useToast } from "@/hooks/use-toast"

export default function ProductClient() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addItem, items } = useCart()
  const { toast } = useToast()

  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }

  const isWishlisted = isInWishlist(product.slug)

  // Create gallery images from main image + color variants
  const galleryImages = [
    product.image,
    ...product.colors.map((c: any) => typeof c === 'object' ? c.image : null).filter(Boolean)
  ].filter((img, i, arr) => arr.indexOf(img) === i); // Unique

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(
    typeof product.colors[0] === 'object' ? product.colors[0].name : product.colors[0]
  )
  const [quantity, setQuantity] = useState(1)

  const handleColorSelect = (color: any) => {
    const colorName = typeof color === 'object' ? color.name : color;
    setSelectedColor(colorName);

    // Find image index
    if (typeof color === 'object' && color.image) {
      const imgIndex = galleryImages.indexOf(color.image);
      if (imgIndex !== -1) setSelectedImage(imgIndex);
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login')
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    if (!user) {
      router.push('/login')
      return
    }

    // For "Buy Now", navigate to checkout with this item as direct purchase
    // Don't add to cart - just pass the item details
    const directBuyItem = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    }

    // Store in sessionStorage for checkout page to read
    sessionStorage.setItem('directBuyItem', JSON.stringify(directBuyItem))
    router.push('/checkout?mode=direct')
  }

  // Filter related products (same occasion, excluding current)
  const relatedProducts = products
    .filter(p => p.occasion === product.occasion && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen" >
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50" >
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/shop" className="p-2 -ml-2 active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-sm font-semibold truncate max-w-[200px] text-center flex-1">{product.name}</h1>
          <button
            className="p-2 -mr-2 active:scale-95 transition-transform"
            onClick={async () => await toggleWishlist(product.slug)}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div >

      <div className="container mx-auto px-4 py-8 md:py-12 lg:mt-0">
        {/* Breadcrumb - Desktop Only */}
        <nav className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="h-4 w-4" />
          <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Mobile Gallery */}
        <MobileProductGallery images={galleryImages} productName={product.name} />

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images Gallery - Desktop Only */}
          <div className="space-y-4 hidden lg:block">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <Image
                src={galleryImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              {product.isBestseller && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Bestseller
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.occasion}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(4.8)
                        ? 'fill-accent text-accent'
                        : 'text-muted'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">
                  (125 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">{(product.price * quantity).toFixed(2)} SAR</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice.toFixed(2)} SAR
                    </span>
                    <Badge variant="secondary" className="text-accent">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="block text-sm font-medium mb-3">
                Color: <span className="text-muted-foreground">{selectedColor}</span>
              </Label>
              <div className="flex gap-3">
                <div className="flex gap-3">
                  {product.colors.map((color: any) => {
                    const colorName = typeof color === 'object' ? color.name : color;
                    const colorHex = typeof color === 'object' ? color.hex : null; // Optional: use hex for circle?

                    return (
                      <button
                        key={colorName}
                        onClick={() => handleColorSelect(color)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${selectedColor === colorName
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                          }`}
                      >
                        {colorName}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="block text-sm font-medium mb-3">
                  Size: <span className="text-muted-foreground">{selectedSize}</span>
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border-2 text-sm font-medium transition-all ${selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <a href="#" className="text-sm text-primary hover:underline mt-2 inline-block">
                  Size Guide
                </a>
              </div>

              {/* Quantity */}
              <div>
                <Label className="block text-sm font-medium mb-3">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Actions - Desktop */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" className="flex-[2]" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="sm:w-auto bg-transparent"
                  onClick={async () => await toggleWishlist(product.slug)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>

              {/* Stock Status */}
              {true && (
                <p className="text-sm text-green-600 font-medium">
                  In Stock - Ships within 2-3 business days
                </p>
              )}

              {/* Features */}
              <Card className="p-6 space-y-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over 200 SAR</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Quality Guarantee</p>
                    <p className="text-sm text-muted-foreground">Premium craftsmanship</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger value="details" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Details
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Features
                </TabsTrigger>
                <TabsTrigger value="care" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Care Instructions
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Reviews (125)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-8 space-y-4">
                <h3 className="text-xl font-serif font-semibold">Product Details</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Rosebud Princess Dress is meticulously handcrafted with attention to every detail. Each dress features multiple layers of premium tulle over a soft cotton lining, ensuring both beauty and comfort for your little one. The delicate rosebud appliqués are hand-sewn by skilled artisans, making each dress unique.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Perfect for birthday parties, photo shoots, or any special celebration where your princess deserves to shine. The adjustable back tie and elastic waist ensure a comfortable, customizable fit that will last through multiple wears.
                </p>
              </TabsContent>

              <TabsContent value="features" className="mt-8">
                <h3 className="text-xl font-serif font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">{`Premium Feature ${index + 1}`}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="care" className="mt-8">
                <h3 className="text-xl font-serif font-semibold mb-4">Care Instructions</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p><strong>Washing:</strong> Machine wash on delicate cycle in cold water. Use a mesh laundry bag to protect delicate details.</p>
                  <p><strong>Drying:</strong> Air dry flat or hang to dry. Do not tumble dry to preserve the shape and quality of the tulle.</p>
                  <p><strong>Ironing:</strong> Use low heat on the cotton lining only. Steam gently to remove wrinkles from tulle layers.</p>
                  <p><strong>Storage:</strong> Hang or store flat in a breathable garment bag. Avoid plastic bags which can trap moisture.</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <h3 className="text-xl font-serif font-semibold mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[
                    {
                      name: 'Sarah M.',
                      rating: 5,
                      date: 'January 15, 2026',
                      title: 'Absolutely Perfect!',
                      comment: 'My daughter looked like a princess at her birthday party. The quality is exceptional and the fit was perfect. Worth every penny!',
                    },
                    {
                      name: 'Emily R.',
                      rating: 5,
                      date: 'January 10, 2026',
                      title: 'Beautiful dress',
                      comment: 'The dress exceeded my expectations. The fabric is soft, the details are gorgeous, and my little one was so comfortable in it all day.',
                    },
                    {
                      name: 'Jessica L.',
                      rating: 4,
                      date: 'January 5, 2026',
                      title: 'Lovely but runs small',
                      comment: 'Beautiful dress with amazing quality. I would recommend sizing up - we ordered her usual size and it was a bit snug.',
                    },
                  ].map((review, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-balance">
                  You May Also Love
                </h2>
                <p className="text-muted-foreground">Complete the look with these stunning dresses</p>
              </div>
              <Button variant="outline" className="hidden md:flex bg-transparent">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 lg:hidden mb-20">
              {relatedProducts.map((product) => (
                <MobileProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Add to Cart */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-lg font-bold text-primary">{(product.price * quantity).toFixed(2)} SAR</p>
            </div>
            <div className="flex flex-1 gap-2 justify-end">
              <Button size="lg" variant="outline" className="px-3" onClick={handleAddToCart}>
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-40 lg:pb-0">
          <Footer />
        </div>
      </div>
    </div >
  )
}

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
