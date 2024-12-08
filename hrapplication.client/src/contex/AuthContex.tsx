// src/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { setAuthToken } from '../api/Axios'; // Importuj api i setAuthToken
import { ValidateTokenService } from '../services/ValidateTokenService'; // Funkcja sprawdzaj¹ca token
import { ReadLocalStorageUserFromToken } from '../services/LocalStorageTokenService'; // Funkcja do odczytu tokenu
import { JwtPayload } from 'jwt-decode';
import { HttpStatusCode } from 'axios';
import { IContext } from '../types/Contex/IContex';
import { ITeamWithUserPermission } from '../types/Team/ITeam';

interface IProvider {
    children: React.ReactNode;
}

const AuthContext = createContext<IContext | null>(null);

export const AuthProvider = ({ children }: IProvider) => {
    const [authToken, setAuthTokenState] = useState<string | null>(localStorage.getItem('accessToken'));
    const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState<ITeamWithUserPermission | null>(() => {
        const storedTeam = localStorage.getItem("selectedTeam");
        return storedTeam ? JSON.parse(storedTeam) : null;
    });

    // Funkcja do sprawdzania tokenu
    const checkToken = async () => {
        try {
            const status = await ValidateTokenService();
            if (status === HttpStatusCode.Unauthorized) {
                logOut();
                return;
            }
            const decoded = ReadLocalStorageUserFromToken();
            setDecodedToken(decoded);
        } catch (error) {
            console.error('Error checking token:', error);
            logOut();
        } finally {
            setIsCheckingToken(false);
        }
    };
    // Funkcja do ustawienia dru¿yny i zapisania jej w localStorage
    const setSelectedTeamState = (team: ITeamWithUserPermission | null) => {
        setSelectedTeam(team);

        if (team) {
            // Zapisanie dru¿yny do localStorage
            localStorage.setItem('selectedTeam', JSON.stringify(team));
        } else {
            // Usuniêcie dru¿yny z localStorage, jeœli wybrano null
            localStorage.removeItem('selectedTeam');
        }
    };

    // Funkcja do ustawiania tokenu
    const SetAuthenticationToken = (token: string) => {
        setAuthTokenState(token);
        localStorage.setItem('accessToken', token);
        setAuthToken(token); // Ustawienie tokenu w API
        setDecodedToken(ReadLocalStorageUserFromToken());
    };

    // Funkcja do usuwania tokenu
    const logOut = () => {
        setAuthTokenState(null);
        setDecodedToken(null);
        setSelectedTeam(null);
        localStorage.removeItem('accessToken');
        document.cookie = 'refreshToken=; expires=Wed, 01 Jan 1970 00:00:00 GMT; path=/; samesite=strict; httponly';
        setAuthToken(null); // Usuniêcie tokenu w API
    };
  

    return (
        <AuthContext.Provider value={{ authToken, decodedToken, isCheckingToken, SetAuthenticationToken, logOut, checkToken, setSelectedTeamState, selectedTeam, setSelectedTeam }}>
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
