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

    console.log(authToken, decodedToken)
    if (!authToken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (!decodedToken) {
        console.log(decodedToken)
        return <Navigate to="/accessdenied" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
