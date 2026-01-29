import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Sparkles, Users, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-20 lg:mt-0 mt-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-balance">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Creating magical moments through exquisite handcrafted dresses for the little princesses in your life
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"
                alt="Mamilo craftsmanship"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-balance">
                Where Dreams Meet Craftsmanship
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mamilo was born from a mother's desire to create something truly special for her daughter's first birthday. What started as a single handmade dress has blossomed into a brand dedicated to making every little girl feel like royalty.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every stitch, every detail, every embellishment is crafted with the same love and care that inspired our very first creation. We believe that childhood is filled with precious moments that deserve to be celebrated in style.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, Mamilo dresses have graced over 500 special occasions, bringing joy to families and creating memories that last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
              What We Stand For
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Our values guide everything we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Made with Love</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every dress is handcrafted with care and attention to detail by skilled artisans
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only the finest fabrics and materials touch your little one's delicate skin
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Family First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're a family-owned business that treats every customer like family
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to delivering exceptional products and service every time
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-balance">
                Artisan Craftsmanship
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each Mamilo dress is a work of art, meticulously handcrafted by skilled artisans who have honed their craft over decades. From the initial design sketch to the final quality check, every step is performed with precision and care.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team hand-selects premium fabrics from trusted suppliers, ensuring that every material meets our exacting standards for softness, durability, and beauty. Delicate embellishments are sewn by hand, one at a time, making each dress truly unique.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Happy Families</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Handcrafted</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">4.9/5</div>
                  <p className="text-sm text-muted-foreground">Customer Rating</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1524416268818-0845245e3e12?w=800&q=80"
                alt="Handcrafted details"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
                Our Commitment to the Future
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Creating beautiful dresses while caring for the planet your children will inherit
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-serif font-bold mb-3">Sustainable Materials</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We prioritize eco-friendly fabrics and sustainable production methods, ensuring our dresses are as kind to the earth as they are beautiful.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-serif font-bold mb-3">Ethical Production</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our artisans work in fair-trade conditions with competitive wages, ensuring every dress supports the livelihoods of skilled craftspeople.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-serif font-bold mb-3">Minimal Waste</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We carefully plan our production to minimize fabric waste, and repurpose scraps into accessories and embellishments.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-serif font-bold mb-3">Quality Over Quantity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By creating durable, timeless pieces, we reduce the need for frequent replacements and encourage passing dresses down through generations.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-secondary/30 border-0 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">
              Ready to Create Magic?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Explore our collection and find the perfect dress for your little princess's next special moment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Shop Collection
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
