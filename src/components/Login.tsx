import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTenant } from '@/context/TenantProvider'
import { useNavigate } from 'react-router-dom'
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()
    const { loginTenant } = useTenant()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess(false)

        try {
            await loginTenant(email, password)

            // Here you would typically send the email and password to your backend for authentication
            console.log('Login attempted with:', { email, password })

            setSuccess(true)
            navigate('/dashboard')
        } catch (err) {
            setError('Invalid email or password. Please try again.')
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
                    <CardTitle className="text-2xl font-bold text-center text-blue-900">Log in to Gatekeeper</CardTitle>
                    <CardDescription className="text-center text-blue-700">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">Login successful!</p>}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </Button>
                    </form>
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
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-2">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot your password?
                    </a>
                    <p className="text-sm text-blue-700">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}