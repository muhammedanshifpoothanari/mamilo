'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"

export function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            const data = await res.json()

            if (res.ok) {
                toast({
                    title: "Subscribed!",
                    description: data.message,
                })
                setEmail('')
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
            <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 text-base bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
            />
            <Button size="lg" className="sm:w-auto" type="submit" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? '...' : 'Subscribe'}
            </Button>
        </div>
    )
}
