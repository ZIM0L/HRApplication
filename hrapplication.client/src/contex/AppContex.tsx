import React, { createContext, useContext, useState } from 'react';
import { setAuthToken } from '../api/Axios'; // Importuj api i setAuthToken
import { ValidateTokenService } from '../services/ValidateTokenService'; // Funkcja sprawdzaj¹ca token
import { ReadLocalStorageUserFromToken } from '../services/LocalStorageTokenService'; // Funkcja do odczytu tokenu
import { JwtPayload } from 'jwt-decode';
import { HttpStatusCode } from 'axios';
import { IContext } from '../types/Contex/IContex';
import { ITeamInformation, ITeamWithUserPermission, TeamInputs } from '../types/Team/ITeam';
import { GetTeamsUsers } from '../api/TeamAPI';
import { GetJobPositionsBasedOnTeams } from '../api/JobPositionAPI';
import { INotifications } from '../types/Notification/INotification';
import { GetUserInvitation } from '../api/NotificationAPI';
import { GetCalendarEvents } from '../api/CalendarAPI';

interface IProvider {
    children: React.ReactNode;
}

const AppContext = createContext<IContext | null>(null);

export const AuthProvider = ({ children }: IProvider) => {
    const [authToken, setAuthTokenState] = useState<string | null>(localStorage.getItem('accessToken'));
    const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState<ITeamWithUserPermission | null>(() => {
        const storedTeam = localStorage.getItem("selectedTeam");
        return storedTeam ? JSON.parse(storedTeam) : null;
    });
    const [teamInformation, setTeamInformation] = useState<ITeamInformation | null>({ UserData: [], JobPositions: [], CalendarEvents : [] });
    const [notifications, setNotifications] = useState<INotifications | null>(null);

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
    const updateSelectedTeam = (updatedTeamInputs: TeamInputs) => {
        if (!selectedTeam) return null;
        const updatedTeam: ITeamWithUserPermission = {
            team: {
                teamId: selectedTeam?.team.teamId,
                name: updatedTeamInputs.name,
                industry: updatedTeamInputs.industry,
                country: updatedTeamInputs.country,
                url: updatedTeamInputs.url,
                email: updatedTeamInputs.email,
                address: updatedTeamInputs.address,
                city: updatedTeamInputs.city,
                phoneNumber: updatedTeamInputs.phoneNumber,
                zipCode: updatedTeamInputs.zipCode,
            },
            roleName: selectedTeam?.roleName, 
        };
        setSelectedTeamState(updatedTeam)
    }
    const getUserInvitations = async (): Promise<INotifications> => {
        if (!decodedToken) {
            return Promise.reject("No decoded token available");
        }

        try {
            const [invitationResponse] = await Promise.all([
                GetUserInvitation(),
            ]);

            const newNotifications: INotifications = {
                Invitations: invitationResponse?.data || [],
            };

            setNotifications(newNotifications); // Ustaw nowy stan
            return newNotifications; // Zwrot nowych danych
        } catch (error) {
            console.error("Error fetching notifications:", error);

            const emptyNotifications: INotifications = {
                Invitations: [],
            };

            setNotifications(emptyNotifications); // Ustaw pusty stan w przypadku b³êdu
            return emptyNotifications; // Zwrot pustych danych
        }
    };

    const getAllTeamInformation = async () => {
        if (!selectedTeam) return;

        try {
            const [usersResponse, jobPositionsResponse, calendarEventsResponse] = await Promise.all([
                GetTeamsUsers(selectedTeam.team.teamId), 
                GetJobPositionsBasedOnTeams(selectedTeam.team.teamId), 
                GetCalendarEvents(selectedTeam.team.teamId)
            ]);

            setTeamInformation({
                UserData: usersResponse?.data,
                JobPositions: jobPositionsResponse?.data,
                CalendarEvents: calendarEventsResponse?.data
            });
        } catch (error) {
            console.error("Error fetching team information:", error);
            setTeamInformation({
                UserData: [],
                JobPositions: [],
                CalendarEvents: []
            });
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
        localStorage.removeItem('selectedTeam');
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setAuthToken(null); // Usuniêcie tokenu w API
    };
  

    return (
        <AppContext.Provider value={{ authToken, decodedToken, isCheckingToken, SetAuthenticationToken, logOut, checkToken, setSelectedTeamState, selectedTeam, updateSelectedTeam, getAllTeamInformation, teamInformation, setTeamInformation, notifications, setNotifications, getUserInvitations }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook do korzystania z kontekstu
export const useAuth = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
