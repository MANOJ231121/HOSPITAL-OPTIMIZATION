import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hospital_token') || null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('hospital_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data && res.data.success) {
            setUser(res.data.data);
            setRole(res.data.data.role);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Token verification failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.success) {
        const { token: jwtToken, user: userObj } = res.data;
        localStorage.setItem('hospital_token', jwtToken);
        localStorage.setItem('hospital_user', JSON.stringify(userObj));
        setToken(jwtToken);
        setUser(userObj);
        setRole(userObj.role);
        return { success: true, role: userObj.role };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or server unavailable';
      return { success: false, message: msg };
    }
  };

  const registerPatient = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data && res.data.success) {
        const { token: jwtToken, user: userObj } = res.data;
        localStorage.setItem('hospital_token', jwtToken);
        localStorage.setItem('hospital_user', JSON.stringify(userObj));
        setToken(jwtToken);
        setUser(userObj);
        setRole(userObj.role);
        return { success: true, role: userObj.role };
      }
      return { success: false, message: res.data.message || 'Registration failed' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration error occurred';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('hospital_token');
    localStorage.removeItem('hospital_user');
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        registerPatient,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
