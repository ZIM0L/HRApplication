import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ValidateTokenService } from "../services/ValidateTokenService"; // Twoja funkcja walidacji tokenu
import { Role } from "../types/Role/Role";
import { jwtDecode } from "jwt-decode";

type ProtectedRouteProps = {
    requiredRole: Role[]; // Definiujemy typy dla r�l
};


const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ requiredRole}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [userRole, setUserRole] = useState<Role>(Role.Guest);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.role);  // Przypisujemy rol� u�ytkownika z tokenu

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
        // Je�li sprawdzanie autentykacji trwa, wy�wietlamy loading
        return <div>Loading...</div>;
    }

    // Je�li u�ytkownik nie jest uwierzytelniony, przekierowujemy go na stron� logowania
    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    console.log(requiredRole.includes(userRole))
    // Je�li rola u�ytkownika nie pasuje do wymaganych, przekierowujemy do strony "Access Denied"
    if (!requiredRole.includes(userRole)) {
        return <Navigate to="/accessdenied" state={{ from: location }} replace />;
    }

    // Je�li rola pasuje, wy�wietlamy elementy wewn�trz <Outlet>
    return <Outlet />;
};

export default ProtectedRoutes;
