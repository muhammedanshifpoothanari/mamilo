
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, Lock, ArrowLeft, Phone, MapPin, CheckCircle2, MessageCircle, Ticket, Plus } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items: cartItems, cartTotal: cartSubtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)

  // Direct Buy vs Regular Cart mode
  const isDirectBuy = searchParams.get('mode') === 'direct'
  const [directBuyItem, setDirectBuyItem] = useState<any>(null)
  const [selectedCartAddons, setSelectedCartAddons] = useState<string[]>([]) // IDs of cart items to include

  // User Data
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  // Addresses
  const [savedAddresses, setSavedAddresses] = useState<any[]>([])
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1)
  const [isNewAddress, setIsNewAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '', country: 'Saudi Arabia' })

  // Coupon
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [couponError, setCouponError] = useState('')
  const [validatingCoupon, setValidatingCoupon] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load direct buy item from sessionStorage
  useEffect(() => {
    if (isDirectBuy) {
      const storedItem = sessionStorage.getItem('directBuyItem')
      if (storedItem) {
        setDirectBuyItem(JSON.parse(storedItem))
      } else {
        // No direct buy item found, redirect to cart
        router.replace('/cart')
      }
    }
  }, [isDirectBuy, router])

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    } else if (user?.email) {
      // Fetch profile to prefill
      fetch(`/api/profile/profile?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.customer) {
            if (data.customer.phone) setPhone(data.customer.phone)
            if (data.customer.name) setName(data.customer.name)
            if (data.customer.addresses && data.customer.addresses.length > 0) {
              setSavedAddresses(data.customer.addresses)
              setSelectedAddressIndex(0); // Select first by default
            } else {
              setIsNewAddress(true)
            }
          }
        })
        .catch(err => console.error("Failed to prefill checkout", err))
    }
  }, [user, loading, router])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return null

  // Determine items to checkout
  const checkoutItems = isDirectBuy
    ? [
      directBuyItem,
      ...cartItems.filter(item => selectedCartAddons.includes(`${item.id}-${item.size}-${item.color}`))
    ].filter(Boolean)
    : cartItems

  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Calculations
  const shippingCost = subtotal > 200 ? 0 : 25 // 200 SAR threshold
  const taxRate = 0.15;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
    discountAmount = Math.min(discountAmount, subtotal);
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * taxRate;

  const total = taxableAmount + shippingCost + tax

  const handleValidateCoupon = async () => {
    if (!couponCode) return;
    setValidatingCoupon(true);
    setCouponError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, cartTotal: subtotal })
      });

      const data = await res.json();
      if (res.ok) {
        setAppliedCoupon(data);
        toast.success(`Coupon ${data.code} applied!`);
      } else {
        setCouponError(data.error || 'Invalid coupon');
        setAppliedCoupon(null);
      }
    } catch (err) {
      setCouponError('Validation failed');
    } finally {
      setValidatingCoupon(false);
    }
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length > 8) {
      setStep(2)
    }
  }

  const handleCompleteOrder = async () => {
    setIsSubmitting(true)

    // Get final address
    let finalAddress;
    if (isNewAddress) {
      if (!newAddress.street || !newAddress.city) {
        toast.error("Please fill in the address fields");
        setIsSubmitting(false);
        return;
      }
      finalAddress = newAddress;
    } else {
      finalAddress = savedAddresses[selectedAddressIndex];
    }

    try {
      const orderData = {
        customer: {
          name,
          phone,
          email: user.email,
          address: finalAddress
        },
        items: checkoutItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image
        })),
        total: total,
        discount: discountAmount,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        paymentMethod: 'COD'
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        // Clear cart for regular checkout, or clear direct buy item
        if (isDirectBuy) {
          sessionStorage.removeItem('directBuyItem')
          // Also remove the selected cart addon items from cart
          if (selectedCartAddons.length > 0) {
            // We'd need to implement removeMultiple or clear specific items
            // For now, just clear entire cart if any addons were selected
            clearCart()
          }
        } else {
          clearCart()
        }
        router.push('/order-success')
      } else {
        const err = await response.json();
        toast.error(err.error || 'Failed to place order')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border pt-14">
        <div className="flex items-center justify-between px-4 py-3">
          {step === 1 ? (
            <Link href="/cart" className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          ) : (
            <button onClick={() => setStep(1)} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-base font-semibold">
            {step === 1 ? 'Verify Phone' : 'Details'}
          </h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:mb-0 mb-24">
        <Link
          href="/cart"
          className="hidden lg:inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-8 max-w-md mx-auto">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 font-semibold ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-current'}`}>
              1
            </div>
            <span className="font-medium hidden sm:inline">Phone</span>
          </div>
          <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 font-semibold ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-current'}`}>
              2
            </div>
            <span className="font-medium hidden sm:inline">Details</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Phone */}
            {step === 1 && (
              <Card className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold mb-2">Contact Number</h2>
                  <p className="text-muted-foreground">For order updates regarding your delivery.</p>
                </div>

                <form onSubmit={handlePhoneSubmit} className="max-w-sm mx-auto space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="55 123 4567"
                        className="pl-10 h-12 text-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg h-12">
                    Continue
                  </Button>
                </form>
              </Card>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-6">
                <Card className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Delivery Address
                    </h2>
                    <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline">
                      Back
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-primary/5 p-3 rounded-lg flex items-center gap-3 border border-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Contact</p>
                        <p className="font-semibold text-sm">{phone}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Address</Label>
                      {savedAddresses.length > 0 && (
                        <RadioGroup
                          value={isNewAddress ? 'new' : selectedAddressIndex.toString()}
                          onValueChange={(val) => {
                            if (val === 'new') {
                              setIsNewAddress(true)
                            } else {
                              setIsNewAddress(false)
                              setSelectedAddressIndex(parseInt(val))
                            }
                          }}
                          className="grid gap-3"
                        >
                          {savedAddresses.map((addr, idx) => (
                            <div key={idx} className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-muted/50">
                              <RadioGroupItem value={idx.toString()} id={`addr-${idx}`} />
                              <Label htmlFor={`addr-${idx}`} className="flex-1 cursor-pointer">
                                <p className="font-medium">{addr.street}</p>
                                <p className="text-xs text-muted-foreground">{addr.city}, {addr.state}</p>
                              </Label>
                            </div>
                          ))}
                          <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-muted/50">
                            <RadioGroupItem value="new" id="addr-new" />
                            <Label htmlFor="addr-new" className="flex-1 cursor-pointer flex items-center gap-2">
                              <Plus className="h-4 w-4" /> Add New Address
                            </Label>
                          </div>
                        </RadioGroup>
                      )}

                      {(isNewAddress || savedAddresses.length === 0) && (
                        <div className="space-y-3 pt-4 border-t mt-4 animate-in slide-in-from-top-2">
                          <Label>New Address Details</Label>
                          <Input
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="City"
                              value={newAddress.city}
                              onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                            <Input
                              placeholder="State"
                              value={newAddress.state}
                              onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                            />
                          </div>
                          <Input
                            placeholder="Country"
                            value={newAddress.country}
                            onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Cart Add-ons (Direct Buy Mode Only) */}
                {isDirectBuy && cartItems.length > 0 && (
                  <Card className="p-6 md:p-8">
                    <h2 className="text-xl font-serif font-bold mb-4">Add from your cart (Optional)</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      You have {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart. Add them to this order?
                    </p>
                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const itemKey = `${item.id}-${item.size}-${item.color}`;
                        const isSelected = selectedCartAddons.includes(itemKey);

                        return (
                          <div
                            key={itemKey}
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
                              }`}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedCartAddons(prev => prev.filter(k => k !== itemKey))
                              } else {
                                setSelectedCartAddons(prev => [...prev, itemKey])
                              }
                            }}
                          >
                            <div className="relative w-16 h-20 flex-shrink-0 rounded bg-muted overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.size} • {item.color} • Qty: {item.quantity}
                              </p>
                              <p className="font-semibold text-sm mt-1">{(item.price * item.quantity).toFixed(2)} SAR</p>
                            </div>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                              }`}>
                              {isSelected && (
                                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                )}

                <Card className="p-6 md:p-8">
                  <h2 className="text-xl font-serif font-bold mb-4">Payment Method</h2>
                  <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg flex items-center gap-4">
                    <div className="h-5 w-5 rounded-full border-[6px] border-primary bg-background" />
                    <div>
                      <p className="font-bold text-foreground">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                </Card>

                {/* Mobile Order Summary & Action */}
                <div className="lg:hidden mt-6">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <h3 className="font-bold mb-4">Order Summary</h3>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Mobile Coupon Input */}
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={!!appliedCoupon}
                          className="h-10 text-base"
                        />
                        <Button
                          variant="outline"
                          onClick={handleValidateCoupon}
                          disabled={validatingCoupon || !!appliedCoupon || !couponCode}
                        >
                          {validatingCoupon ? '...' : appliedCoupon ? 'Applied' : 'Apply'}
                        </Button>
                      </div>
                      {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
                      {appliedCoupon && (
                        <div className="flex justify-between items-center mt-2 bg-green-50 p-2 rounded text-xs text-green-700">
                          <span>Code: {appliedCoupon.code}</span>
                          <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="hover:underline">Remove</button>
                        </div>
                      )}
                    </div>

                    <Button
                      size="lg"
                      className="w-full text-lg h-12 shadow-md"
                      onClick={handleCompleteOrder}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : `Confirm Order - $${total.toFixed(2)}`}
                    </Button>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 hidden lg:block">
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {checkoutItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-3">
                    <div className="relative w-12 h-16 flex-shrink-0 rounded bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">{(item.price * item.quantity).toFixed(2)} SAR</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Coupon Input */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                  />
                  <Button
                    variant="outline"
                    onClick={handleValidateCoupon}
                    disabled={validatingCoupon || !!appliedCoupon || !couponCode}
                  >
                    {validatingCoupon ? '...' : appliedCoupon ? 'Applied' : 'Apply'}
                  </Button>
                </div>
                {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex justify-between items-center mt-2 bg-green-50 p-2 rounded text-xs text-green-700">
                    <span>Code: {appliedCoupon.code}</span>
                    <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="hover:underline">Remove</button>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toFixed(2)} SAR</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{discountAmount.toFixed(2)} SAR</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (15%)</span>
                  <span>{tax.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : `${shippingCost.toFixed(2)} SAR`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{total.toFixed(2)} SAR</span>
                </div>
              </div>

              <div className="mt-6">
                {step === 2 ? (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleCompleteOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : `Complete Order`}
                  </Button>
                ) : (
                  <p className="text-xs text-center text-muted-foreground pt-4">Complete details to proceed</p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Lock className="h-3 w-3" />
                Secure Checkout
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Sticky Complete Order */}
        {step === 2 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-primary">{total.toFixed(2)} SAR</p>
              </div>
              <Button
                size="lg"
                className="flex-1"
                onClick={handleCompleteOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
