import { jwtDecode, JwtPayload } from "jwt-decode";
import { IAuthenticationResult } from "../utils/interfaces/IAuthenticationResult";

export const SetLocalStorageUser = (user: IAuthenticationResult) => {
    localStorage.setItem("user", JSON.stringify(user));
}
export const ReadLocalStorageUserFromToken = (): JwtPayload | null => {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) return null; 

    try {
        const decodedToken = jwtDecode(storedToken);
        return decodedToken || null; 
    } catch (error) {
        console.error("Token decoding error:", error);
        return null; 
    }
};