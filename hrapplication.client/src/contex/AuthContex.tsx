// src/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken } from '../api/api'; // Importuj api i setAuthToken
import { ValidateTokenService } from '../services/ValidateTokenService'; // Funkcja sprawdzaj¹ca token
import { ReadLocalStorageUserFromToken } from '../services/LocalStorageTokenService'; // Funkcja do odczytu tokenu
import { JwtPayload } from 'jwt-decode';
import { HttpStatusCode } from 'axios';

interface IAuthProvider {
    children: React.ReactNode;
}

interface IAuthContextType {
    authToken: string | null;
    decodedToken: JwtPayload | null;
    isCheckingToken: boolean;
    SetAuthenticationToken: (token: string) => void;
    RemoveAuthenticationToken: () => void;
    checkToken: () => Promise<void>; // Funkcja do sprawdzania tokenu
}

const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [authToken, setAuthTokenState] = useState<string | null>(localStorage.getItem('accessToken'));
    const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);


    // Funkcja do sprawdzania tokenu
    const checkToken = async () => {
        try {
            const status = await ValidateTokenService();
            if (status === HttpStatusCode.Unauthorized) {
                RemoveAuthenticationToken();
                return;
            }
            if (authToken) {
                setDecodedToken(ReadLocalStorageUserFromToken());
            }
        } catch (error) {
            console.error('Error checking token:', error);
            RemoveAuthenticationToken();
        } finally {
            setIsCheckingToken(false);
        }
    };

    // Funkcja do ustawiania tokenu
    const SetAuthenticationToken = (token: string) => {
        setAuthTokenState(token);
        localStorage.setItem('accessToken', token);
        setAuthToken(token); // Ustawienie tokenu w API
    };

    // Funkcja do usuwania tokenu
    const RemoveAuthenticationToken = () => {
        setAuthTokenState(null);
        setDecodedToken(null);
        localStorage.removeItem('accessToken');
        document.cookie = 'refreshToken=; expires=Wed, 01 Jan 1970 00:00:00 GMT; path=/; samesite=strict; httponly';
        setAuthToken(null); // Usuniêcie tokenu w API
    };

    // SprawdŸ token przy za³adowaniu kontekstu
    useEffect(() => {
        checkToken();
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ authToken, decodedToken, isCheckingToken, SetAuthenticationToken, RemoveAuthenticationToken, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook do korzystania z kontekstu
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
