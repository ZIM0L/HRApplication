import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/AppContex";

const GoogleAuthHandler = () => {
    const { SetAuthenticationToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        
        const token = urlParams.get("token");

        if (token) {
            SetAuthenticationToken(token)
            navigate(`/organizations`, { replace: true });
        } 
    }, []);

    return <div>Trwa logowanie, proszê czekaæ...</div>;
};

export default GoogleAuthHandler;
