
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, User, Clock, CheckCircle, XCircle, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchLeads()
    }, [])

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/admin/stats?type=leads') // We might need a dedicated endpoint or reuse stats
            // Actually, let's make a dedicated getter or just fetch all for now
            // I'll assume we create a route for GET /api/leads/list or similar.
            // For now, I'll use a mocked fetch to show structure, or create the route.

            // Implementing direct fetch from new route
            const response = await fetch('/api/leads/list')
            if (response.ok) {
                const data = await response.json()
                setLeads(data.leads || [])
            }
        } catch (error) {
            console.error("Failed to fetch leads", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredLeads = leads.filter(lead =>
        lead.phone?.includes(search) || lead.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Leads & Retargeting</h1>
                    <p className="text-muted-foreground">Potential customers who started checkout but didn't finish.</p>
                </div>
                <Button>Export CSV</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by phone or name..."
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
                                    <th className="p-4 font-medium">Phone</th>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Last Active</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No leads found.</td></tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead._id} className="border-b last:border-0 hover:bg-muted/5">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{lead.phone}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {lead.name ? (
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        {lead.name}
                                                    </div>
                                                ) : <span className="text-muted-foreground italic">Unknown</span>}
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {new Date(lead.lastActive).toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {lead.converted ? (
                                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Converted</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">Pending</Badge>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <a href={`https://wa.me/${lead.phone}`} target="_blank" rel="noopener noreferrer">
                                                    <Button size="sm" variant="outline" className="h-8">
                                                        WhatsApp
                                                    </Button>
                                                </a>
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
