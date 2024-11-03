import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
    const token = localStorage.getItem('accessToken');
    return token ? <Outlet /> : <Navigate to="/auth"/>

}

export default ProtectedRoutes;