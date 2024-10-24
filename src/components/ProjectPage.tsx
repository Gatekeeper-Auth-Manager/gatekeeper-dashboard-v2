import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Copy, Edit2, Save, Eye, EyeOff, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useProject } from '@/context/ProjectProvider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserTable from './UserTable'

const ProjectPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [showSecret, setShowSecret] = useState(false)
    const { id } = useParams()
    const { currentProject, getProject, updateProject, deleteProject } = useProject()
    const navigate = useNavigate()

    useEffect(() => {
        getProject(id as string)
    }, [id, getProject])

    const [editedProject, setEditedProject] = useState<any>(currentProject)

    useEffect(() => {
        setEditedProject(currentProject)
    }, [currentProject])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    const handleSave = () => {
        updateProject(id as string, editedProject)
        setIsEditing(false)
    }

    const handleDelete = () => {
        deleteProject(id as string)
        navigate('/dashboard')
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProject((prev: any) => ({
            ...prev,
            description: e.target.value
        }))
    }

    const handleSettingChange = (setting: 'isUserNameRequired' | 'isGoogleProvider' | 'isVerificationCodeToEmail') => {
        setEditedProject((prev: any) => ({
            ...prev,
            [setting]: !prev[setting]
        }))
    }

    const censorSecret = (secret: string) => {
        return '*'.repeat(secret?.length || 0)
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Card className="bg-white border-blue-100">
                <CardHeader className="border-b border-blue-100">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-grow">
                            <CardTitle className="text-2xl font-bold text-blue-900">{editedProject?.name}</CardTitle>
                            {isEditing ? (
                                <Input
                                    value={editedProject?.description}
                                    onChange={handleDescriptionChange}
                                    className="mt-2 border-blue-200 focus:border-blue-400"
                                />
                            ) : (
                                <CardDescription className="text-blue-700">{editedProject?.description}</CardDescription>
                            )}
                        </div>
                        <div className="flex items-center gap-2 sm:self-start">
                            <Button
                                variant={isEditing ? "default" : "outline"}
                                size="sm"
                                onClick={isEditing ? handleSave : handleEditToggle}
                                className={isEditing ? "bg-blue-600 text-white hover:bg-blue-700" : "border-blue-600 text-blue-600 hover:bg-blue-50"}
                            >
                                {isEditing ? (
                                    <><Save className="h-4 w-4 mr-2" /> Save</>
                                ) : (
                                    <><Edit2 className="h-4 w-4 mr-2" /> Edit</>
                                )}
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                ID: {editedProject?.id?.slice(0, 8)}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <Tabs defaultValue="credentials" className="space-y-4">
                        <TabsList className="bg-blue-50">
                            <TabsTrigger value="credentials" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Credentials</TabsTrigger>
                            <TabsTrigger value="auth-settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Auth Settings</TabsTrigger>
                            <TabsTrigger value="additional-info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Additional Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="credentials" className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-900">Credentials</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                    <div>
                                        <p className="font-medium text-blue-800">Client ID</p>
                                        <p className="text-sm text-blue-600">{editedProject?.clientId}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(editedProject?.clientId)}
                                        className="hover:bg-blue-100"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                    <div>
                                        <p className="font-medium text-blue-800">Client Secret</p>
                                        <p className="text-sm text-blue-600 truncate max-w-lg">
                                            {showSecret ? editedProject?.clientSecret : censorSecret(editedProject?.clientSecret)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowSecret(!showSecret)}
                                            className="hover:bg-blue-100"
                                        >
                                            {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(editedProject?.clientSecret)}
                                            className="hover:bg-blue-100"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="auth-settings" className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-900">Authentication Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-blue-800">Username Required</p>
                                        <p className="text-sm text-blue-600">Require users to set a username</p>
                                    </div>
                                    <Switch
                                        checked={editedProject?.isUserNameRequired}
                                        disabled={!isEditing}
                                        onCheckedChange={() => handleSettingChange('isUserNameRequired')}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-blue-800">Google Authentication</p>
                                        <p className="text-sm text-blue-600">Allow sign in with Google</p>
                                    </div>
                                    <Switch
                                        checked={editedProject?.isGoogleProvider}
                                        disabled={!isEditing}
                                        onCheckedChange={() => handleSettingChange('isGoogleProvider')}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-blue-800">Email Verification</p>
                                        <p className="text-sm text-blue-600">Require email verification code</p>
                                    </div>
                                    <Switch
                                        checked={editedProject?.isVerificationCodeToEmail}
                                        disabled={!isEditing}
                                        onCheckedChange={() => handleSettingChange('isVerificationCodeToEmail')}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="additional-info" className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-900">Additional Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-blue-600">Created At</p>
                                    <p className="text-blue-800">{formatDate(editedProject?.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-600">Last Updated</p>
                                    <p className="text-blue-800">{formatDate(editedProject?.updatedAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-600">Tenant ID</p>
                                    <p className="truncate text-blue-800">{editedProject?.tenantId}</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Users</h3>
                        <UserTable initUsers={currentProject?.users || []} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectPage