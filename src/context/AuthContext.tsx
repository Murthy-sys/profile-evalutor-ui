import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'user' | 'hr' | 'payroll';
  phone: string;
  resumeScore?: number;
  keySkills?: string[];
  employeeStatus?: string;
  referredBy?: string;
  resumePath?: string;
  resumeFileName?: string;
  attachment?: {
    fileName: string;
    downloadUrl: string;
    score: number;
    skills: string[];
  };
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  education?: string;
  experience?: string;
  referredBy?: string;
  role?: 'user' | 'hr' | 'payroll';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    const { user: userData, token: authToken } = response.data;
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const register = async (data: RegisterData) => {
    const response = await authAPI.register(data);
    const { user: userData, token: authToken } = response.data;
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
