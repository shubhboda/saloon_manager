import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('saloon_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('saloon_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('saloon_user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('saloon_user');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Check user role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is customer
  const isCustomer = () => {
    return hasRole('customer');
  };

  // Check if user is owner/manager
  const isOwner = () => {
    return hasRole('owner') || hasRole('manager');
  };

  // Check if user is staff
  const isStaff = () => {
    return hasRole('staff');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isCustomer,
    isOwner,
    isStaff
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
