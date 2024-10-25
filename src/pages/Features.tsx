import Navbar from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, Code, Shield, Zap, Users, Key, Lock, RefreshCcw } from 'lucide-react'

export default function FeaturesPage() {
    const features = [
        {
            icon: <Database className="h-8 w-8 text-blue-600" />,
            title: "PostgreSQL Integration with NeonDB",
            description: "Seamless integration with PostgreSQL through NeonDB, providing a robust and scalable database solution for your authentication needs."
        },
        {
            icon: <Code className="h-8 w-8 text-blue-600" />,
            title: "Ready-to-Use React Components",
            description: "Full suite of React components for login, signup, password reset, and user profile management. Just import and use in your React applications."
        },
        {
            icon: <Code className="h-8 w-8 text-blue-600" />,
            title: "Flexible DB Interaction Functions",
            description: "Comprehensive set of functions for database interactions, easily used in callbacks or async operations for custom authentication flows."
        },
        {
            icon: <Shield className="h-8 w-8 text-blue-600" />,
            title: "Advanced Security Features",
            description: "Implements industry-standard security practices including password hashing, JWT token management, and protection against common vulnerabilities."
        },
        {
            icon: <Zap className="h-8 w-8 text-blue-600" />,
            title: "OAuth 2.0 and Social Login Support",
            description: "Built-in support for OAuth 2.0 and popular social login providers like Google, Facebook, and Twitter."
        },
        {
            icon: <Users className="h-8 w-8 text-blue-600" />,
            title: "Role-Based Access Control (RBAC)",
            description: "Flexible RBAC system allowing you to define and manage user roles and permissions with ease."
        },
        {
            icon: <Key className="h-8 w-8 text-blue-600" />,
            title: "Two-Factor Authentication (2FA)",
            description: "Optional two-factor authentication support using TOTP (Time-based One-Time Password) for enhanced security."
        },
        {
            icon: <Lock className="h-8 w-8 text-blue-600" />,
            title: "Secure Password Policies",
            description: "Customizable password policies to enforce strong passwords, including length, complexity, and history requirements."
        },
        {
            icon: <RefreshCcw className="h-8 w-8 text-blue-600" />,
            title: "Automatic Token Refresh",
            description: "Implements automatic refresh of access tokens to maintain user sessions securely without frequent re-authentication."
        }
    ]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
                            Gatekeeper Features
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-700 sm:mt-4">
                            Discover the powerful features that make Gatekeeper the ultimate authentication solution for your npm projects.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 mb-4">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-blue-900">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-blue-700">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold text-blue-900">Ready to secure your application?</h2>
                        <p className="mt-4 text-lg text-blue-700">
                            Get started with Gatekeeper today and experience the power of seamless, secure authentication.
                        </p>
                        <div className="mt-8">
                            <a
                                href="/signup"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Get Started
                                <CheckCircle className="ml-2 -mr-1 h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}