
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, User, Search, Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function WishlistsPage() {
    const [wishlists, setWishlists] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchWishlists()
    }, [])

    const fetchWishlists = async () => {
        try {
            const res = await fetch('/api/admin/wishlists')
            if (res.ok) {
                const data = await res.json()
                setWishlists(data.wishlists || [])
            }
        } catch (error) {
            console.error("Failed to fetch wishlists", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredWishlists = wishlists.filter(list =>
        list.email?.toLowerCase().includes(search.toLowerCase()) ||
        list.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Customer Wishlists</h1>
                    <p className="text-muted-foreground">See what customers are saving for later.</p>
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
                                    <th className="p-4 font-medium">Saved Items</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={3} className="p-8 text-center">Loading...</td></tr>
                                ) : filteredWishlists.length === 0 ? (
                                    <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No wishlists found.</td></tr>
                                ) : (
                                    filteredWishlists.map((list) => (
                                        <tr key={list._id} className="border-b last:border-0 hover:bg-muted/5">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{list.name}</span>
                                                    <span className="text-xs text-muted-foreground">{list.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {list.wishlist.slice(0, 5).map((slug: string, i: number) => (
                                                        <Badge key={i} variant="secondary" className="font-normal">
                                                            {slug}
                                                        </Badge>
                                                    ))}
                                                    {list.wishlist.length > 5 && (
                                                        <Badge variant="outline">+{list.wishlist.length - 5} more</Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button size="sm" variant="outline" className="h-8 gap-2">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    Notify Offer
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
