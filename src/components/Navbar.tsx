import { Lock } from 'lucide-react'

export default function Navbar() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm">
            <a href="/" className="flex items-center justify-center">
                <Lock className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-blue-900">Gatekeeper</span>
            </a>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <a className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="#features">
                    Features
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="#pricing">
                    Pricing
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="#docs">
                    Docs
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/login">
                    Login
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4 text-blue-800" href="/signup">
                    Signup
                </a>
            </nav>
        </header>
    )
}