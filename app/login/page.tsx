"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signInWithPhoneNumber, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [phone, setPhone] = useState<string | undefined>("")
    const [otp, setOtp] = useState("")
    const [confirmationResult, setConfirmationResult] = useState<any>(null)

    const logErrorToAdmin = async (error: any, source: string) => {
        try {
            await fetch('/api/log-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: error.message || 'Unknown error',
                    stack: error.stack,
                    source: source
                })
            })
        } catch (e) {
            console.error('Failed to log error', e)
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            toast.success("Welcome back!")
            router.push("/profile")
        } catch (error: any) {
            toast.error(error.message || "Failed to login with Google")
            logErrorToAdmin(error, 'login-google')
        } finally {
            setIsLoading(false)
        }
    }

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible', // Invisible reCAPTCHA
                'callback': () => {
                    // reCAPTCHA solved
                }
            });
        }
    }

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phone) {
            toast.error("Please enter a valid phone number")
            return
        }
        setIsLoading(true)
        try {
            setupRecaptcha()
            const appVerifier = window.recaptchaVerifier
            const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier)
            setConfirmationResult(confirmation)
            toast.success("OTP Sent!")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to send OTP. Please try again.")
            logErrorToAdmin(error, 'login-phone-otp')
            // Reset recaptcha if error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear()
                window.recaptchaVerifier = undefined
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await confirmationResult.confirm(otp)
            toast.success("Phone verified!")
            router.push("/profile")
        } catch (error: any) {
            toast.error("Invalid OTP")
            logErrorToAdmin(error, 'login-phone-verify')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container flex items-center justify-center min-h-[80vh] py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-2"
                        onClick={() => {
                            if (window.history.length > 1) {
                                router.back()
                            } else {
                                router.push('/')
                            }
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-2xl font-serif font-bold text-center pt-2">Welcome</CardTitle>
                    <CardDescription className="text-center">
                        Sign in to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading} className="w-full relative py-6">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                            <path
                                d="M12.0003 20.45c4.656 0 8.544-3.216 9.888-7.56H12.0003v-4.8h13.248c.144.792.216 1.632.216 2.52 0 7.2-4.8 12.24-12.24 12.24-7.056 0-12.72-5.088-12.72-12s5.664-12 12.72-12c3.168 0 6.048 1.08 8.352 3.072l-3.36 3.36c-1.2-1.056-2.976-1.848-4.992-1.848-4.512 0-8.208 3.552-8.208 8.16s3.696 8.16 8.208 8.16z"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with phone
                            </span>
                        </div>
                    </div>

                    {!confirmationResult ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <PhoneInput
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="SA"
                                    value={phone}
                                    onChange={setPhone}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    We'll send you an OTP to verify your number.
                                </p>
                            </div>
                            <div id="recaptcha-container"></div>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send OTP
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter Verification Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="123456"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="text-center text-lg tracking-widest"
                                />
                            </div>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify & Sign In
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full mt-2"
                                onClick={() => setConfirmationResult(null)}
                                type="button"
                            >
                                Back
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}
