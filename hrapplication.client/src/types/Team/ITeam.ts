import { ICalendarEvent } from "../Calendar/ICalendar";
import { IJobPosition } from "../JobPosition/IJobPosition";
import { IRequest } from "../Request/IRequest";
import { Shift, TeamMemberShift } from "../Shift/Shift";
import { IEmployeeData } from "../User/IUser";

export interface ITeam {
    teamId: string,
    name: string,
    industry: string,
    country: string,
    url?: string,
    email?: string,
    address?: string,
    city?: string,
    phoneNumber?: string,
    zipCode?: string
}
export type TeamInputs = {
    name: string;
    industry: string;
    country: string;
    url?: string;
    email?: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
    zipCode?: string;
};

export interface ITeamWithUserPermission {
    team: ITeam,
    roleName: string
}
export type ITeamSendId = {
    teamId: string;
};
export interface ITeamInformation {
    UserData: IEmployeeData[],
    JobPositions: IJobPosition[],
    CalendarEvents: ICalendarEvent[]
    TeamShifts: Shift[]
    TeamMembersShifts: TeamMemberShift[]
    TeamProfileSrc: string,
    UsersRequests: IRequest[]
}
export interface IUsersTeamProfilesPictures {
    teamImage: Record<string, string>;
}