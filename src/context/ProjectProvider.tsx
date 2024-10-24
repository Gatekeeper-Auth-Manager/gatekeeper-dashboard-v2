// src/providers/ProjectProvider.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { Project } from '@/lib/types';

interface ProjectContextType {
    projects: Project[];
    currentProject: Project | null;
    isLoading: boolean;
    error: string | null;
    createProject: (projectData: Omit<Project, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>) => Promise<Project>;
    updateProject: (id: string, projectData: Partial<Project>) => Promise<Project>;
    getProject: (id: string) => Promise<Project>;
    deleteProject: (id: string) => Promise<void>;
    getAllProjects: () => Promise<Project[]>;
    setCurrentProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createProject = useCallback(
        async (projectData: Omit<Project, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>) => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.post<Project>('/create-project', projectData);
                setProjects(prev => [...prev, response.data]);
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
            const response = await axios.post<Project>('http://localhost:4000/api/v1/update-project', { id, ...projectData });
            setProjects(prev => prev.map(p => (p.id === id ? response.data : p)));
            if (currentProject?.id === id) {
                setCurrentProject(response.data);
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
            const response = await axios.post<Project>('http://localhost:4000/api/v1/get-project', { id });
            setCurrentProject(response.data);
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
            await axios.post('/delete-project', { id });
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

    const getAllProjects = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post<Project[]>('http://localhost:4000/api/v1/get-all-projects');
            setProjects(response.data);
            return response.data;
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