'use client'

import { useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Star, Heart, ChevronRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
import {
  MobileHeroSkeleton,
  MobileStoriesSkeleton,
  MobileProductRailSkeleton,
  MobileShopGridSkeleton
} from "@/components/mobile-skeletons"

const MobileHeroSlider = dynamic(() => import('@/components/mobile-hero-slider').then(mod => mod.MobileHeroSlider), {
  loading: () => <MobileHeroSkeleton />,
})
const MobileStories = dynamic(() => import('@/components/mobile-stories').then(mod => mod.MobileStories), {
  loading: () => <MobileStoriesSkeleton />,
})
const MobileProductRail = dynamic(() => import('@/components/mobile-product-rail').then(mod => mod.MobileProductRail), {
  loading: () => <MobileProductRailSkeleton />,
})
const MobileShopGrid = dynamic(() => import('@/components/mobile-shop-grid').then(mod => mod.MobileShopGrid), {
  loading: () => <MobileShopGridSkeleton />,
})
import { NewsletterForm } from "@/components/newsletter-form"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { products } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import confetti from 'canvas-confetti'

export default function MamiloHome() {
  const { addItem } = useCart()
  const { t } = useLanguage()
  const { toast } = useToast()

  const homepageProducts: any[] = products.slice(0, 8)

  // Welcome confetti for first-time visitors
  useEffect(() => {
    // Check if user has visited before
    const hasVisited = document.cookie.split('; ').find(row => row.startsWith('mamilo_visited='))

    if (!hasVisited) {
      // Set cookie to expire in 1 year
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      document.cookie = `mamilo_visited=true; expires=${expires.toUTCString()}; path=/`

      // Trigger welcome confetti
      setTimeout(() => {
        const duration = 3000
        const end = Date.now() + duration
        const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DDA0DD']

        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          })
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        }

        frame()
      }, 500) // Small delay to ensure page is loaded
    }
  }, [])

  const handleQuickAdd = (e: any, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: typeof product.colors[0] === 'object' ? product.colors[0].name : product.colors[0],
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen pt-14 lg:pt-0">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      <main>
        <div className="lg:hidden pb-20">
          <MobileHeroSlider />
          <MobileStories />

          <MobileProductRail
            title="New Arrivals"
            products={homepageProducts}
            viewAllLink="/shop?sort=newest"
          />
          <MobileProductRail
            title="Best Sellers"
            products={homepageProducts}
            viewAllLink="/shop?sort=best-sellers"
          />

          {/* Banner Offer */}
          <div className="px-4 py-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[2/1] bg-primary">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60" />
              <div className="relative h-full flex flex-col justify-center px-6 text-primary-foreground">
                <h3 className="text-2xl font-serif font-bold mb-2">Special Offer</h3>
                <p className="text-sm opacity-90 mb-4">Get 20% off your first order</p>
                <Button variant="secondary" size="sm" className="w-fit" asChild>
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>

          <MobileShopGrid products={products} />
        </div>

        <section className="hidden lg:block relative pt-32 pb-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>{t('home.newArrivals')}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-balance">
                  {t('home.heroTitle')}
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                  {t('home.heroSubtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-base px-8" asChild>
                    <Link href="/shop">
                      {t('home.shopCollection')}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base px-8 bg-transparent" asChild>
                    <Link href="/shop?category=occasions">
                      {t('home.exploreOccasions')}
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <div className="text-2xl md:text-3xl font-serif font-bold text-primary">{'500+'}</div>
                    <div className="text-sm text-muted-foreground">{t('home.happyCustomers')}</div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{'4.9/5 Reviews'}</div>
                  </div>
                </div>
              </div >

              <div className="relative">
                <div className="aspect-[4/4] rounded-3xl bg-muted overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"
                    alt="Beautiful baby girl in elegant party dress"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">{'Premium Quality'}</div>
                      <div className="text-sm text-muted-foreground">{'Handcrafted with care'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div >
        </section >

        {/* New Arrivals */}
        < section className="py-12 md:py-16 lg:py-24" >
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
                  {t('home.newArrivals')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('home.freshStyles')}
                </p>
              </div>
              <Button variant="outline" className="hidden md:flex bg-transparent" asChild>
                <Link href="/shop?sort=newest">
                  {t('home.viewAll')}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepageProducts.map((product, i) => (
                <Link key={i} href={`/product/${product.slug}`}>
                  <Card className="group overflow-hidden border hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] overflow-hidden relative bg-muted">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                            {product.badge}
                          </Badge>
                        )}
                        <button className="absolute top-3 right-3 h-9 w-9 bg-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10 hover:bg-muted">
                          <Heart className="h-4 w-4" />
                        </button>
                        <Button
                          className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          size="sm"
                          onClick={(e) => handleQuickAdd(e, product)}
                        >
                          {'Quick Add'}
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-balance group-hover:text-primary transition-colors">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{product.price.toFixed(2)} SAR</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section >

        {/* Featured Products */}
        < section className="py-16 md:py-24 bg-muted/30" >
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
                  {t('home.bestSellers')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('home.mostLoved')}
                </p>
              </div>
              <Button variant="outline" className="hidden md:flex bg-transparent" asChild>
                <Link href="/shop?sort=best-sellers">
                  {t('home.viewAll')}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepageProducts.map((product, i) => (
                <Link key={i} href={`/product/${product.slug}`}>
                  <Card className="group overflow-hidden border hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] overflow-hidden relative bg-muted">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                            {product.badge}
                          </Badge>
                        )}
                        <button className="absolute top-3 right-3 h-9 w-9 bg-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10 hover:bg-muted">
                          <Heart className="h-4 w-4" />
                        </button>
                        <Button
                          className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          size="sm"
                          onClick={(e) => handleQuickAdd(e, product)}
                        >
                          {'Quick Add'}
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-balance group-hover:text-primary transition-colors">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{product.price.toFixed(2)} SAR</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section >

        {/* Why Choose Us */}
        < section className="py-16 md:py-24" >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
                {t('home.mamiloPromise')}
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                {t('home.promiseSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '✨',
                  title: t('home.premiumFabrics'),
                  description: t('home.fabricsDesc')
                },
                {
                  icon: '🎀',
                  title: t('home.handcrafted'),
                  description: t('home.handcraftedDesc')
                },
                {
                  icon: '💝',
                  title: t('home.madeLove'),
                  description: t('home.madeLoveDesc')
                }
              ].map((feature, i) => (
                <Card key={i} className="border-2 text-center p-8 hover:border-primary transition-colors">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section >

        {/* Newsletter */}
        < section className="py-16 md:py-24 bg-secondary/30" >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
                {t('home.joinVip')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {t('home.vipSubtitle')}
              </p>
              <NewsletterForm />
              <p className="text-xs text-muted-foreground mt-4">
                {t('home.subscribeOffer')}
              </p>
            </div>
          </div>
        </section >
        <Footer />
      </main>
    </div>
  )
}


