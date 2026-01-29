'use client'

import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function MobileHero() {
  return (
    <div className="lg:hidden relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden rounded-b-[2rem] bg-gradient-to-br from-secondary/30 via-background to-muted">
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm text-accent text-xs font-medium w-fit">
              <Sparkles className="h-3 w-3" />
              Spring Collection 2026
            </div>
            
            <h1 className="text-4xl font-serif font-bold leading-tight text-balance">
              {'Dress Her Dreams in Magic'}
            </h1>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {'Exquisite party dresses crafted for your little princess\'s special moments'}
            </p>

            <Button 
              size="lg" 
              className="w-full rounded-full shadow-lg"
              asChild
            >
              <Link href="/shop">
                Shop Collection
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 px-4 -mt-6">
        {[
          { value: '2000+', label: 'Happy Customers' },
          { value: '4.9', label: 'Star Rating' },
          { value: '500+', label: 'Designs' },
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border"
          >
            <div className="text-xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
