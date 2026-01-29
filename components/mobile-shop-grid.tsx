
'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MobileProductCard } from "@/components/mobile-product-card"

interface MobileShopGridProps {
    products: any[]
}

export function MobileShopGrid({ products }: MobileShopGridProps) {
    return (
        <div className="px-4 py-8">
            <h3 className="text-xl font-serif font-bold mb-4">More to Explore</h3>
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <MobileProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
            <div className="mt-8 text-center pb-8">
                <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href="/shop">View Complete Collection</Link>
                </Button>
            </div>
        </div>
    )
}
