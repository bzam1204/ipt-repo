import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextValue {
  session: SessionTokens | null;
  isAuthenticated: boolean;
  saveSession: (tokens: SessionTokens) => void;
  clearSession: () => void;
}

const AUTH_STORAGE_KEY = 'app.session.tokens';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionTokens | null>(null);

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
  }, []);

  const saveSession = useCallback((tokens: SessionTokens) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
    setSession(tokens);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    isAuthenticated: Boolean(session?.accessToken),
    saveSession,
    clearSession,
  }), [session, saveSession, clearSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

