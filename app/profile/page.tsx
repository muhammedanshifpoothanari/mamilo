'use client'

import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, ShoppingBag, MapPin, Settings, LogOut, Loader2, Package } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  console.log("ProfilePage Render", { user, loading });
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [profileData, setProfileData] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(true)

  // Edit states
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Address states
  const [newAddress, setNewAddress] = useState({
    street: "", city: "", state: "", zip: "", country: ""
  })



  // ... (fetchProfile and handlers)



  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          name,
          phone
        })
      })
      if (res.ok) {
        toast.success("Profile updated successfully")
        fetchProfile()
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const updatedAddresses = [...(profileData?.addresses || []), newAddress]
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          addresses: updatedAddresses
        })
      })
      if (res.ok) {
        toast.success("Address added")
        setNewAddress({ street: "", city: "", state: "", zip: "", country: "" })
        fetchProfile()
      }
    } catch (error) {
      toast.error("Failed to add address")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully")
      // Force reload to ensure all states are cleared
      window.location.href = '/login'
    } catch (error) {
      toast.error("Failed to sign out")
    }
  }

  useEffect(() => {
    console.log("ProfilePage Effect Triggered", { user, loading });
    if (user) {
      console.log("User found, fetching profile...", user.email);
      fetchProfile()
      setName(user.displayName || "")
      setPhone(user.phoneNumber || "")
    } else {
      console.log("No user found in effect");
    }
  }, [user, loading])

  const fetchProfile = async () => {
    try {
      if (!user?.email) {
        console.warn("fetchProfile: No email found for user", user);
        return
      }
      console.log("Fetching /api/profile/profile for email:", user.email);
      const res = await fetch(`/api/profile/profile?email=${user.email}`)
      console.log("Fetch response status:", res.status);

      if (res.ok) {
        const data = await res.json()
        console.log("Profile data received:", data);
        setProfileData(data.customer)
        setOrders(data.orders || [])
      } else {
        console.error("Fetch profile failed", await res.text());
      }
    } catch (error) {
      console.error("Failed to fetch profile", error)
    } finally {
      setIsFetching(false)
    }
  }
  if (loading || (user && isFetching)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Welcome to Mamilo</h2>
            <p className="text-muted-foreground mb-8 text-pretty">
              Sign in to access your orders, wishlist, and personalized recommendations
            </p>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="p-4 bg-muted/30 rounded-lg mb-6 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-serif font-bold text-lg">{profileData?.name || user.displayName || 'Guest'}</h2>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            <Button
              variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <User className="mr-2 h-4 w-4" /> Overview
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Orders
            </Button>
            <Button
              variant={activeTab === 'addresses' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin className="mr-2 h-4 w-4" /> Addresses
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" /> Profile Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{orders.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${profileData?.totalSpent?.toFixed(2) || '0.00'}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Member Since</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm font-medium">
                        {new Date(profileData?.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <Card key={order._id} className="p-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium">Order #{order._id.slice(-6)}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.total}</p>
                            <Badge variant="outline">{order.status}</Badge>
                          </div>
                        </Card>
                      ))}
                      <Button variant="link" className="p-0" onClick={() => setActiveTab('orders')}>View all orders</Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No recent orders found.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-serif font-bold">My Orders</h1>
                {orders.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg bg-muted/10">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">Looks like you haven&apos;t made any purchases yet.</p>
                    <Button asChild><Link href="/shop">Start Shopping</Link></Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order._id} className="overflow-hidden">
                        <div className="bg-muted/30 p-4 flex items-center justify-between border-b">
                          <div className="flex gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block">Order Placed</span>
                              <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block">Total</span>
                              <span className="font-medium">${order.total}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block">Order #</span>
                              <span className="font-medium">{order._id.slice(-8)}</span>
                            </div>
                          </div>
                          <Badge className={order.status === 'Delivered' ? 'bg-green-600' : 'bg-blue-600'}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="p-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4 py-2">
                              <div className="h-16 w-16 bg-muted rounded overflow-hidden relative">
                                {/* Ideally Image component here */}
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">Img</div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-medium">${item.price}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-muted/10 border-t flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => toast.success("Order details loaded")}>
                            View Order
                          </Button>
                          {order.status === 'Delivered' && (
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => toast.info("Return request initiated")}>
                              Return Item
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-serif font-bold">Saved Addresses</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData?.addresses?.map((addr: any, idx: number) => (
                    <Card key={idx} className="relative">
                      <CardContent className="p-4">
                        <p className="font-medium uppercase text-xs text-muted-foreground mb-2">Address {idx + 1}</p>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zip}</p>
                        <p>{addr.country}</p>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="border-dashed flex items-center justify-center min-h-[150px]">
                    <div className="text-center p-4 w-full">
                      <h3 className="font-medium mb-4">Add New Address</h3>
                      <form onSubmit={handleAddAddress} className="space-y-3 text-left">
                        <Input placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({ ...newAddress, street: e.target.value })} required />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} required />
                          <Input placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="ZIP Code" value={newAddress.zip} onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })} required />
                          <Input placeholder="Country" value={newAddress.country} onChange={e => setNewAddress({ ...newAddress, country: e.target.value })} required />
                        </div>
                        <Button type="submit" disabled={isUpdating} className="w-full">
                          {isUpdating ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Address"}
                        </Button>
                      </form>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-md">
                <h1 className="text-2xl font-serif font-bold">Profile Settings</h1>
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={user.email || ""} disabled className="bg-muted" />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

