
'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'
import { Trash2, Plus } from 'lucide-react'

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)

    // New Coupon State
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discountType: 'percentage',
        value: '',
        minPurchase: '',
        usageLimit: ''
    })

    const fetchCoupons = async () => {
        try {
            const res = await fetch('/api/coupons')
            const data = await res.json()
            if (data.success) setCoupons(data.coupons)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCoupons()
    }, [])

    const handleCreate = async () => {
        setIsCreating(true)
        try {
            const res = await fetch('/api/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCoupon)
            })
            if (res.ok) {
                toast.success('Coupon created')
                setNewCoupon({ code: '', discountType: 'percentage', value: '', minPurchase: '', usageLimit: '' })
                fetchCoupons()
            } else {
                toast.error('Failed to create coupon')
            }
        } catch (error) {
            toast.error('Error creating coupon')
        } finally {
            setIsCreating(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this coupon?')) return;
        try {
            const res = await fetch(`/api/coupons?id=${id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Coupon deleted')
                fetchCoupons()
            }
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
                    <p className="text-muted-foreground">Manage discount codes.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Create Coupon</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Coupon</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Code</label>
                                <Input
                                    placeholder="SUMMER25"
                                    itemType="text" // Fix for casing bug
                                    style={{ textTransform: 'uppercase' }}
                                    value={newCoupon.code}
                                    onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <Select
                                        value={newCoupon.discountType}
                                        onValueChange={val => setNewCoupon({ ...newCoupon, discountType: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                                            <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Value</label>
                                    <Input
                                        type="number"
                                        placeholder="10"
                                        value={newCoupon.value}
                                        onChange={e => setNewCoupon({ ...newCoupon, value: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Min Purchase ($)</label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={newCoupon.minPurchase}
                                        onChange={e => setNewCoupon({ ...newCoupon, minPurchase: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Usage Limit</label>
                                    <Input
                                        type="number"
                                        placeholder="Unlimited"
                                        value={newCoupon.usageLimit}
                                        onChange={e => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button onClick={handleCreate} disabled={isCreating} className="w-full">
                                {isCreating ? 'Creating...' : 'Create Coupon'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Min. Order</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coupons.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No coupons found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            coupons.map((coupon) => (
                                <TableRow key={coupon._id}>
                                    <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                                    <TableCell>
                                        {coupon.discountType === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                                    </TableCell>
                                    <TableCell>
                                        {coupon.usedCount} / {coupon.usageLimit || '∞'}
                                    </TableCell>
                                    <TableCell>${coupon.minPurchase || 0}</TableCell>
                                    <TableCell>
                                        <Badge variant={coupon.isActive ? 'default' : 'secondary'}>
                                            {coupon.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(coupon._id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
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
