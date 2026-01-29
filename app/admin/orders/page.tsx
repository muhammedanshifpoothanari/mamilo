'use client'

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch('/api/orders')
                const data = await res.json()
                if (data.success) {
                    setOrders(data.orders)
                }
            } catch (error) {
                console.error('Failed to fetch orders', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) return <div className="p-8">Loading orders...</div>

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">
                    View and manage customer orders (Live MongoDB Data).
                </p>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell className="font-mono text-xs">{order._id}</TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2">
                                            {order.items.slice(0, 3).map((item: any, i: number) => (
                                                <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden bg-muted relative">
                                                    {item.image && <img src={item.image} alt="" className="object-cover h-full w-full" />}
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.customer.name}</span>
                                            <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'Pending' ? 'secondary' : 'default'}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        ${order.total.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
