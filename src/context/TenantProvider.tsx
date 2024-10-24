// src/providers/TenantProvider.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { Tenant } from '@/lib/types';

interface TenantContextType {
    tenant: Tenant | null;
    isLoading: boolean;
    error: string | null;
    createTenant: (email: string, password: string, provider: string) => Promise<void>;
    verifyTenant: (email: string, code: string) => Promise<void>;
    loginTenant: (email: string, password: string) => Promise<void>;
    logoutTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTenant = useCallback(async (email: string, password: string, provider: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post<Tenant>('http://localhost:4000/api/v1/create-tenant', { email, password, provider });
            console.log(response.data);
            setTenant(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const verifyTenant = useCallback(async (email: string, otp: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post<Tenant>('http://localhost:4000/api/v1/verify-tenant-verification', { email, otp });
            setTenant(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginTenant = useCallback(async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post<Tenant>('http://localhost:4000/api/v1/login-tenant', { email, password });
            setTenant(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logoutTenant = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            await axios.get('/logout-tenant');
            setTenant(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value = {
        tenant,
        isLoading,
        error,
        createTenant,
        verifyTenant,
        loginTenant,
        logoutTenant,
    };

    return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export const useTenant = () => {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
};