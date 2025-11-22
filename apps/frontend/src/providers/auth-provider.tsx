import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextValue {
  session: SessionTokens | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  saveSession: (tokens: SessionTokens) => void;
  clearSession: () => void;
}

const AUTH_STORAGE_KEY = 'app.session.tokens';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionTokens | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as SessionTokens;
        if (parsed?.accessToken && parsed?.refreshToken) setSession(parsed);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  const saveSession = useCallback((tokens: SessionTokens) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
    setSession(tokens);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  useEffect(() => {
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key !== AUTH_STORAGE_KEY) return;
      if (!event.newValue) {
        setSession(null);
        return;
      }
      try {
        const parsed = JSON.parse(event.newValue) as SessionTokens;
        if (parsed?.accessToken && parsed?.refreshToken) {
          setSession(parsed);
        } else {
          setSession(null);
        }
      } catch {
        setSession(null);
      }
    };
    window.addEventListener('storage', syncAcrossTabs);
    return () => window.removeEventListener('storage', syncAcrossTabs);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    hydrated,
    isAuthenticated: Boolean(session?.accessToken),
    saveSession,
    clearSession,
  }), [session, hydrated, saveSession, clearSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
