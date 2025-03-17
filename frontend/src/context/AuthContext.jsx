import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';
import { setAuthToken, getValidToken, clearAuthData, isTokenExpired } from '../utils/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (token exists and is valid)
    const checkAuthStatus = async () => {
      const token = getValidToken();
      
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data);
        } catch (err) {
          console.error('Failed to get current user:', err);
          clearAuthData(); // Clear invalid token
        }
      } else if (localStorage.getItem('token') && isTokenExpired()) {
        // Token exists but is expired
        clearAuthData();
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      setAuthToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      setAuthToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      register, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);