'use client'

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle, XCircle, Clock, Send } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface EmailLog {
    _id: string
    to: string
    subject: string
    body: string
    status: 'PENDING' | 'SENT' | 'FAILED'
    createdAt: string
    sentAt?: string
}

export default function AdminEmailsPage() {
    const [emails, setEmails] = useState<EmailLog[]>([])
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const fetchEmails = async () => {
        try {
            const res = await fetch('/api/admin/emails')
            if (res.ok) {
                const data = await res.json()
                setEmails(data)
            }
        } catch (error) {
            console.error('Failed to fetch emails', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEmails()
    }, [])

    const handleSendEmail = async (id: string) => {
        try {
            // Update status to SENT
            const res = await fetch('/api/admin/emails', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: 'SENT' })
            })

            if (res.ok) {
                toast({
                    title: "Email Sent (Simulated)",
                    description: "The email has been marked as sent.",
                })
                fetchEmails()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update email status.",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold">Email Queue</h1>
                <Button onClick={() => fetchEmails()} variant="outline" size="sm">
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Queued Emails</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading emails...</div>
                    ) : emails.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No emails in the queue</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {emails.map((email) => (
                                <div
                                    key={email._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors gap-4"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{email.to}</span>
                                            <StatusBadge status={email.status} />
                                        </div>
                                        <p className="text-sm font-medium">{email.subject}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Created: {new Date(email.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {email.status === 'PENDING' && (
                                            <Button
                                                size="sm"
                                                onClick={() => handleSendEmail(email._id)}
                                                className="w-full sm:w-auto"
                                            >
                                                <Send className="h-3 w-3 mr-2" />
                                                Send Now
                                            </Button>
                                        )}
                                        {email.status === 'SENT' && (
                                            <div className="text-xs text-green-600 flex items-center">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Sent {email.sentAt ? new Date(email.sentAt).toLocaleTimeString() : ''}
                                            </div>
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

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'SENT':
            return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sent</Badge>
        case 'FAILED':
            return <Badge variant="destructive">Failed</Badge>
        default:
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    }
}
