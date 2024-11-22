import { JwtPayload } from "jwt-decode";

export interface IContext {
    authToken: string | null;
    decodedToken: JwtPayload | null;
    isCheckingToken: boolean;
    SetAuthenticationToken: (token: string) => void;
    logOut: () => void;
    checkToken: () => Promise<void>; // Funkcja do sprawdzania tokenu
}