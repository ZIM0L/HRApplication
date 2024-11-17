import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Role } from "../types/Role/Role";
import { useAuth } from "../contex/AuthContex";

type ProtectedRouteProps = {
    requiredRole: Role[]; // Definiujemy typy dla ról
};

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
    const location = useLocation();
    const { authToken, decodedToken, isCheckingToken, checkToken } = useAuth();

    // Ensure that checkToken runs only once after the component mounts
    useEffect(() => {
        checkToken();
    }, [checkToken]);

    // Show a loading state while checking the token
    if (isCheckingToken) {
        return <div>Loading...</div>;
    }

    // If no token is found, redirect to the login page
    if (!authToken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Check if the user's role is allowed; redirect to Access Denied if not
    if (decodedToken?.role && !requiredRole.includes(decodedToken.role as Role)) {
        return <Navigate to="/accessdenied" state={{ from: location }} replace />;
    }

    // If role matches, render the protected route
    return <Outlet />;
};

export default ProtectedRoutes;
D