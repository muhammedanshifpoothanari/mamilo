'use client'

import { Home, Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function MobileNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/shop", icon: Search, label: "Shop" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/cart", icon: ShoppingBag, label: "Bag" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  const isCartOrCheckout = pathname === '/cart' || pathname === '/checkout' || pathname.startsWith('/product/')

  return (
    <>
      {/* Mobile Top Bar */}
      {!isCartOrCheckout && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Logo variant="text-only" />

            <Link href="/cart" className="p-2 -mr-2 relative">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
                  }`}
              >
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-[280px] bg-background shadow-xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-serif font-semibold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Shop
              </h3>
              <Link
                href="/shop?category=new"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/shop?category=best-sellers"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Best Sellers
              </Link>
              <Link
                href="/shop"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Dresses
              </Link>
              <Link
                href="/shop?occasion=birthday"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Birthday Party
              </Link>
              <Link
                href="/shop?occasion=wedding"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Wedding
              </Link>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                About
              </h3>
              <Link
                href="/about"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-4 border-t border-border">
              <Button className="w-full" onClick={() => setIsMenuOpen(false)} asChild>
                <Link href="/profile">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
