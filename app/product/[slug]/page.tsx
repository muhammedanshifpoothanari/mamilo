
import React from 'react'
import type { Metadata } from 'next'
import { products } from '@/lib/data'
import ProductClient from './product-client'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    return {
      title: 'Product Not Found - Mamilo',
    }
  }

  return {
    title: `${product.name} | Mamilo`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)

  if (!product) {
    return <ProductClient />
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Mamilo',
    },
    offers: {
      '@type': 'Offer',
      url: `https://mamilo.com/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: '2025-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient />
    </>
  )
}
