import React, { createContext, useContext, useState } from 'react';
import { setAuthToken } from '../api/Axios'; // Importuj api i setAuthToken
import { ValidateTokenService } from '../services/ValidateTokenService'; // Funkcja sprawdzaj¹ca token
import { ReadLocalStorageUserFromToken } from '../services/LocalStorageTokenService'; // Funkcja do odczytu tokenu
import { JwtPayload } from 'jwt-decode';
import { HttpStatusCode } from 'axios';
import { IContext } from '../types/Contex/IContex';
import { ITeamInformation, ITeamWithUserPermission, IUsersTeamProfilesPictures, TeamInputs } from '../types/Team/ITeam';
import { GetTeamMembersShifts, GetTeamProfilePicture, GetTeamShifts, GetTeamsProfilePictures, GetTeamsUsers, GetUsersRequests } from '../api/TeamAPI';
import { GetJobPositionsBasedOnTeams } from '../api/JobPositionAPI';
import { INotifications } from '../types/Notification/INotification';
import { GetUserInvitation } from '../api/NotificationAPI';
import { GetCalendarEvents } from '../api/CalendarAPI';
import { EmployeeShiftsAssignment } from '../types/Shift/Shift';
import { GetUserImage } from '../api/UserAPI';
import { GetTeamQuestions } from '../api/TeamQuestionAPI';
import { GetPendingInvitations } from '../api/InvitationAPI';

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
    const [teamInformation, setTeamInformation] = useState<ITeamInformation>({
        UserData: [],
        JobPositions: [],
        CalendarEvents: [],
        TeamShifts: [],
        TeamMembersShifts: [],
        TeamProfileSrc: "",
        UsersRequests: [],
        TeamQuestions: [],
        TeamInvitations: []
    });
    const [notifications, setNotifications] = useState<INotifications | null>(null);
    const [employeeShiftsAssignment, setEmployeeShiftsAssignment] = useState<EmployeeShiftsAssignment[] | null>([])
    const [userProfileSrc, setUserProfileSrc] = useState<string | null>(null)
    const [userTeamsProfilesSrc, setUserTeamsProfilesSrc] = useState<IUsersTeamProfilesPictures | null>(null)

    // Funkcja do sprawdzania tokenu
    const checkToken = async () => {
        try {
            const status = await ValidateTokenService();
            if (status === HttpStatusCode.Unauthorized) {
                logOut();
                return;
            }
            await getUserProfileImage()
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

            setNotifications(newNotifications);
            return newNotifications;
        } catch (error) {
            console.error("Error fetching notifications:", error);

            const emptyNotifications: INotifications = {
                Invitations: [],
            };

            setNotifications(emptyNotifications); 
            return emptyNotifications;
        }
    };
    const getUserProfileImage = async () => {
            const response = await GetUserImage();
        if (response.status == 200) {
            const imgSrc = `data:${'application/octet-stream'};base64,${response.data.fileContents}`
            setUserProfileSrc(imgSrc)
            } 
    }
    const fetchTeamsProfilePictures = async () => {
        const response = await GetTeamsProfilePictures()
        if (response?.status == 200) {
            setUserTeamsProfilesSrc(response.data)
        } 
    }
    const getAllTeamInformation = async () => {
        if (!selectedTeam) return;

        try {
            const [usersResponse, jobPositionsResponse, calendarEventsResponse, teamShiftsResponse, teamMembersShifts, teamProfilePicture, usersRequests, teamQuestions, teamInvitations] = await Promise.all([
                GetTeamsUsers(selectedTeam.team.teamId), 
                GetJobPositionsBasedOnTeams(selectedTeam.team.teamId), 
                GetCalendarEvents(selectedTeam.team.teamId),
                GetTeamShifts(selectedTeam.team.teamId),
                GetTeamMembersShifts(selectedTeam.team.teamId),
                GetTeamProfilePicture(selectedTeam.team.teamId),
                GetUsersRequests(selectedTeam.team.teamId),
                GetTeamQuestions(selectedTeam.team.teamId),
                GetPendingInvitations(selectedTeam.team.teamId)
            ]);

            setTeamInformation({
                UserData: usersResponse?.data || [],
                JobPositions: jobPositionsResponse?.data || [],
                CalendarEvents: calendarEventsResponse?.data || [],
                TeamShifts: teamShiftsResponse?.data || [],
                TeamMembersShifts: teamMembersShifts?.data || [],
                TeamProfileSrc: `data:${'application/octet-stream'};base64,${teamProfilePicture?.data.fileContents}`,
                UsersRequests: usersRequests?.data || [],
                TeamQuestions: teamQuestions?.data || [],
                TeamInvitations: teamInvitations?.data || []
            });
        } catch (error) {
            console.error("Error fetching team information:", error);
            window.location.href = '/organizations';
        }
    };

    // Funkcja do ustawienia dru¿yny i zapisania jej w localStorage
    const setSelectedTeamState = (team: ITeamWithUserPermission | null) => {
        setSelectedTeam(team);

        if (team) {
            localStorage.setItem('selectedTeam', JSON.stringify(team));
        } else {
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
        setSelectedTeamState(null);
        setTeamInformation({
            UserData: [],
            JobPositions: [],
            CalendarEvents: [],
            TeamShifts: [],
            TeamMembersShifts: [],
            TeamProfileSrc: "",
            UsersRequests: [],
            TeamQuestions: [],
            TeamInvitations: []
        });
        setNotifications(null);
        setEmployeeShiftsAssignment([]);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('selectedTeam');
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setAuthToken(null); // Usuniêcie tokenu w API
    };
  

    return (
        <AppContext.Provider value={{
            authToken,
            decodedToken,
            isCheckingToken,
            SetAuthenticationToken,
            logOut,
            checkToken,
            setSelectedTeamState,
            selectedTeam,
            updateSelectedTeam,
            getAllTeamInformation,
            teamInformation,
            setTeamInformation,
            notifications,
            setNotifications,
            getUserInvitations,
            employeeShiftsAssignment,
            setEmployeeShiftsAssignment,
            getUserProfileImage,
            userProfileSrc,
            fetchTeamsProfilePictures,
            userTeamsProfilesSrc,
            setUserTeamsProfilesSrc
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook do korzystania z kontekstu
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
