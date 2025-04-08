export interface Role {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    name: string;
    type: 'partner' | 'admin' | string;
    partnerId: number | null;
    allowOtpLogin: boolean;
    allowB2BLogin: boolean;
    canAccessNotificationDashboard: boolean;
    admin: boolean;
  }
  
export interface User {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    email: string;
    password: string;
    role: number | Role; // can be just role id or full Role object
    uid: string;
    mobile: string;
    name: string | null;
    isDeleted: boolean;
    dob: string | null; // ISO date string or null
    profileUrl: string | null;
    referredBy: string | null;
    referralUsed: boolean | null;
    isBlacklisted: boolean;
  }
  