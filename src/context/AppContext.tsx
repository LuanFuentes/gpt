import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Tenant } from '../types';
import { api } from '../services/mockApi';

interface AppContextValue {
  tenant: Tenant | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tenantId: string, userId: string) => Promise<void>;
  logout: () => void;
}

export const AppContext = createContext<AppContextValue>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const login = async (tenantId: string, userId: string) => {
    const t = await api.getTenantById(tenantId);
    const u = await api.getUserById(tenantId, userId);
    setTenant(t);
    setUser(u);
    localStorage.setItem('tenantId', tenantId);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setTenant(null);
    setUser(null);
    localStorage.removeItem('tenantId');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const tenantId = localStorage.getItem('tenantId');
    const userId = localStorage.getItem('userId');
    if (tenantId && userId) {
      login(tenantId, userId).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ tenant, user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}
