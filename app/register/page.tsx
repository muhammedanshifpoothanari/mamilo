"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleGoogleRegister = async () => {
        setIsLoading(true)
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            // Note: Google auth creates an account if one doesn't exist
            toast.success("Account created successfully!")
            router.push("/shop")
        } catch (error: any) {
            toast.error(error.message || "Failed to sign up with Google")
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // Update profile with name
            await updateProfile(userCredential.user, {
                displayName: name
            })

            toast.success("Account created successfully!")
            router.push("/shop")
        } catch (error: any) {
            toast.error(error.message || "Failed to create account")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container flex items-center justify-center min-h-[80vh] py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-serif font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details below to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 mb-6">
                        <Button variant="outline" onClick={handleGoogleRegister} disabled={isLoading} className="w-full relative">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                                <path
                                    d="M12.0003 20.45c4.656 0 8.544-3.216 9.888-7.56H12.0003v-4.8h13.248c.144.792.216 1.632.216 2.52 0 7.2-4.8 12.24-12.24 12.24-7.056 0-12.72-5.088-12.72-12s5.664-12 12.72-12c3.168 0 6.048 1.08 8.352 3.072l-3.36 3.36c-1.2-1.056-2.976-1.848-4.992-1.848-4.512 0-8.208 3.552-8.208 8.16s3.696 8.16 8.208 8.16z"
                                    fill="currentColor"
                                />
                            </svg>
                            Sign up with Google
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                                Must be at least 6 characters
                            </p>
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div className="text-sm text-center text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
