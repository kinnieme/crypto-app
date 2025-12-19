import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check if token is expired (simplified for this example)
  const isTokenExpired = (token) => {
    if (!token) return true;
    // In a real app, you would decode the JWT and check the exp field
    // For this example, we'll just return false to indicate the token is valid
    return false;
  };

  useEffect(() => {
    // Check for auth token in localStorage on initial load
    const token = localStorage.getItem('authToken');
    const isValid = token && !isTokenExpired(token);
    setIsAuthenticated(isValid);
    setLoading(false);

    // Set up a listener for storage changes to handle auth state across tabs/windows
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      const isValid = token && !isTokenExpired(token);
      setIsAuthenticated(isValid);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token = 'some-token-value') => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    // Dispatch storage event to notify other tabs/components
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); // Also remove userId on logout
    setIsAuthenticated(false);
    // Dispatch storage event to notify other tabs/components
    window.dispatchEvent(new Event('storage'));
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading
  };

 return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};