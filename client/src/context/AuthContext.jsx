import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('expense_token');
    const storedUser = localStorage.getItem('expense_user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const setSession = (token, userData) => {
    localStorage.setItem('expense_token', token);
    localStorage.setItem('expense_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('expense_token');
    localStorage.removeItem('expense_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setSession, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
