
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth-context'

interface CartItem {
    id: string
    name: string
    slug: string
    price: number
    image: string
    size: string
    color: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    const { user } = useAuth()

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('mamilo-cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error('Failed to parse cart', e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save cart to localStorage and Sync to DB whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('mamilo-cart', JSON.stringify(items))

            // Sync with MongoDB if user is logged in
            if (user?.email) {
                const syncCart = setTimeout(async () => {
                    try {
                        await fetch('/api/cart/sync', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: user.email,
                                cart: items,
                            }),
                        })
                    } catch (error) {
                        console.error('Failed to sync cart:', error)
                    }
                }, 2000) // Debounce for 2 seconds

                return () => clearTimeout(syncCart)
            }
        }
    }, [items, isLoaded, user])

    const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        const quantityToAdd = newItem.quantity || 1;

        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
            )

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                )
            }

            return [...currentItems, {
                id: newItem.id,
                name: newItem.name,
                slug: newItem.slug,
                price: newItem.price,
                image: newItem.image,
                size: newItem.size,
                color: newItem.color,
                quantity: quantityToAdd
            }]
        })
    }

    const removeItem = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return
        setItems((currentItems) =>
            currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
