import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
}

interface IAuthProvider {
    children?: React.ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: IAuthProvider) => {

    const [token, _setToken] = useState<string | null>(localStorage.getItem("token"));

    const setToken = (newToken:string) => {
        _setToken(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );


    return (

        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
    // Component content goes here
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth Error");
    }
    return context;
};
export default AuthProvider;