import React, { useState, useEffect } from 'react';
import { AuthContext } from './useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage on mount
    const storedUser = localStorage.getItem('pathfinder_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    if (!email || !password) {
      return false;
    }
    // Mock login logic
    const mockUser = {
      name: email.split('@')[0],
      email,
      grade: 'Grade 10',
      initials: email.charAt(0).toUpperCase()
    };
    setUser(mockUser);
    localStorage.setItem('pathfinder_user', JSON.stringify(mockUser));
    return true; // Simulate success
  };

  const register = (name, email, password, grade) => {
    if (!name || !email || !password) {
      return false;
    }
    // Mock register logic
    const mockUser = {
      name,
      email,
      grade: grade || 'Grade 10',
      initials: name.charAt(0).toUpperCase()
    };
    setUser(mockUser);
    localStorage.setItem('pathfinder_user', JSON.stringify(mockUser));
    return true; // Simulate success
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pathfinder_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
