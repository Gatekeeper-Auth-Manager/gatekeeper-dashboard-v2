export interface Tenant {
    id: string;
    email: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Project {
    id: string;
    name: string;
    description?: string;
    tenantId: string;
    clientId: string;
    clientSecret: string;
    isUserNameRequired: boolean;
    isGoogleProvider: boolean;
    isGithubProvider: boolean;
    isVerificationCodeToEmail: boolean;
    userRoles: string[];
    defaultUserRole?: string;
    createdAt: Date;
    updatedAt: Date;
  }