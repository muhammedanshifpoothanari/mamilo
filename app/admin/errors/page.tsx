'use client'

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from 'lucide-react'

interface ErrorLog {
    _id: string
    message: string
    stack?: string
    source?: string
    timestamp: string
}

export default function AdminErrorsPage() {
    const [logs, setLogs] = useState<ErrorLog[]>([])
    const [loading, setLoading] = useState(true)

    const fetchLogs = async () => {
        try {
            const res = await fetch('/api/admin/errors')
            if (res.ok) {
                const data = await res.json()
                setLogs(data)
            }
        } catch (error) {
            console.error('Failed to fetch error logs', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold">System Error Logs</h1>
                <Button onClick={() => fetchLogs()} variant="outline" size="sm">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Error Log History</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading logs...</div>
                    ) : logs.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No errors recorded.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {logs.map((log) => (
                                <div
                                    key={log._id}
                                    className="flex flex-col p-4 border rounded-lg bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 transition-colors gap-2"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                                            <AlertCircle className="h-4 w-4" />
                                            {log.message}
                                        </div>
                                        <Badge variant="outline">{log.source || 'Unknown'}</Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </div>
                                    {log.stack && (
                                        <div className="mt-2 p-2 bg-black/5 dark:bg-black/30 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-32 overflow-y-auto">
                                            {log.stack}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
