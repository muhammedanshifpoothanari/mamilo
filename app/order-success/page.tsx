'use client'

import Link from 'next/link'
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'

export default function OrderSuccessPage() {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000)

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="hidden lg:block">
                <Navigation />
            </div>
            <MobileNavigation />

            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
                <Card className="max-w-md w-full p-8 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-serif font-bold text-gray-900">Order Placed!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your order has been successfully placed.
                        </p>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <p className="text-sm font-medium text-primary mb-1">Order ID</p>
                        <p className="text-lg font-bold tracking-wider">{orderId}</p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-3 text-left bg-muted/50 p-4 rounded-lg">
                            <div className="mt-1 bg-green-100 p-1.5 rounded-full">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">What happens next?</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    We have sent a confirmation details to your WhatsApp number. We will keep you updated on the delivery status.
                                </p>
                            </div>
                        </div>

                        <Button size="lg" className="w-full" asChild>
                            <Link href="/shop">
                                Continue Shopping
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/account">
                                View My Orders
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>

            <Footer />
        </div>
    )
}
