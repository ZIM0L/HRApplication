import { JwtPayload } from "jwt-decode";
import { ITeamWithUserPermission, TeamInputs } from "../Team/ITeam";

export interface IContext {
    authToken: string | null;
    decodedToken: JwtPayload | null;
    isCheckingToken: boolean;
    SetAuthenticationToken: (token: string) => void;
    logOut: () => void;
    checkToken: () => Promise<void>; // Funkcja do sprawdzania tokenu
    selectedTeam: ITeamWithUserPermission | null;
    updateSelectedTeam: (updateTeam: TeamInputs) => void;
    setSelectedTeamState: (team: ITeamWithUserPermission | null) => void
}