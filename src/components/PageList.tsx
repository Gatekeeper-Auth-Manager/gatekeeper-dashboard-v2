import { useEffect } from 'react'
import { useProject } from '@/context/ProjectProvider'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useTenant } from '@/context/TenantProvider'
import { useNavigate } from 'react-router-dom'

const ProjectList = () => {
    const { tenant } = useTenant()
    // console.log('Tenant:', tenant)
    const { projects, getAllProjects, isLoading } = useProject()
    const navigate = useNavigate()


    useEffect(() => {
        console.log('Tenant:', tenant)
        getAllProjects(tenant?.id as string)
        console.log('Projects:', projects)
    }, [])

    if (isLoading) {
        return <div className="flex justify-center p-8 text-blue-800">Loading projects...</div>
    }

    if (projects.length === 0) {
        return (
            <Card className="bg-white border border-blue-100">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <CardTitle className="text-2xl font-semibold text-blue-900 mb-4">No Projects Yet</CardTitle>
                    <CardDescription className="text-blue-700 text-center mb-6">
                        You haven't created any projects yet. Start by creating your first project!
                    </CardDescription>
                    <a href="/create-project">
                        <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Create Your First Project
                        </Button>
                    </a>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                projects.map((project) => (
                    <Card key={project.id} onClick={() => {
                        navigate(`/project/${project.id}`)
                    }} className="bg-white border border-blue-100 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-blue-900">{project.name}</CardTitle>
                            <CardDescription className="line-clamp-2 text-blue-700">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    )
}

export default ProjectList