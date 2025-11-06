import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles.scss';
import { QueryProvider } from '@/providers/query-client';
import { AuthProvider } from '@/providers/auth-provider';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
