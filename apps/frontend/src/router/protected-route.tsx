import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/auth-provider';

export function ProtectedRoute() {
  const { isAuthenticated, hydrated } = useAuth();

  if (!hydrated) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
