'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  level?: UserLevel;
  assessmentComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  setUserLevel: (level: UserLevel) => Promise<void>;
  completeAssessment: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manual login
  const login = async (name: string, email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Google OAuth login
  const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user level
  const setUserLevel = async (level: UserLevel) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/level`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ level }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => prevUser ? { ...prevUser, level } : null);
      }
    } catch (error) {
      console.error('Set level error:', error);
      // Still update local state even if API fails
      setUser((prevUser) => prevUser ? { ...prevUser, level } : null);
    }
  };

  // Complete assessment
  const completeAssessment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/assessment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ assessmentComplete: true }),
      });

      if (response.ok) {
        setUser((prevUser) => prevUser ? { ...prevUser, assessmentComplete: true } : null);
      }
    } catch (error) {
      console.error('Complete assessment error:', error);
      // Still update local state even if API fails
      setUser((prevUser) => prevUser ? { ...prevUser, assessmentComplete: true } : null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        logout,
        setUserLevel,
        completeAssessment,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};