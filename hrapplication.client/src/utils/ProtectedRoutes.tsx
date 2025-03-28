import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contex/AppContex";
import Loading from "../components/ErrorComponents/Loading";

const ProtectedRoutes = () => {
    const location = useLocation();
    const { authToken, decodedToken, isCheckingToken, checkToken, teamInformation } = useAuth();

    useEffect(() => {
        const check = async () => {
            await checkToken();
        };
        check();

    }, [authToken]);

    if (isCheckingToken) {
        return <Loading />
    }
    if (!decodedToken || teamInformation?.UserData.find(user => user.email == decodedToken.email && user.isActive === false)) {  
       return <Navigate to="/accessdenied" state={{ from: location }} replace />;  
    }

    return <Outlet />;
};

export default ProtectedRoutes;
