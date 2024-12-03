import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";
import { jwtDecode } from "jwt-decode";

const GoogleAuthHandler = () => {
    const { SetAuthenticationToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            SetAuthenticationToken(token)
            const { given_name } = jwtDecode(token);
            navigate(`/dashboard/${given_name}/panel`, { replace: true });
        } else {
            console.error("Brak tokenu w URL!");
        }
    }, []);

    return <div>Trwa logowanie, proszê czekaæ...</div>;
};

export default GoogleAuthHandler;
