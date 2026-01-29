
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, DollarSign, Activity, ShoppingCart, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        leads: 0,
        abandonedCarts: 0,
        customers: 0
    })
    const [loading, setLoading] = useState(true)
    const [resetting, setResetting] = useState(false)
    const { toast } = useToast()

    const fetchStats = () => {
        setLoading(true)
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const handleResetDatabase = async () => {
        const confirmed = window.confirm(
            '⚠️ Are you sure you want to reset the database?\n\nThis will DELETE ALL DATA including:\n- Orders\n- Customers\n- Leads\n- Carts\n- Email logs\n- Error logs\n- Subscribers\n\nThis action CANNOT be undone!'
        )

        if (!confirmed) return

        setResetting(true)
        try {
            const response = await fetch('/api/admin/reset-db', {
                method: 'POST',
            })

            const data = await response.json()

            if (data.success) {
                toast({
                    title: "✅ Database Reset Successful",
                    description: "All collections have been cleared. Stats will refresh automatically.",
                    variant: "default",
                })
                // Refresh stats after reset
                setTimeout(() => {
                    fetchStats()
                }, 500)
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Reset error:', error)
            toast({
                title: "❌ Reset Failed",
                description: "Could not reset the database. Check console for details.",
                variant: "destructive",
            })
        } finally {
            setResetting(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Button
                    variant="destructive"
                    onClick={handleResetDatabase}
                    disabled={resetting}
                    className="gap-2"
                >
                    {resetting ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Resetting...
                        </>
                    ) : (
                        <>
                            <Trash2 className="h-4 w-4" />
                            Reset Database
                        </>
                    )}
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.revenue.toFixed(2)} SAR</div>
                        <p className="text-xs text-muted-foreground">Lifetime</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.orders}</div>
                        <p className="text-xs text-muted-foreground">Lifetime</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads (Checkouts)</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.leads}</div>
                        <p className="text-xs text-muted-foreground">Captured Phones</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Abandoned Carts</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.abandonedCarts}</div>
                        <p className="text-xs text-muted-foreground">Potential Recovery</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            No recent orders found.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
