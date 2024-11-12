// src/App.tsx
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contex/AuthContex';
import AuthPage from './components/LoginRegister/AuthPage';
import DashBoard from './components/Dashboard/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';
import JobPositions from './components/JobPositions/JobPositions';
import Panel from './components/Dashboard/Panel';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard/:name" element={<DashBoard />} >
                            <Route index element={<Navigate to="panel" replace />} />
                            <Route path="job_positions" element={<JobPositions />} />
                            <Route path="panel" element={<Panel />} />
                            </Route>
                        </Route>
                    </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
