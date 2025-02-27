import React, { createContext, useEffect, useState } from 'react';
import { userStore } from 'stores/userStore';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem('token', token);
    userStore.setUserEmail(email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    userStore.clearUserEmail();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
