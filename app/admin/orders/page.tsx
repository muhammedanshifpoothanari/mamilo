'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Package, MapPin, Phone, Mail, Calendar, DollarSign } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())

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

    const toggleOrder = (orderId: string) => {
        setExpandedOrders(prev => {
            const newSet = new Set(prev)
            if (newSet.has(orderId)) {
                newSet.delete(orderId)
            } else {
                newSet.add(orderId)
            }
            return newSet
        })
    }

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
                            <TableHead className="w-12"></TableHead>
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
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => {
                                const isExpanded = expandedOrders.has(order._id)
                                return (
                                    <>
                                        <TableRow key={order._id} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleOrder(order._id)}>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    {isExpanded ? (
                                                        <ChevronUp className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </TableCell>
                                            <TableCell className="font-mono text-xs">{order._id.slice(-8)}</TableCell>
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
                                            <TableCell className="text-right">
                                                <div className="space-y-1 text-sm">
                                                    <div className="font-bold">{order.total?.toFixed(2) || '0.00'} SAR</div>
                                                    {order.subtotal && (
                                                        <div className="text-xs text-muted-foreground">
                                                            ({order.items?.length || 0} items)
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {isExpanded && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="bg-muted/30 p-6">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {/* Customer Details */}
                                                        <div className="space-y-4">
                                                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                                                <Package className="h-5 w-5 text-primary" />
                                                                Customer Information
                                                            </h3>
                                                            <div className="space-y-3 bg-background p-4 rounded-lg border">
                                                                <div className="flex items-start gap-3">
                                                                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                                    <div>
                                                                        <p className="text-xs text-muted-foreground">Email</p>
                                                                        <p className="font-medium">{order.customer.email}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start gap-3">
                                                                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                                    <div>
                                                                        <p className="text-xs text-muted-foreground">Phone</p>
                                                                        <p className="font-medium">{order.customer.phone}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start gap-3">
                                                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                                    <div>
                                                                        <p className="text-xs text-muted-foreground">Delivery Address</p>
                                                                        <p className="font-medium">{order.customer.address.street}</p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            {order.customer.address.city}, {order.customer.address.state}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">{order.customer.address.country}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start gap-3">
                                                                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                                    <div>
                                                                        <p className="text-xs text-muted-foreground">Order Placed</p>
                                                                        <p className="font-medium">
                                                                            {new Date(order.createdAt).toLocaleString('en-SA', {
                                                                                dateStyle: 'medium',
                                                                                timeStyle: 'short'
                                                                            })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Order Items */}
                                                        <div className="space-y-4">
                                                            <h3 className="font-semibold text-lg">Order Items</h3>
                                                            <div className="space-y-3">
                                                                {order.items.map((item: any, idx: number) => (
                                                                    <div key={idx} className="flex gap-3 bg-background p-3 rounded-lg border">
                                                                        <div className="relative w-16 h-20 flex-shrink-0 rounded bg-muted overflow-hidden">
                                                                            {item.image && (
                                                                                <Image
                                                                                    src={item.image}
                                                                                    alt={item.name}
                                                                                    fill
                                                                                    className="object-cover"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="font-medium text-sm truncate">{item.name}</p>
                                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                                Size: {item.size} • Color: {item.color}
                                                                            </p>
                                                                            <p className="text-xs text-muted-foreground">
                                                                                Qty: {item.quantity} × {item.price.toFixed(2)} SAR
                                                                            </p>
                                                                            <p className="font-semibold text-sm mt-1">
                                                                                {(item.price * item.quantity).toFixed(2)} SAR
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Price Breakdown */}
                                                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 space-y-2">
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-muted-foreground">Subtotal</span>
                                                                    <span className="font-medium">{order.subtotal?.toFixed(2)} SAR</span>
                                                                </div>
                                                                {order.discount > 0 && (
                                                                    <div className="flex justify-between text-sm text-green-600">
                                                                        <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                                                                        <span>-{order.discount?.toFixed(2)} SAR</span>
                                                                    </div>
                                                                )}
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-muted-foreground">Shipping</span>
                                                                    <span className="font-medium">
                                                                        {order.shipping === 0 ? (
                                                                            <span className="text-green-600">Free</span>
                                                                        ) : (
                                                                            `${order.shipping?.toFixed(2)} SAR`
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-muted-foreground">VAT (15%)</span>
                                                                    <span className="font-medium">{order.tax?.toFixed(2)} SAR</span>
                                                                </div>
                                                                <div className="h-px bg-border my-2" />
                                                                <div className="flex justify-between font-bold text-lg">
                                                                    <span>Total</span>
                                                                    <span className="text-primary">{order.total?.toFixed(2)} SAR</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
