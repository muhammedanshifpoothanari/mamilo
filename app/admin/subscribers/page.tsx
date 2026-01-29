'use client'

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, XCircle } from 'lucide-react'

interface Subscriber {
    _id: string
    email: string
    isActive: boolean
    consentedAt: string
}

export default function AdminSubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSubscribers = async () => {
        try {
            const res = await fetch('/api/admin/subscribers')
            if (res.ok) {
                const data = await res.json()
                setSubscribers(data)
            }
        } catch (error) {
            console.error('Failed to fetch subscribers', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubscribers()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold">Newsletter Subscribers</h1>
                <Button onClick={() => fetchSubscribers()} variant="outline" size="sm">
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Subscriber List</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading subscribers...</div>
                    ) : subscribers.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No subscribers yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {subscribers.map((sub) => (
                                <div
                                    key={sub._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{sub.email}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Subscribed: {new Date(sub.consentedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        {sub.isActive ? (
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                <CheckCircle className="h-3 w-3 mr-1" /> Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                <XCircle className="h-3 w-3 mr-1" /> Inactive
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
