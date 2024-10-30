// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { setAuthToken } from '../routes/api'; // Importuj api i setAuthToken


interface IAuthProvider {
    children: React.ReactNode
}
interface IAuthContextType {
    authToken: string | null; 
    login: (token: string) => void; 
    logout: () => void; 
}

const AuthContext = createContext<IAuthContextType| null >(null);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [authToken, setToken] = useState<string | null>(localStorage.getItem('accessToken'));

    const login = (token : string) => {
        setToken(token);
        localStorage.setItem('accessToken', token);
        setAuthToken(token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('accessToken');
        document.cookie = "refreshToken=; expires=Wed, 01 Jan 1970 00:00:00 GMT; path=/; samesite=strict; httponly";
        setAuthToken(null);
    };
    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
