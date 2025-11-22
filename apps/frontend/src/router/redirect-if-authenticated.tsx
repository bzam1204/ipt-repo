import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '@/providers/auth-provider';

export function RedirectIfAuthenticated() {
	const {isAuthenticated, hydrated} = useAuth();

	if (!hydrated) return null;
	return isAuthenticated ? <Navigate to="/dashboard" replace/> : <Outlet/>;
}
