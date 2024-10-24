import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTenant } from '@/context/TenantProvider'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const { createTenant, verifyTenant } = useTenant()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // Initial signup
            await createTenant(email, password, "credentials")

            setShowOtpInput(true)
            setSuccess(true)
        } catch (err) {
            setError('An error occurred during signup. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const verifyOtp = async () => {
        setIsLoading(true)
        setError('')

        try {
            await verifyTenant(email, otp)

            setIsVerified(true)
            setSuccess(true)
        } catch (err) {
            setError('Invalid OTP. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        console.log('Sign in with Google clicked')
        // Implement Google Sign-In logic here
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-900">Sign Up for Gatekeeper</CardTitle>
                    <CardDescription className="text-center text-blue-700">
                        {isVerified
                            ? "Your email has been verified!"
                            : showOtpInput
                                ? "Enter the verification code sent to your email"
                                : "Create an account to get started with Gatekeeper"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!showOtpInput ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-blue-800">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-blue-800">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign Up'}
                            </Button>
                        </form>
                    ) : !isVerified ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-blue-800">Verification Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter verification code"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button
                                onClick={verifyOtp}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Code'}
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <p className="text-green-500">Your email has been verified successfully!</p>
                            <Button
                                onClick={() => window.location.href = '/dashboard'}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Continue to Dashboard
                            </Button>
                        </div>
                    )}

                    {!showOtpInput && (
                        <>
                            <div className="mt-4 text-center">
                                <span className="text-blue-800">Or</span>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mt-4 border-blue-300 text-blue-800 hover:bg-blue-50"
                                onClick={handleGoogleSignIn}
                            >
                                Sign in with Google
                            </Button>
                        </>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-blue-700">
                        Already have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}