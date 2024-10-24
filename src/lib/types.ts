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
    users: any[];
  }

  export type UserCredential = {
    userId: string; // Primary Key, Default uuid()
    email: string;
    password?: string; // Optional
    userName?: string; // Optional
    createdAt: Date; // Default now()
    updatedAt: Date; // Auto-update on modification
    project: Project; // Relation to Project
    projectId: string; // Foreign Key referencing Project.id
    isVerified?: boolean; // Optional
    verificationCode?: UserOTP; // Optional relation to UserOTP
    role?: string; // Optional
  };

  type UserOTP = {
    id: string; // Primary Key, Default uuid()
    email: string;
    otp: string;
    createdAt: Date; // Default now()
    updatedAt: Date; // Auto-update on modification
    userId: string; // Foreign Key referencing UserCredential.userId
    user: UserCredential; // Relation to UserCredential
};