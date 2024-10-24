import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import CreateProjectModal from "@/components/CreateProjectModal"
import ProjectList from "@/components/PageList"
import Navbar from "@/components/Navbar"

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 bg-gradient-to-b from-blue-50 to-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-900">
                                    Your Projects
                                </h1>
                                <p className="mx-auto max-w-[700px] text-blue-800 md:text-xl">
                                    Manage and monitor all your Gatekeeper-secured projects in one place.
                                </p>
                            </div>
                            <CreateProjectModal />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-16 bg-blue-100">
                    <div className="container px-4 md:px-6">
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-blue-900">Your Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ProjectList />
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    )
}