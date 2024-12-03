import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contex/AuthContex';
import AuthPage from './components/LoginRegister/AuthPage';
import DashBoard from './components/Dashboard/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';
import JobPositions from './components/JobPositions/JobPositions';
import Panel from './components/Dashboard/Panel';
import AccessDenied from './components/ErrorComponents/AccessDenied';
import NotFoundPage from './components/ErrorComponents/NotFoundPage';
import { Role } from './types/Role/Role';
import Organization from './components/Organization/OrganizationAdminView';
import GoogleAuthHandler from './utils/GooogleAuthHandler';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/accessdenied" element={<AccessDenied />} />
                    <Route path="/*" element={<NotFoundPage />} />
                    <Route path="/auth/google-handler" element={<GoogleAuthHandler />} />

                    <Route element={<ProtectedRoutes requiredRole={[Role.Administrator, Role.Employee, Role.Guest, Role.HRManager]} />}>
                        <Route path="/dashboard/:name" element={<DashBoard />}>
                            <Route index element={<Navigate to="panel" replace />} />
                            <Route path="panel" element={<Panel />} />
                        </Route>
                    </Route>
                    <Route element={<ProtectedRoutes requiredRole={[Role.Administrator, Role.Employee, Role.HRManager]} />}>
                        <Route path="/dashboard/:name" element={<DashBoard />}>
                            <Route index element={<Navigate to="panel" replace />} />
                            <Route path="organization" element={<Organization />} />
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoutes requiredRole={[Role.Administrator, Role.HRManager]} />}>
                        <Route path="/dashboard/:name" element={<DashBoard />}>
                            <Route index element={<Navigate to="panel" replace />} />
                            <Route path="job_positions" element={<JobPositions />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
