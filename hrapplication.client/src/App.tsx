// src/App.tsx
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contex/AuthContex';
import AuthPage from './components/LoginRegister/AuthPage';
import DashBoard from './components/Dashboard/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                        <Route path="/" element={<Navigate to="/auth" />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/dashboard" element={<DashBoard />} />
                        </Route>
                    </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
