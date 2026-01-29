'use client'

import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/logo'
import { useState } from 'react'

/* ... imports ... */
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/context/language-context'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const cartCount = 3
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p className="text-pretty">Free shipping on orders over 200 SAR • Easy returns within 30 days</p>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Logo */}
          <Logo variant="text-only" />

          {/* Desktop navigation links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.shop')}
            </Link>
            <Link href="/shop?occasion=birthday" className="text-sm font-medium hover:text-primary transition-colors">
              Birthday
            </Link>
            <Link href="/shop?occasion=wedding" className="text-sm font-medium hover:text-primary transition-colors">
              Wedding
            </Link>
            <Link href="/shop?occasion=party" className="text-sm font-medium hover:text-primary transition-colors">
              Party
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.about')}
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.contact')}
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile" aria-label="Profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for dresses..."
                className="pl-10"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-4">
            <Link
              href="/shop"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/shop?occasion=birthday"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Birthday
            </Link>
            <Link
              href="/shop?occasion=wedding"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wedding
            </Link>
            <Link
              href="/shop?occasion=party"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Party
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('common.contact')}
            </Link>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">{t('common.language')}</span>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
