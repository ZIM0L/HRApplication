import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";

const GoogleAuthHandler = () => {
    const { SetAuthenticationToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        
        console.log(window.location.search)
        const token = urlParams.get("token");

        if (token) {
            SetAuthenticationToken(token)
            navigate(`/organizations`, { replace: true });
        } else {
            console.error("Brak tokenu w URL!");
        }
    }, []);

    return <div>Trwa logowanie, proszê czekaæ...</div>;
};

export default GoogleAuthHandler;
