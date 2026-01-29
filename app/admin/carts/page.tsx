
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Clock, Search, Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function CartsPage() {
    const [carts, setCarts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchCarts()
    }, [])

    const fetchCarts = async () => {
        try {
            // Reusing customer API but filtering for cart items (or create new dedicated endpoint)
            // For now, let's assume we can fetch customers with non-empty carts.
            const res = await fetch('/api/admin/carts') // We need to create this
            if (res.ok) {
                const data = await res.json()
                setCarts(data.carts || [])
            }
        } catch (error) {
            console.error("Failed to fetch carts", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredCarts = carts.filter(cart =>
        cart.email?.toLowerCase().includes(search.toLowerCase()) ||
        cart.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Abandoned Carts</h1>
                    <p className="text-muted-foreground">Customers with items left in their cart.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by email or name..."
                            className="pl-8 max-w-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr className="text-left border-b">
                                    <th className="p-4 font-medium">Customer</th>
                                    <th className="p-4 font-medium">Items</th>
                                    <th className="p-4 font-medium">Total Value</th>
                                    <th className="p-4 font-medium">Last Active</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
                                ) : filteredCarts.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No abandoned carts found.</td></tr>
                                ) : (
                                    filteredCarts.map((cart) => (
                                        <tr key={cart._id} className="border-b last:border-0 hover:bg-muted/5">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{cart.name}</span>
                                                    <span className="text-xs text-muted-foreground">{cart.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex -space-x-2">
                                                    {cart.cart.slice(0, 3).map((item: any, i: number) => (
                                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden bg-muted relative">
                                                            {item.image && <img src={item.image} alt="" className="object-cover h-full w-full" />}
                                                        </div>
                                                    ))}
                                                    {cart.cart.length > 3 && (
                                                        <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                                                            +{cart.cart.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {cart.cart.length} items
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium">
                                                ${cart.cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {new Date(cart.updatedAt || Date.now()).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button size="sm" variant="outline" className="h-8 gap-2">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    Email
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
