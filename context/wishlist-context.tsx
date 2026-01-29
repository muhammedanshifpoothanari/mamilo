
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth-context'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface WishlistContextType {
    wishlist: string[]
    isInWishlist: (slug: string) => boolean
    toggleWishlist: (slug: string) => Promise<void>
    loading: boolean
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    isInWishlist: () => false,
    toggleWishlist: async () => { },
    loading: false
})

export function useWishlist() {
    return useContext(WishlistContext)
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [wishlist, setWishlist] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (user?.email) {
            fetchWishlist(user.email)
        } else {
            setWishlist([])
        }
    }, [user])

    const fetchWishlist = async (email: string) => {
        try {
            const res = await fetch(`/api/wishlist?email=${email}`)
            if (res.ok) {
                const data = await res.json()
                setWishlist(data.wishlist || [])
            }
        } catch (error) {
            console.error("Failed to fetch wishlist", error)
        }
    }

    const isInWishlist = (slug: string) => wishlist.includes(slug)

    const toggleWishlist = async (slug: string) => {
        if (!user?.email) {
            toast.error("Please sign in to add to wishlist")
            router.push('/login')
            return
        }

        // Optimistic update
        const originalWishlist = [...wishlist]
        const isCurrentlyIn = originalWishlist.includes(slug)

        if (isCurrentlyIn) {
            setWishlist(prev => prev.filter(s => s !== slug))
            toast.success("Removed from wishlist")
        } else {
            setWishlist(prev => [...prev, slug])
            toast.success("Added to wishlist")
        }

        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, slug })
            })

            if (!res.ok) {
                // Revert on failure
                setWishlist(originalWishlist)
                toast.error("Failed to update wishlist")
            }
        } catch (error) {
            setWishlist(originalWishlist)
            toast.error("Something went wrong")
        }
    }

    return (
        <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    )
}
