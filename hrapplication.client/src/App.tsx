import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contex/AppContex';
import AuthPage from './components/LoginRegister/AuthPage';
import DashBoard from './components/Dashboard/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Panel from './components/Dashboard/Panel';
import AccessDenied from './components/ErrorComponents/AccessDenied';
import NotFoundPage from './components/ErrorComponents/NotFoundPage';
import GoogleAuthHandler from './utils/GooogleAuthHandler';
import SelectDashboard from './components/SelectDashboard/SelectDashboard';
import Organization from './components/Organization/OrganizationView';
import Team from './components/Team/Team';
import JobPositions from './components/JobPositions/JobPositions';
import Callender from './components/Callender/Callender';
import SessionExpired from './components/ErrorComponents/SessionExpired';
import Shifts from './components/Shift/Shifts';
import RequestDashboard from './components/Request/RequestDashboard';
import QAComponent from './components/Questions/QAComponent';
import Policy from './components/Policy/Policy';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/accessdenied" element={<AccessDenied />} />
                    <Route path="/sessionexpired" element={<SessionExpired /> }/>
                    <Route path="/*" element={<NotFoundPage />} />
                    <Route path="/auth/google-handler" element={<GoogleAuthHandler />} />
                    <Route path="/privacy-policy" element={<Policy />} />

                    <Route element={<ProtectedRoutes />}>
                    <Route path="/organizations" element={<SelectDashboard />} />

                            <Route path="/dashboard/:organization/:name" element={<DashBoard />}>
                                <Route index element={<Navigate to="panel" replace />} />
                            <Route path="panel" element={<Panel />} />
                                <Route path="calendar" element={<Callender />} />
                                <Route path="organization" element={<Organization />} />
                                <Route path="team" element={<Team />} />
                            <Route path="job_positions" element={<JobPositions />} />
                            <Route path="shifts" element={<Shifts />} />
                            <Route path="request" element={<RequestDashboard />} />
                            <Route path="Q&A" element={<QAComponent />} />
                            <Route path="Q&A" element={<QAComponent />} />
                            </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
