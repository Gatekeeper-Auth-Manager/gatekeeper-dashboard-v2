// src/providers/ProjectProvider.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { Project } from '@/lib/types';

interface ProjectContextType {
    projects: Project[];
    currentProject: Project | null;
    isLoading: boolean;
    error: string | null;
    createProject: (name: string, description: string) => Promise<Project>;
    updateProject: (id: string, projectData: Partial<Project>) => Promise<Project>;
    getProject: (id: string) => Promise<Project>;
    deleteProject: (id: string) => Promise<void>;
    getAllProjects: (tenantId: string) => Promise<Project[]>;
    setCurrentProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createProject = useCallback(
        async (name: string, description: string) => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.post(
                    'http://localhost:4000/api/v1/create-project',
                    {
                        name, description
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                setProjects(prev => [...prev, response.data.data]);
                return response.data;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:4000/api/v1/update-project', { id, ...projectData },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            setProjects(prev => prev.map(p => (p.id === id ? response.data.data : p)));
            if (currentProject?.id === id) {
                setCurrentProject(response.data.data);
            }
            return response.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [currentProject]);

    const getProject = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:4000/api/v1/get-project', { id },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            // console.log(response.data);
            setCurrentProject(response.data.data);
            // console.log(currentProject);
            return response.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteProject = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await axios.post('http://localhost:4000/api/v1/delete-project', { id },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            setProjects(prev => prev.filter(p => p.id !== id));
            if (currentProject?.id === id) {
                setCurrentProject(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [currentProject]);

    const getAllProjects = useCallback(async (tenantId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log("tenantId", tenantId);
            const response = await axios.post('http://localhost:4000/api/v1/get-all-projects', { tenantId }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setProjects(response.data.data);
            return response.data.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value = {
        projects,
        currentProject,
        isLoading,
        error,
        createProject,
        updateProject,
        getProject,
        deleteProject,
        getAllProjects,
        setCurrentProject,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};