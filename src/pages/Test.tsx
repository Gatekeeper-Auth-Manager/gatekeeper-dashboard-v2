// src/components/TestOperations.tsx
import React, { useState, useEffect } from 'react';
import { useTenant } from '@/context/TenantProvider';
import { useProject } from '@/context/ProjectProvider';
import { Project } from '@/lib/types';

const TestOperations: React.FC = () => {
    // Form states
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password123');
    const [verificationCode, setVerificationCode] = useState('');

    // Project form state
    const [projectName, setProjectName] = useState('Test Project');
    const [projectDescription, setProjectDescription] = useState('Test Description');

    // Get context hooks
    const { tenant, isLoading: tenantLoading, error: tenantError, createTenant, verifyTenant, loginTenant, logoutTenant } = useTenant();
    const {
        projects,
        currentProject,
        isLoading: projectLoading,
        error: projectError,
        createProject,
        updateProject,
        getProject,
        deleteProject,
        getAllProjects
    } = useProject();

    // Load projects on mount if tenant exists
    useEffect(() => {
        if (tenant) {
            getAllProjects();
        }
    }, [tenant, getAllProjects]);

    const handleCreateTenant = async () => {
        try {
            await createTenant(email, password);
            console.log('Tenant created successfully');
        } catch (error) {
            console.error('Failed to create tenant:', error);
        }
    };

    const handleVerifyTenant = async () => {
        try {
            await verifyTenant(email, verificationCode);
            console.log('Tenant verified successfully');
        } catch (error) {
            console.error('Failed to verify tenant:', error);
        }
    };

    const handleLoginTenant = async () => {
        try {
            await loginTenant(email, password);
            console.log('Tenant logged in successfully');
        } catch (error) {
            console.error('Failed to login tenant:', error);
        }
    };

    const handleLogoutTenant = async () => {
        try {
            await logoutTenant();
            console.log('Tenant logged out successfully');
        } catch (error) {
            console.error('Failed to logout tenant:', error);
        }
    };

    const handleCreateProject = async () => {
        try {
            const projectData = {
                name: projectName,
                description: projectDescription,
                clientId: 'test-client-id',
                clientSecret: 'test-client-secret',
                isUserNameRequired: false,
                isGoogleProvider: false,
                isGithubProvider: false,
                isVerificationCodeToEmail: false,
                userRoles: ['user'],
                defaultUserRole: 'user'
            };

            const newProject = await createProject(projectData);
            console.log('Project created successfully:', newProject);
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const handleUpdateProject = async (project: Project) => {
        try {
            const updatedProject = await updateProject(project.id, {
                description: `${project.description} (Updated)`
            });
            console.log('Project updated successfully:', updatedProject);
        } catch (error) {
            console.error('Failed to update project:', error);
        }
    };

    const handleGetProject = async (id: string) => {
        try {
            const project = await getProject(id);
            console.log('Project retrieved successfully:', project);
        } catch (error) {
            console.error('Failed to get project:', error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject(id);
            console.log('Project deleted successfully');
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Test Operations</h1>

            {/* Tenant Operations */}
            <div className="mb-8 p-4 border rounded">
                <h2 className="text-xl font-semibold mb-4">Tenant Operations</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="border rounded px-2 py-1 mr-2"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="border rounded px-2 py-1 mr-2"
                        />
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={handleCreateTenant}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={tenantLoading}
                        >
                            Create Tenant
                        </button>
                        <button
                            onClick={handleLoginTenant}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            disabled={tenantLoading}
                        >
                            Login
                        </button>
                        <button
                            onClick={handleLogoutTenant}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            disabled={tenantLoading}
                        >
                            Logout
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Verification Code"
                            className="border rounded px-2 py-1 mr-2"
                        />
                        <button
                            onClick={handleVerifyTenant}
                            className="bg-purple-500 text-white px-4 py-2 rounded"
                            disabled={tenantLoading}
                        >
                            Verify Tenant
                        </button>
                    </div>
                </div>
                {tenantError && <p className="text-red-500 mt-2">{tenantError}</p>}
                {tenant && (
                    <div className="mt-4">
                        <h3 className="font-semibold">Current Tenant:</h3>
                        <pre className="bg-gray-100 p-2 rounded mt-2">
                            {JSON.stringify(tenant, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            {/* Project Operations */}
            {tenant && (
                <div className="p-4 border rounded">
                    <h2 className="text-xl font-semibold mb-4">Project Operations</h2>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Project Name"
                                className="border rounded px-2 py-1 mr-2"
                            />
                            <input
                                type="text"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                placeholder="Project Description"
                                className="border rounded px-2 py-1 mr-2"
                            />
                            <button
                                onClick={handleCreateProject}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={projectLoading}
                            >
                                Create Project
                            </button>
                        </div>
                        {projectError && <p className="text-red-500">{projectError}</p>}

                        {/* Projects List */}
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Projects:</h3>
                            <div className="space-y-2">
                                {projects.map((project) => (
                                    <div key={project.id} className="p-2 border rounded flex items-center justify-between">
                                        <span>{project.name}</span>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleGetProject(project.id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleUpdateProject(project)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Current Project Details */}
                        {currentProject && (
                            <div className="mt-4">
                                <h3 className="font-semibold">Current Project:</h3>
                                <pre className="bg-gray-100 p-2 rounded mt-2">
                                    {JSON.stringify(currentProject, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestOperations;