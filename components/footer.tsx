'use client'

import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from "@/components/logo"
import { NewsletterForm } from "@/components/newsletter-form"
import { useLanguage } from '@/context/language-context'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="full" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.aboutText')}
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:hello@mamilo.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg">{t('common.shop')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('home.viewAll')}
                </Link>
              </li>
              <li>
                <Link href="/shop?occasion=birthday" className="text-muted-foreground hover:text-primary transition-colors">
                  Birthday Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?occasion=wedding" className="text-muted-foreground hover:text-primary transition-colors">
                  Wedding Dresses
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('common.contact')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg">Stay Connected</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('home.vipSubtitle')}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Mamilo. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
