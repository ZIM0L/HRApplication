import { JwtPayload } from "jwt-decode";
import { ITeamInformation, ITeamWithUserPermission, TeamInputs } from "../Team/ITeam";
import { INotifications } from "../Notification/INotification";
import { EmployeeShiftsAssignment } from "../Shift/Shift";

export interface IContext {
    teamInformation: ITeamInformation | null;
    notifications: INotifications | null;
    setNotifications: (notifications: INotifications) => void
    setTeamInformation: (updatedTeam: ITeamInformation) => void;
    authToken: string | null;
    decodedToken: JwtPayload | null;
    isCheckingToken: boolean;
    SetAuthenticationToken: (token: string) => void;
    getAllTeamInformation: () => void;
    logOut: () => void;
    checkToken: () => Promise<void>; // Funkcja do sprawdzania tokenu
    getUserInvitations: () => Promise<INotifications> ;
    selectedTeam: ITeamWithUserPermission | null;
    updateSelectedTeam: (updateTeam: TeamInputs) => void;
    setSelectedTeamState: (team: ITeamWithUserPermission | null) => void
    employeeShiftsAssignment: EmployeeShiftsAssignment[] | null
    setEmployeeShiftsAssignment: (employeeShiftsAssignment: EmployeeShiftsAssignment[] | null) => void,
    getUserProfileImage: () => void,
    userProfileSrc: string | null
}