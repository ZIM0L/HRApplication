import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ValidateTokenService } from "../services/ValidateTokenService"; // Pamiêtaj, ¿e musisz zaimportowaæ swoj¹ funkcjê

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const status = await ValidateTokenService(); // Sprawdzamy status tokenu
                setIsAuthenticated(status === 200);
            } catch (error) {
                console.error("Error validating token", error);
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    if (isAuthenticated === null) {
        // Mo¿esz tu dodaæ loading spinner lub coœ podobnego
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
