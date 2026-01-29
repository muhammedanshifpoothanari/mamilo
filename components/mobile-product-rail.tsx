'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MobileProductCard } from '@/components/mobile-product-card'

interface Product {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    image: string
    occasion: string
    isNew?: boolean
    isSale?: boolean
}

interface MobileProductRailProps {
    title: string
    products: Product[]
    viewAllLink: string
}

export function MobileProductRail({ title, products, viewAllLink }: MobileProductRailProps) {
    return (
        <div className="py-6 space-y-4">
            <div className="flex items-center justify-between px-4">
                <h3 className="text-lg font-bold font-serif">{title}</h3>
                <Link
                    href={viewAllLink}
                    className="text-xs font-medium text-primary flex items-center active:scale-95 transition-transform"
                >
                    View All <ChevronRight className="h-3 w-3 ml-0.5" />
                </Link>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar pl-4 pb-4">
                <div className="flex gap-4 w-max pr-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-[160px] flex-shrink-0">
                            <MobileProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pb-2">
                <Link
                    href={viewAllLink}
                    className="text-xs font-medium text-muted-foreground flex items-center gap-1 active:scale-95 transition-transform border border-border rounded-full px-4 py-1.5"
                >
                    View More <ChevronRight className="h-3 w-3" />
                </Link>
            </div>
        </div>
    )
}
