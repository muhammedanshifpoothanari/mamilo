import React from "react"
import type { Metadata } from 'next'
import { Outfit, Playfair_Display, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from '@/context/auth-context';
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mamilo - Exquisite Party Dresses for Little Princesses',
  description: 'Discover stunning party dresses and event wear for baby girls. Premium quality, magical designs, unforgettable moments.',
  keywords: ['baby girl dresses', 'party dresses', 'event dresses', 'children formal wear', 'kids fashion'],
  generator: 'v0.app',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export const viewport = {
  themeColor: '#3D5A50',
  // width: 'device-width',
  // initialScale: 1,
}

import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/context/language-context';
import { WhatsAppButton } from '@/components/whatsapp-button';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${dancingScript.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col relative">
                {children}
              </div>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
        <WhatsAppButton />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
