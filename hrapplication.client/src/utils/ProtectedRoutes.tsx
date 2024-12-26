import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";

const ProtectedRoutes = () => {
    const location = useLocation();
    const { authToken, decodedToken, isCheckingToken, checkToken } = useAuth();

    useEffect(() => {
        const check = async () => {
            await checkToken();
        };
        check();

    }, [authToken]);

    if (isCheckingToken) {
        return <div>Loading...</div>;
    }
    if (!decodedToken) {
        return <Navigate to="/accessdenied" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
