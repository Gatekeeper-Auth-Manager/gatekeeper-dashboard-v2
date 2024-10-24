import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Landing() {
    const navigate = useNavigate()
    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-900">
                                Secure Your App with Gatekeeper
                            </h1>
                            <p className="mx-auto max-w-[700px] text-blue-800 md:text-xl">
                                The ultimate auth service provider for your npm projects. Easy to integrate, powerful to use.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => {
                                    navigate('/signup')
                                }}
                            >Get Started</Button>
                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                View on GitHub
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-blue-100">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-blue-900">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-white">
                            <CardHeader>
                                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                                <CardTitle className="text-blue-900">Robust Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800">
                                    State-of-the-art encryption and security protocols to keep your users' data safe.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardHeader>
                                <Zap className="w-8 h-8 text-blue-600 mb-2" />
                                <CardTitle className="text-blue-900">Lightning Fast</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800">
                                    Optimized for speed, ensuring quick authentication and seamless user experience.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardHeader>
                                <CheckCircle className="w-8 h-8 text-blue-600 mb-2" />
                                <CardTitle className="text-blue-900">Easy Integration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800">
                                    Simple npm installation and straightforward API for quick setup in your projects.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-blue-900">
                        Pricing Plans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Basic</CardTitle>
                                <CardDescription>For small projects</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-blue-600">$9/month</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Up to 1,000 users</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Basic support</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Choose Plan</Button>
                            </CardFooter>
                        </Card>
                        <Card className="bg-white border-blue-600 border-2">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Pro</CardTitle>
                                <CardDescription>For growing businesses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-blue-600">$29/month</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Up to 10,000 users</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Priority support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Advanced analytics</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Choose Plan</Button>
                            </CardFooter>
                        </Card>
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Enterprise</CardTitle>
                                <CardDescription>For large-scale applications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-blue-600">Custom</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Unlimited users</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">24/7 dedicated support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">Custom integrations</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Contact Sales</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}