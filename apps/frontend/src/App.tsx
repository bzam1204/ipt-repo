import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import DashboardPage from '@/pages/dashboard';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/router/protected-route';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
