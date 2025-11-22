import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import DashboardPage from '@/pages/dashboard';
import {Routes, Route} from 'react-router-dom';
import {ProtectedRoute} from '@/router/protected-route';
import {RedirectIfAuthenticated} from '@/router/redirect-if-authenticated';

export default function App() {
	return (
		<Routes>
			<Route element={<RedirectIfAuthenticated/>}>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
			</Route>
			<Route element={<ProtectedRoute/>}>
				<Route path="/dashboard" element={<DashboardPage/>}/>
			</Route>
		</Routes>
	);
}
